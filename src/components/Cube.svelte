<script>
    import Cubie from "./Cubie.svelte";
    import { mod } from "../utils.js";
    import { onMount } from "svelte";
    import { rotationTransform } from "../rotationTransform.js";

    let cubies = [
        {
            id: "w",
            type: "center",
            coords: { x: 0, y: -1, z: 0 },
            colors: {
                top: "white",
            },
            rotation: "",
        },
        {
            id: "y",
            type: "center",
            coords: { x: 0, y: 1, z: 0 },
            colors: {
                down: "yellow",
            },
            rotation: "",
        },
        {
            id: "r",
            type: "center",
            coords: { x: -1, y: 0, z: 0 },
            colors: {
                left: "red",
            },
            rotation: "",
        },
        {
            id: "o",
            type: "center",
            coords: { x: 1, y: 0, z: 0 },
            colors: { right: "orange" },
            rotation: "",
        },
        {
            id: "b",
            type: "center",
            coords: { x: 0, y: 0, z: 1 },
            colors: { front: "blue" },
            rotation: "",
        },
        {
            id: "g",
            type: "center",
            coords: { x: 0, y: 0, z: -1 },
            colors: { back: "green" },
            rotation: "",
        },
        {
            id: "wbr",
            type: "corner",
            coords: { x: -1, y: -1, z: 1 },
            colors: { top: "white", front: "blue", left: "red" },
            rotation: "",
        },
        {
            id: "wbo",
            type: "corner",
            coords: { x: 1, y: -1, z: 1 },
            colors: { top: "white", front: "blue", right: "orange" },
            rotation: "",
        },
        {
            id: "wgo",
            type: "corner",
            coords: { x: 1, y: -1, z: -1 },
            colors: { top: "white", back: "green", right: "orange" },
            rotation: "",
        },
        {
            id: "wgr",
            type: "corner",
            coords: { x: -1, y: -1, z: -1 },
            colors: { top: "white", left: "red", back: "green" },
            rotation: "",
        },
        {
            id: "wb",
            type: "edge",
            coords: { x: 0, y: -1, z: 1 },
            colors: { top: "white", front: "blue" },
            rotation: "",
        },
        {
            id: "wo",
            type: "edge",
            coords: { x: 1, y: -1, z: 0 },
            colors: { top: "white", right: "orange" },
            rotation: "",
        },
        {
            id: "wr",
            type: "edge",
            coords: { x: -1, y: -1, z: 0 },
            colors: { top: "white", left: "red" },
            rotation: "",
        },
        {
            id: "wg",
            type: "edge",
            coords: { x: 0, y: -1, z: -1 },
            colors: { top: "white", back: "green" },
            rotation: "",
        },
        {
            id: "og",
            type: "edge",
            coords: { x: 1, y: 0, z: -1 },
            colors: { right: "orange", back: "green" },
            rotation: "",
        },
        {
            id: "rg",
            type: "edge",
            coords: { x: -1, y: 0, z: -1 },
            colors: { left: "red", back: "green" },
            rotation: "",
        },
        {
            id: "rb",
            type: "edge",
            coords: { x: -1, y: 0, z: 1 },
            colors: { front: "blue", left: "red" },
            rotation: "",
        },
        {
            id: "bo",
            type: "edge",
            coords: { x: 1, y: 0, z: 1 },
            colors: { front: "blue", right: "orange" },
            rotation: "",
        },
        {
            id: "by",
            type: "edge",
            coords: { x: 0, y: 1, z: 1 },
            colors: { front: "blue", down: "yellow" },
            rotation: "",
        },
        {
            id: "gy",
            type: "edge",
            coords: { x: 0, y: 1, z: -1 },
            colors: { back: "green", down: "yellow" },
            rotation: "",
        },
        {
            id: "ry",
            type: "edge",
            coords: { x: -1, y: 1, z: 0 },
            colors: { left: "red", down: "yellow" },
            rotation: "",
        },
        {
            id: "oy",
            type: "edge",
            coords: { x: 1, y: 1, z: 0 },
            colors: { right: "orange", down: "yellow" },
            rotation: "",
        },
        {
            id: "ybr",
            type: "corner",
            coords: { x: -1, y: 1, z: 1 },
            colors: { front: "blue", down: "yellow", left: "red" },
            rotation: "",
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
            rotation: "",
        },
        {
            id: "ygr",
            type: "corner",
            coords: { x: -1, y: 1, z: -1 },
            colors: { back: "green", down: "yellow", left: "red" },
            rotation: "",
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
            rotation: "",
        },
    ];

    const rotation = {
        x: -45,
        y: 45,
        z: 0,
    };

    let zoomFactor = 1;

    let transparentMode = false;

    function rotate(direction) {
        if (direction == "up") {
            rotation.x += 45;
        } else if (direction == "down") {
            rotation.x -= 45;
        } else {
            const rotX = mod(rotation.x, 360);
            const cubeIsUp = rotX <= 90 || rotX >= 315;
            const factor1 = cubeIsUp ? +1 : -1;
            const factor2 = direction == "right" ? 1 : -1;
            rotation.y += factor1 * factor2 * 45;
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

    function getCubiesFromLayer(layer) {
        const { axis, value } = layerMap[layer];
        return cubies.filter((cubie) => cubie.coords[axis] == value);
    }

    export function rotateLayer(rotationData) {
        const { layer, orientation } = rotationData;
        const angle = orientation == "+" ? 90 : -90;
        const rotatingCubies = getCubiesFromLayer(layer);
        const { axis } = layerMap[layer];
        const rotationString = ` rotate${axis.toUpperCase()}(${angle}deg)`;
        const trafo = rotationTransform[layer][orientation];
        for (const cubie of rotatingCubies) {
            const index = cubies.findIndex((c) => c == cubie);
            cubies[index].rotation = rotationString + cubie.rotation;
            cubies[index].coords = trafo(cubie.coords);
        }
    }

    onMount(enableKeyControl);

    function enableKeyControl() {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    rotate("left");
                    break;
                case "ArrowRight":
                    rotate("right");
                    break;
                case "ArrowUp":
                    rotate("up");
                    break;
                case "ArrowDown":
                    rotate("down");
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
</script>

<main
    class="scene"
    style:--cubie-size="calc({zoomFactor} * min(120px, 18vw))"
>
    <div
        class="cube"
        class:transparent={transparentMode}
        style:--rotation-x="{rotation.x}deg"
        style:--rotation-y="{rotation.y}deg"
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
        transform: rotateX(var(--rotation-x))
            rotateY(var(--rotation-y));
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
