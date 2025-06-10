<script lang="ts">
    import { type Encounter, type Pokemon } from "../../lib/pokemonTypes.js";
    import { onMount } from "svelte";
    import { view } from "../../lib/state/view.svelte.js";
    import { getCachedPokemon, instantiateEncounteredPokemon } from "../../lib/backend.js";
    import { getPokemonMaxHp, getPokemonStat } from "../../lib/util.js";

    const {
        wheel,
        onEncounter
    }: {
        wheel: Encounter[]
        onEncounter: (enc: Encounter, p: Pokemon) => void
    } = $props()

    // correct chance values to percents
    const overallChanceCeil = Math.max(...wheel.map(enc => enc.chanceCeil))
    for (const enc of wheel) {
        enc.chanceFloor = enc.chanceFloor/overallChanceCeil*100
        enc.chanceCeil = enc.chanceCeil/overallChanceCeil*100
    }

    // helpers
    const randRange = (min: number, max: number) => Math.random()*(max-min)+min;
    const encIsChosen = (enc: Encounter) => arrowPercent >= enc.chanceFloor && arrowPercent < enc.chanceCeil;

    let arrowPercent = $state(randRange(0, 100))
    let arrowMoveInterval = $state<any>()
    let arrowMoveIntervalMs = $state(randRange(1, 10))
    let arrowDirection = $state<1 | -1>(1)

    let brakesOn = false
    function flickArrow() {
        // Stop
        clearInterval(arrowMoveInterval)


        // Interval
        arrowMoveInterval = setInterval(() => {
            // Check if slow and apply brakes
            if (!brakesOn && arrowMoveIntervalMs > 9) {
                applyBrakes()
                clearTimeout(arrowMoveInterval)
                return
            }

            if (arrowPercent >= 100 || arrowPercent <= 0) {
                arrowDirection *= -1
                arrowMoveIntervalMs += 1
                flickArrow()
            }

            arrowPercent += arrowDirection

        }, arrowMoveIntervalMs)
    }


    function applyBrakes() {
        function brakeFrame() {
            setTimeout(() => {
                if (arrowMoveIntervalMs > 50) {
                    doEncounter()
                    return
                }

                if (arrowPercent >= 100 || arrowPercent <= 0) {
                    arrowDirection *= -1
                    arrowMoveIntervalMs += 1
                }

                arrowPercent += arrowDirection
                arrowMoveIntervalMs += 0.51
                
                brakeFrame()
            }, arrowMoveIntervalMs);
        }

        brakeFrame()
    }

    async function doEncounter() {
        if (arrowPercent <= 2) {
            view.encountered = wheel[0]
            return
        }

        if (arrowPercent >= 98) {
            view.encountered = wheel[wheel.length-1]
            return
        }
        
        const found = wheel.find(enc => arrowPercent >= enc.chanceFloor && arrowPercent <= enc.chanceCeil)

        if (!found) {
            alert("No pokemon appeared?")
            flickArrow()
            return
        }

        view.encountered = found
        const p = await instantiateEncounteredPokemon(found)
        p.maxHp = getPokemonMaxHp(p)
        p.speed = getPokemonStat(p, 'speed')
        p.attack = getPokemonStat(p, 'attack')
        p.defense = getPokemonStat(p, 'defense')
        p.hp = 1
        view.encounteredPokemon = p
        onEncounter(found, p)
    }

    onMount(() => {
        flickArrow()
    })
</script>


        <div class="encounter-wheel">
            <div class="slices">
                {#each wheel as enc (enc.pokemon)}
                    <div
                    class="slice"
                    class:chosen={encIsChosen(enc)}
                    style="
                        height: {enc.chance*100}%;
                        overflow: hidden;
                    ">
                        <span>{enc.pokemon}</span>
                    </div>
                {/each}
            </div>
            <div class="track">
                <div class="arrow" style="
                    top: {arrowPercent}%;
                ">
                    &#9665;
                </div>
            </div>
        </div>



<style>

    .encounter-wheel {
        flex-grow: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .slices {
        display: flex;
        align-items: stretch;
        flex-direction: column;
    }

    .slice {
        border: 1px solid gray;
        font-size: .6rem;
        position: relative;
        overflow-y: auto;

        &.chosen {
            background-color: var(--poke-red);
            color: white;
            overflow: visible !important;

            & span {
                position: absolute;
                background-color: white;
                color: var(--poke-red);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10;
                border: 1px solid var(--poke-red);
                font-size: .8rem;
                padding: .1rem;
            }
        }
    }

    .track {
        position: relative;
        overflow: hidden;
        width: 25px;
    }

    .arrow {
        position: absolute;
        transform: translateY(-50%);
    }
</style>