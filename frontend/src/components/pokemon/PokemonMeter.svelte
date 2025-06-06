<script lang="ts">
    const {
        label,
        val,
        max,
        color
    }:{
        label: string,
        val: number,
        max: number,
        color: string
    } = $props()

    let percent = $derived(val/max*100)
</script>

<div class="pokemon-meter">
    <strong>{label}</strong>
    <div class="meter">
        <div class="bar" style="width: {percent}%; background-color: {color};"></div>
    </div>
</div>

<style>
    .pokemon-meter {
        display: grid;
        grid-template-columns: 1fr 3fr;
        align-items: baseline;
        gap: .5rem;
    }

    .meter {
        flex-grow: 1;
        height: 18px;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        border: 2px solid black;
        border-top: 0;
    }

    .bar {
        height: 10px;
    }
</style>