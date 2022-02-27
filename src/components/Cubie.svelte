<script>
    import Face from "./Face.svelte";
    import { getContext } from "svelte";
    export let cubie;
</script>

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

<style>
    .cubie {
        width: 0%;
        height: 0%;
        pointer-events: initial;
    }
    :global(.cubie:hover .face) {
        box-shadow: 0 0 calc(0.2 * var(--cubie-size))
            rgba(255, 255, 255, 1) inset !important;
    }
</style>
