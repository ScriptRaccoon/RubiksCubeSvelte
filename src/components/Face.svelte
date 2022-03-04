<script>
    export let faceName = "left";
    export let color = "transparent";
    export let transparent = false;
</script>

<div
    class="face {faceName}"
    class:transparent
    style:--color={color ? color : "transparent"}
/>

<style>
    .face {
        --half-cubie-size: calc(0.5 * var(--cubie-size));
        width: var(--cubie-size);
        height: var(--cubie-size);
        background: #404040;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: box-shadow 100ms linear;
        box-shadow: 0 0 calc(0.1 * var(--cubie-size))
            rgba(255, 255, 255, 0.2) inset;
    }

    .face::before {
        content: "";
        background: var(--color);
        width: 92%;
        height: 92%;
        border-radius: calc(0.1 * var(--cubie-size));
        box-shadow: 0 0 calc(0.05 * var(--cubie-size))
            rgba(0, 0, 0, 0.3) inset;
    }

    .face.front {
        transform: translateZ(var(--half-cubie-size));
    }

    .face.right {
        transform: rotateY(90deg) translateZ(var(--half-cubie-size));
    }

    .face.back {
        transform: rotateY(180deg) translateZ(var(--half-cubie-size));
    }

    .face.left {
        transform: rotateY(-90deg) translateZ(var(--half-cubie-size));
    }

    .face.top {
        transform: rotateX(90deg) translateZ(var(--half-cubie-size));
    }

    .face.down {
        transform: rotateX(-90deg) translateZ(var(--half-cubie-size));
    }

    .face.transparent {
        background: transparent;
        opacity: 0.85;
        box-shadow: none;
    }

    .face.transparent::before {
        box-shadow: none;
    }
</style>
