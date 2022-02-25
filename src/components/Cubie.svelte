<script>
    import Face from "./Face.svelte";
    export let cubie;

    const faceNames = [
        "front",
        "back",
        "top",
        "down",
        "left",
        "right",
    ];
</script>

<div
    class="cubie"
    id={cubie.id}
    style:transform="translateX(calc({cubie.coords.x} * var(--cubie-size)))
    translateY(calc({cubie.coords.y} * var(--cubie-size))) translateZ(calc({cubie
        .coords.z} * var(--cubie-size)))"
>
    {#each faceNames as faceName}
        <Face {faceName} color={cubie.colors[faceName]} />
    {/each}
</div>

<style>
    .cubie {
        width: 0%;
        height: 0%;
        transform-style: inherit;
        position: absolute;
        transition-duration: 0s;
        pointer-events: auto;
    }
    :global(.cubie:hover .face) {
        box-shadow: 0 0 calc(0.2 * var(--cubie-size))
            rgba(255, 255, 255, 1) inset !important;
    }
</style>
