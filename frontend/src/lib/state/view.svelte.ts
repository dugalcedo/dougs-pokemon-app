// This state determines which controls and which game screen should be shown.

// screens
import StartScreen from "../../components/screens/StartScreen.svelte"
import NewGameScreen from "../../components/screens/NewGameScreen.svelte"
import WelcomeNewPlayer from "../../components/screens/WelcomeNewPlayer.svelte"
import LoadGameScreen from "../../components/screens/LoadGameScreen.svelte"
import PlayerDashboardScreen from "../../components/screens/PlayerDashboardScreen.svelte"
import PickRegionScreen from "../../components/screens/PickRegionScreen.svelte"
import OverworldScreen from "../../components/screens/OverworldScreen.svelte"
import LocationScreen from "../../components/screens/LocationScreen.svelte"
import EncountersScreen from "../../components/screens/EncountersScreen.svelte"
import FightScreen from "../../components/screens/FightScreen.svelte"

// controls
import StartControls from "../../components/controls/StartControls.svelte"
import NoControls from "../../components/controls/NoControls.svelte"
import BackControls from "../../components/controls/BackControls.svelte"
import PlayerDashboardControls from "../../components/controls/PlayerDashboardControls.svelte"
import OverworldControls from "../../components/controls/OverworldControls.svelte"
import LocationControls from "../../components/controls/LocationControls.svelte"
import EncountersControls from "../../components/controls/EncountersControls.svelte"
import FightControls from "../../components/controls/FightControls.svelte"

import { type Component } from "svelte"
import type { Encounter, Pokemon } from "../pokemonTypes.js"
import type { UniquePokemon } from "../poketypes.js"

export type ScreenName = (
    | 'start'
    | 'newGame'
    | 'welcomeNewPlayer'
    | 'loadGame'
    | 'dashboard'
    | 'pickRegion'
    | 'overworld'
    | 'location'
    | 'encounters'
    | 'fight'
)

export type ControlsName = (
    | 'start'
    | 'none'
    | 'back'
    | 'dashboard'
    | 'overworld'
    | 'location'
    | 'encounters'
    | 'fight'
)

type ViewState = {
    screenName: ScreenName
    controlsName: ControlsName
    location: string | null
    area: string | null
    encountered: Encounter | null
    encounteredPokemon: UniquePokemon | null
    fightType: 'exp' | 'catch' | null
    turnName: 'self' | 'opponent' | null
    messageLog: string[]
    turnPokemon: UniquePokemon | null
}

export const screens: Record<ScreenName, Component> = {
    start: StartScreen,
    newGame: NewGameScreen,
    welcomeNewPlayer: WelcomeNewPlayer,
    loadGame: LoadGameScreen,
    dashboard: PlayerDashboardScreen,
    pickRegion: PickRegionScreen,
    overworld: OverworldScreen,
    location: LocationScreen,
    encounters: EncountersScreen,
    fight: FightScreen
}

export const controls: Record<ControlsName, Component> = {
    start: StartControls,
    none: NoControls,
    back: BackControls,
    dashboard: PlayerDashboardControls,
    overworld: OverworldControls,
    location: LocationControls,
    encounters: EncountersControls,
    fight: FightControls
}

const screenHistory: (ScreenName | undefined)[] = []
const controlsHistory: (ControlsName | undefined)[] = []

export const view = $state<ViewState>({
    screenName: 'start',
    controlsName: 'start',
    location: null,
    area: null,
    encountered: null,
    encounteredPokemon: null,
    fightType: null,
    turnName: null,
    turnPokemon: null,
    messageLog: []
})

export const setView = (options: {
    screen?: ScreenName
    controls?: ControlsName
}) => {
    if (!options.screen && !options.controls) return

    screenHistory.push(view.screenName)
    controlsHistory.push(view.controlsName)

    if (options.screen) {
        view.screenName = options.screen
    }

    if (options.controls) {
        view.controlsName = options.controls
    }

    // console.log({ screenHistory, controlsHistory })
}

export const goToLocation = (name: string) => {
    screenHistory.push(view.screenName)
    controlsHistory.push(view.controlsName)
    view.location = name
    view.screenName = 'location'
    view.controlsName = 'location'
}

export const goToEncounters = (locationName: string, areaName: string) => {
    screenHistory.push(view.screenName)
    controlsHistory.push(view.controlsName)
    view.location = locationName
    view.area = areaName
    view.screenName = 'encounters'
    view.controlsName = 'encounters'
}

export const goBack = () => {
    const prevScreen = screenHistory.pop()
    const prevControls = controlsHistory.pop()

    if (prevScreen) view.screenName = prevScreen
    if (prevControls) view.controlsName = prevControls
}

export const startFight = (fightType: 'exp' | 'catch') => {
    view.fightType = fightType
    view.screenName = 'fight'
    view.controlsName = 'fight'
}

export const displayBattleMessages = (messages: string[]) => {
    view.messageLog.push(...messages)
}