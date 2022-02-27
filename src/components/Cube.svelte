<script>
    import Cubie from "./Cubie.svelte";
    import Popup from "./Popup.svelte";
    import { mod, sleep } from "../utils.js";
    import { onMount, setContext } from "svelte";
    import { cubieTransform } from "../cubieTransform.js";
    import { fade } from "svelte/transition";
    import { TaskQueue } from "../TaskQueue.js";

    let popup = false;
    let popupText = "";

    let visible = false;

    let rotationSpeed = 250;

    let isRotating = false;

    let rotationString = "";

    const faceNames = [
        "front",
        "back",
        "top",
        "down",
        "left",
        "right",
    ];

    setContext("faceNames", faceNames);

    let cubies = [
        {
            id: "w",
            type: "center",
            coords: { x: 0, y: -1, z: 0 },
            colors: {
                top: "white",
            },
            rotating: false,
        },
        {
            id: "y",
            type: "center",
            coords: { x: 0, y: 1, z: 0 },
            colors: {
                down: "yellow",
            },
            rotating: false,
        },
        {
            id: "r",
            type: "center",
            coords: { x: -1, y: 0, z: 0 },
            colors: {
                left: "red",
            },
            rotating: false,
        },
        {
            id: "o",
            type: "center",
            coords: { x: 1, y: 0, z: 0 },
            colors: { right: "orange" },
            rotating: false,
        },
        {
            id: "b",
            type: "center",
            coords: { x: 0, y: 0, z: 1 },
            colors: { front: "blue" },
            rotating: false,
        },
        {
            id: "g",
            type: "center",
            coords: { x: 0, y: 0, z: -1 },
            colors: { back: "green" },
            rotating: false,
        },
        {
            id: "wbr",
            type: "corner",
            coords: { x: -1, y: -1, z: 1 },
            colors: { top: "white", front: "blue", left: "red" },
            rotating: false,
        },
        {
            id: "wbo",
            type: "corner",
            coords: { x: 1, y: -1, z: 1 },
            colors: { top: "white", front: "blue", right: "orange" },
            rotating: false,
        },
        {
            id: "wgo",
            type: "corner",
            coords: { x: 1, y: -1, z: -1 },
            colors: { top: "white", back: "green", right: "orange" },
            rotating: false,
        },
        {
            id: "wgr",
            type: "corner",
            coords: { x: -1, y: -1, z: -1 },
            colors: { top: "white", left: "red", back: "green" },
            rotating: false,
        },
        {
            id: "wb",
            type: "edge",
            coords: { x: 0, y: -1, z: 1 },
            colors: { top: "white", front: "blue" },
            rotating: false,
        },
        {
            id: "wo",
            type: "edge",
            coords: { x: 1, y: -1, z: 0 },
            colors: { top: "white", right: "orange" },
            rotating: false,
        },
        {
            id: "wr",
            type: "edge",
            coords: { x: -1, y: -1, z: 0 },
            colors: { top: "white", left: "red" },
            rotating: false,
        },
        {
            id: "wg",
            type: "edge",
            coords: { x: 0, y: -1, z: -1 },
            colors: { top: "white", back: "green" },
            rotating: false,
        },
        {
            id: "og",
            type: "edge",
            coords: { x: 1, y: 0, z: -1 },
            colors: { right: "orange", back: "green" },
            rotating: false,
        },
        {
            id: "rg",
            type: "edge",
            coords: { x: -1, y: 0, z: -1 },
            colors: { left: "red", back: "green" },
            rotating: false,
        },
        {
            id: "rb",
            type: "edge",
            coords: { x: -1, y: 0, z: 1 },
            colors: { front: "blue", left: "red" },
            rotating: false,
        },
        {
            id: "bo",
            type: "edge",
            coords: { x: 1, y: 0, z: 1 },
            colors: { front: "blue", right: "orange" },
            rotating: false,
        },
        {
            id: "by",
            type: "edge",
            coords: { x: 0, y: 1, z: 1 },
            colors: { front: "blue", down: "yellow" },
            rotating: false,
        },
        {
            id: "gy",
            type: "edge",
            coords: { x: 0, y: 1, z: -1 },
            colors: { back: "green", down: "yellow" },
            rotating: false,
        },
        {
            id: "ry",
            type: "edge",
            coords: { x: -1, y: 1, z: 0 },
            colors: { left: "red", down: "yellow" },
            rotating: false,
        },
        {
            id: "oy",
            type: "edge",
            coords: { x: 1, y: 1, z: 0 },
            colors: { right: "orange", down: "yellow" },
            rotating: false,
        },
        {
            id: "ybr",
            type: "corner",
            coords: { x: -1, y: 1, z: 1 },
            colors: { front: "blue", down: "yellow", left: "red" },
            rotating: false,
        },
        {
            id: "ybo",
            type: "corner",
            coords: { x: 1, y: 1, z: 1 },
            colors: {
                front: "blue",
                down: "yellow",
                right: "orange",
            },
            rotating: false,
        },
        {
            id: "ygr",
            type: "corner",
            coords: { x: -1, y: 1, z: -1 },
            colors: { back: "green", down: "yellow", left: "red" },
            rotating: false,
        },
        {
            id: "ygo",
            type: "corner",
            coords: { x: 1, y: 1, z: -1 },
            colors: {
                back: "green",
                down: "yellow",
                right: "orange",
            },
            rotating: false,
        },
    ];

    function setOriginalData() {
        for (const cubie of cubies) {
            cubie.originalCoords = { ...cubie.coords };
            cubie.originalColors = { ...cubie.colors };
        }
    }

    setOriginalData();

    const cubeRotation = {
        x: -45,
        y: 45,
        z: 0,
    };

    let zoomFactor = 1;

    let transparentMode = false;

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

    function toggleTransparentMode() {
        transparentMode = !transparentMode;
    }

    const layerMap = {
        front: { axis: "z", value: 1 },
        back: { axis: "z", value: -1 },
        top: { axis: "y", value: -1 },
        down: { axis: "y", value: +1 },
        left: { axis: "x", value: -1 },
        right: { axis: "x", value: +1 },
        equator: { axis: "y", value: 0 },
        middle: { axis: "x", value: 0 },
        standing: { axis: "z", value: 0 },
    };

    async function rotateLayer(rotationData) {
        if (isRotating) return;
        isRotating = true;
        const { layer, orientation } = rotationData;
        const angle = orientation == "+" ? 90 : -90;
        const { axis, value } = layerMap[layer];

        const trafo = cubieTransform[layer][orientation];

        for (let index = 0; index < cubies.length; index++) {
            cubies[index].rotating =
                cubies[index].coords[axis] == value;
        }

        rotationString = `rotate${axis.toUpperCase()}(${angle}deg)`;

        await sleep(rotationSpeed);

        for (let index = 0; index < cubies.length; index++) {
            if (cubies[index].rotating) {
                cubies[index] = trafo(cubies[index]);
                cubies[index].rotating = false;
            }
        }
        rotationString = "";

        await sleep(0);

        isRotating = false;
        checkSolved();
    }

    const rotationQueue = new TaskQueue(rotateLayer);

    onMount(() => {
        setTimeout(() => {
            visible = true;
            enableKeyControl();
        }, 100);
    });

    function enableKeyControl() {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    rotateCube("left");
                    break;
                case "ArrowRight":
                    rotateCube("right");
                    break;
                case "ArrowUp":
                    rotateCube("up");
                    break;
                case "ArrowDown":
                    rotateCube("down");
                    break;
                case "+":
                    zoom(1.15);
                    break;
                case "-":
                    zoom(1 / 1.15);
                    break;
                case "c":
                    toggleTransparentMode();
                    break;
                case "f":
                    rotationQueue.add({
                        layer: "front",
                        orientation: "+",
                    });
                    break;
                case "F":
                    rotationQueue.add({
                        layer: "front",
                        orientation: "-",
                    });
                    break;
                case "b":
                    rotationQueue.add({
                        layer: "back",
                        orientation: "-",
                    });
                    break;
                case "B":
                    rotationQueue.add({
                        layer: "back",
                        orientation: "+",
                    });
                    break;
                case "l":
                    rotationQueue.add({
                        layer: "left",
                        orientation: "-",
                    });
                    break;
                case "L":
                    rotationQueue.add({
                        layer: "left",
                        orientation: "+",
                    });
                    break;
                case "r":
                    rotationQueue.add({
                        layer: "right",
                        orientation: "+",
                    });
                    break;
                case "R":
                    rotationQueue.add({
                        layer: "right",
                        orientation: "-",
                    });
                    break;
                case "t":
                    rotationQueue.add({
                        layer: "top",
                        orientation: "-",
                    });
                    break;
                case "T":
                    rotationQueue.add({
                        layer: "top",
                        orientation: "+",
                    });
                    break;
                case "d":
                    rotationQueue.add({
                        layer: "down",
                        orientation: "+",
                    });
                    break;
                case "D":
                    rotationQueue.add({
                        layer: "down",
                        orientation: "-",
                    });
                    break;
                case "e":
                    rotationQueue.add({
                        layer: "equator",
                        orientation: "+",
                    });
                    break;
                case "E":
                    rotationQueue.add({
                        layer: "equator",
                        orientation: "-",
                    });
                    break;
                case "m":
                    rotationQueue.add({
                        layer: "middle",
                        orientation: "-",
                    });
                    break;
                case "M":
                    rotationQueue.add({
                        layer: "middle",
                        orientation: "+",
                    });
                    break;
                case "s":
                    rotationQueue.add({
                        layer: "standing",
                        orientation: "+",
                    });
                    break;
                case "S":
                    rotationQueue.add({
                        layer: "standing",
                        orientation: "-",
                    });
                    break;
                case "U":
                    resetCube();
                    break;
            }
        });
    }

    function showPopup(txt, duration = 2000) {
        // popup = true;
        // popupText = txt;
        // setTimeout(() => {
        //     popup = false;
        //     popupText = "";
        // }, duration);
    }

    function resetCube() {
        if (isRotating) return;
        for (let index = 0; index < cubies.length; index++) {
            cubies[index].coords = {
                ...cubies[index].originalCoords,
            };
            cubies[index].colors = {
                ...cubies[index].originalColors,
            };
        }
    }
