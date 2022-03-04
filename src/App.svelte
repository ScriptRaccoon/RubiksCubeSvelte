<script>
    import Cube from "./components/Cube.svelte";
    import Help from "./components/Help.svelte";
    import Popup from "./components/Popup.svelte";
    let popup = { show: false, text: "" };
</script>

<Help />

<Cube bind:popup />

{#if popup.show}
    <Popup bind:popup />
{/if}

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        background-color: black;
        color: white;
    }
</style>
