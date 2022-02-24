<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    let showHelp = false;

    onMount(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key == "i") {
                showHelp = !showHelp;
            }
        });
        setTimeout(() => {
            // comment out in dev mode
            // showHelp = true;
        }, 400);
    });
</script>

<section>
    <input type="checkbox" id="helpToggler" bind:checked={showHelp} />
    <label for="helpToggler"><i class="fas fa-info-circle" /></label>
    {#if showHelp}
        <div transition:fly={{ x: -150 }} id="helpContent">
            <div class="for-mobile">
                <p>
                    <strong>
                        It seems that you are on a mobile device. You
                        need a keyboard to control the cube.
                    </strong>
                </p>
                <br />
            </div>
            <div class="for-desktop">
                <p>
                    The key <strong>i</strong> opens/closes this menu.
                </p>
                <br />
                <p>
                    The <strong>Arrow keys</strong> rotate the cube.
                </p>
                <p>
                    The keys <strong>+</strong>/<strong>-</strong> zoom
                    the cube in/out.
                </p>
                <br />
                <p>
                    The key <strong>t</strong> (resp.
                    <strong>T</strong>) rotates the top layer.
                </p>
                <p>
                    The key <strong>d</strong> (resp.
                    <strong>D</strong>) rotates the down layer.
                </p>
                <p>
                    The key <strong>l</strong> (resp.
                    <strong>L</strong>) rotates the left layer.
                </p>
                <p>
                    The key <strong>r</strong> (resp.
                    <strong>R</strong>) rotates the right layer.
                </p>
                <p>
                    The key <strong>f</strong> (resp.
                    <strong>F</strong>) rotates the front layer.
                </p>
                <p>
                    The key <strong>b</strong> (resp.
                    <strong>B</strong>) rotates the back layer.
                </p>
                <p>
                    The key <strong>e</strong> (resp.
                    <strong>E</strong>) rotates the equator layer.
                </p>
                <p>
                    The key <strong>m</strong> (resp.
                    <strong>M</strong>) rotates the middle layer.
                </p>
                <p>
                    The key <strong>s</strong> (resp.
                    <strong>S</strong>) rotates the standing layer.
                </p>
                <br />
                <p>
                    The key <strong>u</strong> undoes the last layer rotation.
                </p>
                <p>
                    The key <strong>U</strong> resets the whole cube.
                </p>
                <p>
                    The key <strong>X</strong> scrambles the cube.
                </p>
                <p>
                    The key <strong>c</strong> toggles transparent mode.
                </p>
            </div>
        </div>
    {/if}
</section>

<style>
    section {
        padding: 20px 0px 0px 20px;
        font-family: "Courier New", Courier, monospace;
        font-size: 22px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
    }

    #helpToggler {
        display: none;
    }

    #helpContent {
        background-color: rgba(0, 0, 0, 0.9);
        box-shadow: 0px 0px 20px black;
        flex-grow: 1;
        padding-right: 20px;
    }

    i {
        opacity: 0.6;
        cursor: pointer;
        text-shadow: 0px 0px 20px #fff8;
    }

    i:hover {
        opacity: 1;
    }

    #helpContent p {
        margin-top: 10px;
    }

    #helpContent strong {
        color: skyblue;
    }

    .for-mobile {
        display: none;
    }

    @media (pointer: none), (pointer: coarse) {
        .for-mobile {
            display: block;
        }
        .for-desktop {
            display: none;
        }
    }
</style>
