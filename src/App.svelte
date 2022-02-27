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
