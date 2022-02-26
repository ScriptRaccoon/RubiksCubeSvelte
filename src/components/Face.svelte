<script>
    export let faceName = "left";
    export let color = "";
</script>

<div class="face {faceName}" style:--color={color ? color : ""} />

<style>
    .face {
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
        width: 92%;
        height: 92%;
        border-radius: calc(0.1 * var(--cubie-size));
        background: var(--color);
        box-shadow: 0 0 calc(0.05 * var(--cubie-size))
            rgba(0, 0, 0, 0.3) inset;
    }

    .face.front {
        transform: translateX(-50%) translateY(-50%)
            translateZ(calc(0.5 * var(--cubie-size)));
    }

    .face.back {
        transform: translateX(-50%) translateY(-50%)
            translateZ(calc(-0.5 * var(--cubie-size)));
    }

    .face.left {
        transform: translateX(calc(-50% + (-0.5) * var(--cubie-size)))
            translateY(-50%) rotateY(-90deg);
    }

    .face.right {
        transform: translateX(calc(-50% + (0.5) * var(--cubie-size)))
            translateY(-50%) rotateY(90deg);
    }

    .face.top {
        transform: translateX(-50%)
            translateY(calc(-50% + (-0.5) * var(--cubie-size)))
            rotateX(90deg);
    }

    .face.down {
        transform: translateX(-50%)
            translateY(calc(-50% + 0.5 * var(--cubie-size)))
            rotateX(90deg);
    }
</style>
