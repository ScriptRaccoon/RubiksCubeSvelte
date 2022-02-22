<script>
    export let cubies;
    import Cubie from "./Cubie.svelte";
    import { mod } from "../utils.js";
    import { onMount } from "svelte";

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
            }
        });
    }
</script>

<div
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
            {#each cubies as cubie}
                <Cubie {cubie} />
            {/each}
        </div>
        <div class="rotationLayer">
            <!-- TODO -->
        </div>
    </div>
</div>

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