</script>

{#if visible}
    <main
        in:fade={{ duration: 500 }}
        class="scene"
        class:visible
        style:--cubie-size="calc({zoomFactor} * min(120px, 18vw))"
    >
        <div
            class="cube"
            style:transition-duration="{rotationSpeed}ms"
            class:transparent={transparentMode}
            style:transform="rotateX({cubeRotation.x}deg) rotateY({cubeRotation.y}deg)"
        >
            <div class="cubieContainer">
                {#each cubies.filter((c) => !c.rotating) as cubie (cubie.id)}
                    <Cubie {cubie} />
                {/each}
            </div>
            <div
                class="rotationLayer"
                style:transition-duration={rotationString
                    ? `${rotationSpeed}ms`
                    : "0ms"}
                style:transform={rotationString}
            >
                {#each cubies.filter((c) => c.rotating) as cubie (cubie.id)}
                    <Cubie {cubie} />
                {/each}
            </div>
        </div>
    </main>
{/if}

{#if popup}
    <Popup bind:popup {popupText} />
{/if}

<style>
    .scene {
        height: 100vh;
        perspective: calc(10 * var(--cubie-size));
        transform-style: preserve-3d;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
    }

    :global(.scene *) {
        transform-style: inherit;
        position: absolute;
    }

    .cube {
        transition: transform ease-out;
    }

    /* transparent mode */

    :global(.cube.transparent .face) {
        background: transparent;
        opacity: 0.85;
        box-shadow: none;
    }

    :global(.cube.transparent .face::before) {
        box-shadow: none;
    }

    /* rotation layer */

    .rotationLayer {
        transition: transform ease-in-out;
    }
</style>
