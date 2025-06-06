<script lang="ts">
    import { handleForm, type FormState } from "../../lib/handleForm.js";
    import { API_ROOT, type PlayerData } from "../../lib/backend.js";
    import { logIn } from "../../lib/state/player.svelte.js";
    import { setView } from "../../lib/state/view.svelte.js";

    type FD = {
        name: string
        password: string
        password2: string
    }

    type RD = {
        message: string
        data: {
            token: string
            player: PlayerData
        }
    }

    const f = $state<FormState<FD, FD, RD>>({
        data: {
            name: "",
            password: "",
            password2: ""
        },
        errors: {},
        validate(data, errors, v) {
            console.log(data)
            let formError: string | undefined

            if (data.password !== data.password2) {
                errors.password2 = 'Passwords must match'
            }

            v.length('password', [5, 50])

            v.require('name')
            v.require('password')
            v.require('password2')

            return formError
        },
        onSubmit: {
            url: API_ROOT + "/api/player",
            method: 'POST',
            onBadRes(res, data) {
                f.formError = data.message
            },
            onGoodRes(res, data) {
                console.log("Good res:", data)
                logIn(data.data.token, data.data.player)
                setView({ screen: 'welcomeNewPlayer', controls: 'none' })
            },
        }
    })

</script>

<form use:handleForm={f}>
    <div class="field">
        <label for="newgameform-name">Name</label>
        <input type="text" id="newgameform-name" bind:value={f.data.name}>
        <span class="error">{f.errors.name}</span>
    </div>
    <div class="field">
        <label for="newgameform-password">Password</label>
        <input type="password" id="newgameform-password" bind:value={f.data.password}>
        <span class="error">{f.errors.password}</span>
    </div>
    <div class="field">
        <label for="newgameform-password2">Repeat password</label>
        <input type="password" id="newgameform-password2" bind:value={f.data.password2}>
        <span class="error">{f.errors.password2}</span>
    </div>
    <button>
        Start game
    </button>
    <div class="error">{f.formError}</div>
</form>