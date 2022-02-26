<script>
    import Face from "./Face.svelte";
    import { getContext } from "svelte";
    export let cubie;
    export let rotationSpeed = 0;
    cubie.originalCoords = { ...cubie.coords };
    cubie.originalColors = { ...cubie.colors };
</script>

<div
    class="cubieContainer"
    style:transform={cubie.rotationString}
    style:transition-duration="{rotationSpeed}ms"
>
    <div
        class="cubie"
        id={cubie.id}
        style:transform="translateX(calc({cubie.coords.x} * var(--cubie-size)))
        translateY(calc({cubie.coords.y} * var(--cubie-size))) translateZ(calc({cubie
            .coords.z} * var(--cubie-size)))"
    >
        {#each getContext("faceNames") as faceName}
            <Face {faceName} color={cubie.colors[faceName]} />
        {/each}
    </div>
</div>

<style>
    .cubieContainer {
        width: 0%;
        height: 0%;
        position: absolute;
        transition: transform ease-in-out;
    }
    .cubie {
        width: 0%;
        height: 0%;
        position: absolute;
    }
    :global(.cubie:hover .face) {
        box-shadow: 0 0 calc(0.2 * var(--cubie-size))
            rgba(255, 255, 255, 1) inset !important;
    }
</style>
