<script>
    import Cubie from "./Cubie.svelte";
    import Popup from "./Popup.svelte";
    import { mod } from "../utils.js";
    import { onMount } from "svelte";
    import { cubieTransform } from "../cubieTransform.js";
    import { setContext, tick } from "svelte";

    let popup = false;
    let popupText = "";

    let rotationSpeed = 250;

    let isRotating = false;

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
            rotationString: "",
        },
        {
            id: "y",
            type: "center",
            coords: { x: 0, y: 1, z: 0 },
            colors: {
                down: "yellow",
            },
            rotationString: "",
        },
        {
            id: "r",
            type: "center",
            coords: { x: -1, y: 0, z: 0 },
            colors: {
                left: "red",
            },
            rotationString: "",
        },
        {
            id: "o",
            type: "center",
            coords: { x: 1, y: 0, z: 0 },
            colors: { right: "orange" },
            rotationString: "",
        },
        {
            id: "b",
            type: "center",
            coords: { x: 0, y: 0, z: 1 },
            colors: { front: "blue" },
            rotationString: "",
        },
        {
            id: "g",
            type: "center",
            coords: { x: 0, y: 0, z: -1 },
            colors: { back: "green" },
            rotationString: "",
        },
        {
            id: "wbr",
            type: "corner",
            coords: { x: -1, y: -1, z: 1 },
            colors: { top: "white", front: "blue", left: "red" },
            rotationString: "",
        },
        {
            id: "wbo",
            type: "corner",
            coords: { x: 1, y: -1, z: 1 },
            colors: { top: "white", front: "blue", right: "orange" },
            rotationString: "",
        },
        {
            id: "wgo",
            type: "corner",
            coords: { x: 1, y: -1, z: -1 },
            colors: { top: "white", back: "green", right: "orange" },
            rotationString: "",
        },
        {
            id: "wgr",
            type: "corner",
            coords: { x: -1, y: -1, z: -1 },
            colors: { top: "white", left: "red", back: "green" },
            rotationString: "",
        },
        {
            id: "wb",
            type: "edge",
            coords: { x: 0, y: -1, z: 1 },
            colors: { top: "white", front: "blue" },
            rotationString: "",
        },
        {
            id: "wo",
            type: "edge",
            coords: { x: 1, y: -1, z: 0 },
            colors: { top: "white", right: "orange" },
            rotationString: "",
        },
        {
            id: "wr",
            type: "edge",
            coords: { x: -1, y: -1, z: 0 },
            colors: { top: "white", left: "red" },
            rotationString: "",
        },
        {
            id: "wg",
            type: "edge",
            coords: { x: 0, y: -1, z: -1 },
            colors: { top: "white", back: "green" },
            rotationString: "",
        },
        {
            id: "og",
            type: "edge",
            coords: { x: 1, y: 0, z: -1 },
            colors: { right: "orange", back: "green" },
            rotationString: "",
        },
        {
            id: "rg",
            type: "edge",
            coords: { x: -1, y: 0, z: -1 },
            colors: { left: "red", back: "green" },
            rotationString: "",
        },
        {
            id: "rb",
            type: "edge",
            coords: { x: -1, y: 0, z: 1 },
            colors: { front: "blue", left: "red" },
            rotationString: "",
        },
        {
            id: "bo",
            type: "edge",
            coords: { x: 1, y: 0, z: 1 },
            colors: { front: "blue", right: "orange" },
            rotationString: "",
        },
        {
            id: "by",
            type: "edge",
            coords: { x: 0, y: 1, z: 1 },
            colors: { front: "blue", down: "yellow" },
            rotationString: "",
        },
        {
            id: "gy",
            type: "edge",
            coords: { x: 0, y: 1, z: -1 },
            colors: { back: "green", down: "yellow" },
            rotationString: "",
        },
        {
            id: "ry",
            type: "edge",
            coords: { x: -1, y: 1, z: 0 },
            colors: { left: "red", down: "yellow" },
            rotationString: "",
        },
        {
            id: "oy",
            type: "edge",
            coords: { x: 1, y: 1, z: 0 },
            colors: { right: "orange", down: "yellow" },
            rotationString: "",
        },
        {
            id: "ybr",
            type: "corner",
            coords: { x: -1, y: 1, z: 1 },
            colors: { front: "blue", down: "yellow", left: "red" },
            rotationString: "",
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
            rotationString: "",
        },
        {
            id: "ygr",
            type: "corner",
            coords: { x: -1, y: 1, z: -1 },
            colors: { back: "green", down: "yellow", left: "red" },
            rotationString: "",
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
            rotationString: "",
        },
    ];

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

    export function rotateLayer(rotationData) {
        if (isRotating) return;
        isRotating = true;
        const { layer, orientation } = rotationData;
        const angle = orientation == "+" ? 90 : -90;
        const { axis, value } = layerMap[layer];
        const rotationString = `rotate${axis.toUpperCase()}(${angle}deg)`;
        const trafo = cubieTransform[layer][orientation];

        for (let index = 0; index < cubies.length; index++) {
            const cubie = cubies[index];
            if (cubie.coords[axis] == value) {
                cubies[index].rotationString += rotationString;
                let savedSpeed = rotationSpeed;
                setTimeout(() => {
                    rotationSpeed = 0;
                    cubies[index] = {
                        ...trafo(cubie),
                        rotationString: "",
                    };
                    setTimeout(() => {
                        rotationSpeed = savedSpeed;
                        isRotating = false;
                        console.dir(cubies[index]);
                    }, 100);
                }, rotationSpeed);
            }
        }

        checkSolved();
    }

    onMount(enableKeyControl);

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
                    rotateLayer({ layer: "front", orientation: "+" });
                    break;
                case "F":
                    rotateLayer({ layer: "front", orientation: "-" });
                    break;
                case "b":
                    rotateLayer({ layer: "back", orientation: "-" });
                    break;
                case "B":
                    rotateLayer({ layer: "back", orientation: "+" });
                    break;
                case "l":
                    rotateLayer({ layer: "left", orientation: "-" });
                    break;
                case "L":
                    rotateLayer({ layer: "left", orientation: "+" });
                    break;
                case "r":
                    rotateLayer({ layer: "right", orientation: "+" });
                    break;
                case "R":
                    rotateLayer({ layer: "right", orientation: "-" });
                    break;
                case "t":
                    rotateLayer({ layer: "top", orientation: "-" });
                    break;
                case "T":
                    rotateLayer({ layer: "top", orientation: "+" });
                    break;
                case "d":
                    rotateLayer({ layer: "down", orientation: "+" });
                    break;
                case "D":
                    rotateLayer({ layer: "down", orientation: "-" });
                    break;
                case "e":
                    rotateLayer({
                        layer: "equator",
                        orientation: "+",
                    });
                    break;
                case "E":
                    rotateLayer({
                        layer: "equator",
                        orientation: "-",
                    });
                    break;
                case "m":
                    rotateLayer({
                        layer: "middle",
                        orientation: "-",
                    });
                    break;
                case "M":
                    rotateLayer({
                        layer: "middle",
                        orientation: "+",
                    });
                    break;
                case "s":
                    rotateLayer({
                        layer: "standing",
                        orientation: "+",
                    });
                    break;
                case "S":
                    rotateLayer({
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

<main
    class="scene"
    style:--cubie-size="calc({zoomFactor} * min(120px, 18vw))"
>
    <div
        class="cube"
        class:transparent={transparentMode}
        style:transform="rotateX({cubeRotation.x}deg) rotateY({cubeRotation.y}deg)"
    >
        <div class="cubeContainer">
            {#each cubies as cubie (cubie.id)}
                {#key cubie.coords.toString()}
                    <Cubie {rotationSpeed} {cubie} />
                {/key}
            {/each}
        </div>
    </div>
</main>

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
    }

    .cube {
        transition: transform 200ms ease-out;
    }

    /* transparent mode */

    :global(.cube.transparent .face) {
        background: transparent;
    }

    :global(.cube.transparent .face) {
        opacity: 0.85;
        box-shadow: none;
    }

    :global(.cube.transparent .face::before) {
        box-shadow: none;
    }
</style>
