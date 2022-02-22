<script>
    export let cubies;
    import Cubie from "./Cubie.svelte";
</script>

<div class="scene">
    <div class="cube">
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
        transform: rotateX(-45deg) rotateY(45deg);
        transition: transform 200ms ease-in-out;
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

    /* #cube.transparent .face {
        background: transparent;
    }

    #cube.transparent .face {
        opacity: 0.85;
        box-shadow: none;
    }

    #cube.transparent .face::before {
        box-shadow: none;
    } */

    /* rotation layer */

    /* 
    .rotationLayer {
        transition: transform ease-in-out;
        transition-duration: 250ms;
        transform-style: inherit;
    } */
</style>
