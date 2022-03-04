<script>
    import Face from "./Face.svelte";
    import { faceNames } from "../layers.js";
    export let cubie;
    export let transparent = false;
</script>

<div
    class="cubie"
    style:--x={cubie.coords.x}
    style:--y={cubie.coords.y}
    style:--z={cubie.coords.z}
>
    {#each faceNames as faceName}
        <Face
            {faceName}
            color={cubie.colors[faceName]}
            {transparent}
        />
    {/each}
</div>

<style>
    .cubie {
        transform: translateX(calc(var(--x) * var(--cubie-size)))
            translateY(calc(var(--y) * var(--cubie-size)))
            translateZ(calc(var(--z) * var(--cubie-size)));
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
