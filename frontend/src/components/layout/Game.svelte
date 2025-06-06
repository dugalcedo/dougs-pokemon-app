<script>
    import Screen from "./Screen.svelte";
    import Controls from "./Controls.svelte";
</script>

<main style="
    background-image: url('/images/backgrounds/main.jpg');
">
    <div id="game">
        <Screen />
        <Controls />
    </div>
</main>

<style>
    main {
        background-size: 100%;
        background-position: bottom;
    }

    #game {
        background-color: white;
        padding: .5rem;
        border-radius: .5rem;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        width: 350px;
        max-width: 100%;
        height: 400px;

        display: grid;
        grid-template-rows: 4fr 1fr;
        gap: .5rem;
    }
</style>