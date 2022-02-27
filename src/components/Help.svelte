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
        }, 1000);
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
                    The keys <strong>+</strong>, <strong>-</strong> zoom
                    the cube in/out.
                </p>
                <br />
                <p>
                    The keys <strong>t</strong>, <strong>T</strong> rotate
                    the top layer.
                </p>
                <p>
                    The keys <strong>d</strong>,
                    <strong>D</strong> rotate the down layer.
                </p>
                <p>
                    The keys <strong>l</strong>,
                    <strong>L</strong> rotate the left layer.
                </p>
                <p>
                    The keys <strong>r</strong>,
                    <strong>R</strong> rotate the right layer.
                </p>
                <p>
                    The keys <strong>f</strong>,
                    <strong>F</strong> rotate the front layer.
                </p>
                <p>
                    The keys <strong>b</strong>,
                    <strong>B</strong> rotate the back layer.
                </p>
                <p>
                    The keys <strong>e</strong>,
                    <strong>E</strong> rotate the equator layer.
                </p>
                <p>
                    The keys <strong>m</strong>,
                    <strong>M</strong> rotate the middle layer.
                </p>
                <p>
                    The keys <strong>s</strong>,
                    <strong>S</strong> rotate the standing layer.
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
