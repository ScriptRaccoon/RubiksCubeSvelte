<script>
    import { scale } from "svelte/transition";
    export let popup = true;
    export let popupText = "";
</script>

<aside transition:scale on:click={() => (popup = false)}>
    {popupText}
</aside>

<style>
    aside {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 30px;
        text-align: center;
        z-index: 100;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: white;
        color: #111;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0px 0px 30px #000;
        cursor: pointer;
    }
</style>
