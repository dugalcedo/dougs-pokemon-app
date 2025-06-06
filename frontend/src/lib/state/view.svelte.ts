// This state determines which controls and which game screen should be shown.

// screens
import StartScreen from "../../components/screens/StartScreen.svelte"
import NewGameScreen from "../../components/screens/NewGameScreen.svelte"
import WelcomeNewPlayer from "../../components/screens/WelcomeNewPlayer.svelte"
import LoadGameScreen from "../../components/screens/LoadGameScreen.svelte"
import PlayerDashboardScreen from "../../components/screens/PlayerDashboardScreen.svelte"
import PickRegionScreen from "../../components/screens/PickRegionScreen.svelte"

// controls
import StartControls from "../../components/controls/StartControls.svelte"
import NoControls from "../../components/controls/NoControls.svelte"
import BackControls from "../../components/controls/BackControls.svelte"
import PlayerDashboardControls from "../../components/controls/PlayerDashboardControls.svelte"

import { type Component } from "svelte"

export type ScreenName = (
    | 'start'
    | 'newGame'
    | 'welcomeNewPlayer'
    | 'loadGame'
    | 'dashboard'
    | 'pickRegion'
)

export type ControlsName = (
    | 'start'
    | 'none'
    | 'back'
    | 'dashboard'
)

type ViewState = {
    screenName: ScreenName
    controlsName: ControlsName
}

export const screens: Record<ScreenName, Component> = {
    start: StartScreen,
    newGame: NewGameScreen,
    welcomeNewPlayer: WelcomeNewPlayer,
    loadGame: LoadGameScreen,
    dashboard: PlayerDashboardScreen,
    pickRegion: PickRegionScreen
}

export const controls: Record<ControlsName, Component> = {
    start: StartControls,
    none: NoControls,
    back: BackControls,
    dashboard: PlayerDashboardControls
}

const screenHistory: (ScreenName | undefined)[] = []
const controlsHistory: (ControlsName | undefined)[] = []

export const view = $state<ViewState>({
    screenName: 'start',
    controlsName: 'start',
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

export const goBack = () => {
    const prevScreen = screenHistory.pop()
    const prevControls = controlsHistory.pop()

    if (prevScreen) view.screenName = prevScreen
    if (prevControls) view.controlsName = prevControls
}