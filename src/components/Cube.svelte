<script>
    import Cubie from "./Cubie.svelte";
    import Popup from "./Popup.svelte";
    import { mod } from "../utils.js";
    import { onMount } from "svelte";
    import { cubieTransform } from "../cubieTransform.js";

    let popup = false;
    let popupText = "";

    const faceNames = [
        "front",
        "back",
        "top",
        "down",
        "left",
        "right",
    ];

    let cubies = [
        {
            id: "w",
            type: "center",
            coords: { x: 0, y: -1, z: 0 },
            colors: {
                top: "white",
            },
        },
        {
            id: "y",
            type: "center",
            coords: { x: 0, y: 1, z: 0 },
            colors: {
                down: "yellow",
            },
        },
        {
            id: "r",
            type: "center",
            coords: { x: -1, y: 0, z: 0 },
            colors: {
                left: "red",
            },
        },
        {
            id: "o",
            type: "center",
            coords: { x: 1, y: 0, z: 0 },
            colors: { right: "orange" },
        },
        {
            id: "b",
            type: "center",
            coords: { x: 0, y: 0, z: 1 },
            colors: { front: "blue" },
        },
        {
            id: "g",
            type: "center",
            coords: { x: 0, y: 0, z: -1 },
            colors: { back: "green" },
        },
        {
            id: "wbr",
            type: "corner",
            coords: { x: -1, y: -1, z: 1 },
            colors: { top: "white", front: "blue", left: "red" },
        },
        {
            id: "wbo",
            type: "corner",
            coords: { x: 1, y: -1, z: 1 },
            colors: { top: "white", front: "blue", right: "orange" },
        },
        {
            id: "wgo",
            type: "corner",
            coords: { x: 1, y: -1, z: -1 },
            colors: { top: "white", back: "green", right: "orange" },
        },
        {
            id: "wgr",
            type: "corner",
            coords: { x: -1, y: -1, z: -1 },
            colors: { top: "white", left: "red", back: "green" },
        },
        {
            id: "wb",
            type: "edge",
            coords: { x: 0, y: -1, z: 1 },
            colors: { top: "white", front: "blue" },
        },
        {
            id: "wo",
            type: "edge",
            coords: { x: 1, y: -1, z: 0 },
            colors: { top: "white", right: "orange" },
        },
        {
            id: "wr",
            type: "edge",
            coords: { x: -1, y: -1, z: 0 },
            colors: { top: "white", left: "red" },
        },
        {
            id: "wg",
            type: "edge",
            coords: { x: 0, y: -1, z: -1 },
            colors: { top: "white", back: "green" },
        },
        {
            id: "og",
            type: "edge",
            coords: { x: 1, y: 0, z: -1 },
            colors: { right: "orange", back: "green" },
        },
        {
            id: "rg",
            type: "edge",
            coords: { x: -1, y: 0, z: -1 },
            colors: { left: "red", back: "green" },
        },
        {
            id: "rb",
            type: "edge",
            coords: { x: -1, y: 0, z: 1 },
            colors: { front: "blue", left: "red" },
        },
        {
            id: "bo",
            type: "edge",
            coords: { x: 1, y: 0, z: 1 },
            colors: { front: "blue", right: "orange" },
        },
        {
            id: "by",
            type: "edge",
            coords: { x: 0, y: 1, z: 1 },
            colors: { front: "blue", down: "yellow" },
        },
        {
            id: "gy",
            type: "edge",
            coords: { x: 0, y: 1, z: -1 },
            colors: { back: "green", down: "yellow" },
        },
        {
            id: "ry",
            type: "edge",
            coords: { x: -1, y: 1, z: 0 },
            colors: { left: "red", down: "yellow" },
        },
        {
            id: "oy",
            type: "edge",
            coords: { x: 1, y: 1, z: 0 },
            colors: { right: "orange", down: "yellow" },
        },
        {
            id: "ybr",
            type: "corner",
            coords: { x: -1, y: 1, z: 1 },
            colors: { front: "blue", down: "yellow", left: "red" },
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
        },
        {
            id: "ygr",
            type: "corner",
            coords: { x: -1, y: 1, z: -1 },
            colors: { back: "green", down: "yellow", left: "red" },
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
        const { layer, orientation } = rotationData;
        // const angle = orientation == "+" ? 90 : -90;
        const { axis, value } = layerMap[layer];
        const trafo = cubieTransform[layer][orientation];

        for (let index = 0; index < cubies.length; index++) {
            const cubie = cubies[index];
            if (cubie.coords[axis] == value) {
                cubies[index] = trafo(cubie);
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
            }
        });
    }

    function showPopup(txt, duration = 2000) {
        popup = true;
        popupText = txt;
        setTimeout(() => {
            popup = false;
            popupText = "";
        }, duration);
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
                    <Cubie {cubie} />
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

    .cube {
        transform-style: inherit;
        transition: transform 200ms ease-out;
    }

    .cubeContainer {
        transform-style: inherit;
    }

    /* .cube.solved {
        animation: solveAnimation 50s linear infinite;
    }

    @keyframes solveAnimation {
        0% {
            transform: rotateX(-45deg) rotateY(45deg) rotateZ(0deg);
        }
        100% {
            transform: rotateX(315deg) rotateY(405deg) rotateZ(360deg);
        }
    } */

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

    /* rotation layer */

    /* 
    .rotationLayer {
        transition: transform ease-in-out;
        transition-duration: 250ms;
        transform-style: inherit;
    } */
</style>
