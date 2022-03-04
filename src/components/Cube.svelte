<script>
    // imports
    import Cubie from "./Cubie.svelte";
    import { mod, sleep, randEl } from "../utils.js";
    import { onMount } from "svelte";
    import { cubieTransform } from "../cubieTransform.js";
    import { fade } from "svelte/transition";
    import { TaskQueue } from "../TaskQueue.js";
    import { cubieList } from "../cubieList.js";
    import { faceNames, layerMap } from "../layers.js";

    // variables

    export let popup;
    let visible = false;
    let scrambling = false;
    let transparent = false;
    let zoomFactor = 1;
    $: rotationSpeed = scrambling ? 100 : 250;
    const cubeRotation = { x: -45, y: 45, z: 0 };
    let layerTransform = "";

    // cubies

    let cubies = cubieList.map(function (cubie) {
        return {
            ...cubie,
            rotating: false,
            originalCoords: { ...cubie.coords },
            originalColors: { ...cubie.colors },
        };
    });

    // various cube functions

    function checkSolved() {
        const cubeIsSolved = faceNames.every(
            (faceName) =>
                new Set(cubies.map((cubie) => cubie.colors[faceName]))
                    .size == 2
        );
        if (cubeIsSolved) {
            showPopup("Cube is solved! 🎉");
        }
    }

    function rotateCube(direction) {
        if (direction == "up") {
            cubeRotation.x += 45;
        } else if (direction == "down") {
            cubeRotation.x -= 45;
        } else {
            const rotX = mod(cubeRotation.x, 360);
            const cubeIsUp = rotX <= 90 || rotX >= 315;
            const factor1 = cubeIsUp ? +1 : -1;
            const factor2 = direction == "right" ? 1 : -1;
            cubeRotation.y += factor1 * factor2 * 45;
        }
    }

    function zoom(factor) {
        zoomFactor *= factor;
    }

    function toggleTransparency() {
        transparent = !transparent;
    }

    async function rotateLayer({ layer, orientation }) {
        const { axis, value } = layerMap[layer];
        const trafo = cubieTransform[layer][orientation];
        for (let index = 0; index < cubies.length; index++) {
            cubies[index].rotating =
                cubies[index].coords[axis] == value;
        }
        layerTransform = `rotate${axis.toUpperCase()}(${orientation}90deg)`;
        await sleep(rotationSpeed);
        for (let index = 0; index < cubies.length; index++) {
            if (cubies[index].rotating) {
                cubies[index] = trafo(cubies[index]);
                cubies[index].rotating = false;
            }
        }
        layerTransform = "";
        await sleep(0);
        checkSolved();
    }

    function showPopup(message, duration = 2000) {
        popup = { show: true, text: message };
        setTimeout(() => {
            popup.show = false;
        }, duration);
    }

    function resetCube() {
        if (rotationQueue.executing || scrambling) return;
        rotationQueue.clearHistory();
        for (let index = 0; index < cubies.length; index++) {
            cubies[index].coords = {
                ...cubies[index].originalCoords,
            };
            cubies[index].colors = {
                ...cubies[index].originalColors,
            };
        }
    }

    async function scrambleCube(iterations = 50) {
        if (rotationQueue.executing || scrambling) return;
        scrambling = true;
        rotationQueue.clearHistory();
        for (let i = 0; i < iterations; i++) {
            await rotateLayer({
                layer: randEl(Object.keys(layerMap)),
                orientation: randEl(["+", "-"]),
            });
            await sleep(20);
            if (!scrambling) break;
        }

        scrambling = false;
    }

    // rotation queue

    function invertRotation({ layer, orientation }) {
        return {
            layer,
            orientation: orientation == "+" ? "-" : "+",
        };
    }

    const rotationQueue = new TaskQueue(rotateLayer, invertRotation);

    function addRotation(data) {
        if (scrambling) return;
        rotationQueue.add(data);
    }

    // key controller

    onMount(() => {
        visible = true;
        enableKeyControl();
    });

    const keyController = {
        ArrowLeft: () => rotateCube("left"),
        ArrowRight: () => rotateCube("right"),
        ArrowUp: () => rotateCube("up"),
        ArrowDown: () => rotateCube("down"),
        "+": () => zoom(1.15),
        "-": () => zoom(1 / 1.15),
        c: toggleTransparency,
        u: () => rotationQueue.undo(),
        U: resetCube,
        x: () => {
            scrambling = false;
            rotationQueue.stop();
        },
        X: scrambleCube,
        f: () => addRotation({ layer: "front", orientation: "+" }),
        F: () => addRotation({ layer: "front", orientation: "-" }),
        b: () => addRotation({ layer: "back", orientation: "-" }),
        B: () => addRotation({ layer: "back", orientation: "+" }),
        t: () => addRotation({ layer: "top", orientation: "-" }),
        T: () => addRotation({ layer: "top", orientation: "+" }),
        d: () => addRotation({ layer: "down", orientation: "+" }),
        D: () => addRotation({ layer: "down", orientation: "-" }),
        l: () => addRotation({ layer: "left", orientation: "-" }),
        L: () => addRotation({ layer: "left", orientation: "+" }),
        r: () => addRotation({ layer: "right", orientation: "+" }),
        R: () => addRotation({ layer: "right", orientation: "-" }),
        m: () => addRotation({ layer: "middle", orientation: "-" }),
        M: () => addRotation({ layer: "middle", orientation: "+" }),
        s: () => addRotation({ layer: "standing", orientation: "+" }),
        S: () => addRotation({ layer: "standing", orientation: "-" }),
        e: () => addRotation({ layer: "equator", orientation: "+" }),
        E: () => addRotation({ layer: "equator", orientation: "-" }),
    };

    function enableKeyControl() {
        document.addEventListener("keydown", (e) => {
            const key = e.key;
            if (Object.keys(keyController).includes(key)) {
                keyController[key]();
            }
        });
    }
</script>

{#if visible}
    <main
        in:fade={{ duration: 500 }}
        style:--cubie-size=" min(120px, 18vw)"
    >
        <div
            class="cube"
            style:transition-duration="{rotationSpeed}ms"
            class:transparent
            style:transform="scale({zoomFactor}) rotateX({cubeRotation.x}deg)
            rotateY({cubeRotation.y}deg)"
        >
            <div class="cubieContainer">
                {#each cubies.filter((c) => !c.rotating) as cubie (cubie.id)}
                    <Cubie {cubie} />
                {/each}
            </div>
            <div
                class="rotationLayer"
                style:transition-duration="{layerTransform
                    ? rotationSpeed
                    : 0}ms"
                style:transform={layerTransform}
            >
                {#each cubies.filter((c) => c.rotating) as cubie (cubie.id)}
                    <Cubie {cubie} />
                {/each}
            </div>
        </div>
    </main>
{/if}

<style>
    main {
        min-height: 100vh;
        perspective: calc(10 * var(--cubie-size));
        transform-style: preserve-3d;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(main *) {
        transform-style: inherit;
        position: absolute;
    }

    .cube {
        transition: transform ease-out;
        position: absolute;
    }

    :global(.cube.transparent .face) {
        background: transparent;
        opacity: 0.85;
        box-shadow: none;
    }

    :global(.cube.transparent .face::before) {
        box-shadow: none;
    }

    .rotationLayer {
        transition: transform ease-out;
    }
</style>
