type FormRecord = Record<string, any>

export type OnSubmitOptions<RD, ED = RD> = {
    url: string
    method?: string
    fetchOptions?: Record<string, any>
    onGoodRes?: (res: Response, data: RD) => any
    onBadRes?: (res: Response, data: ED) => any
    onFetchError?: (error: unknown) => any
} 

export type Validators = {
    require: (key: string) => void,
    minmax: (key: string, vals: [number, number]) => void,
    length: (key: string, vals: [number, number]) => void,
}

export type FormState<FD extends FormRecord, S extends FormRecord = FD, RD = any, ED = any> = {
    data: FD,
    errors: Record<string, string>,
    sanitize?: (fd: FD) => S,
    validate?: (data: S, errors: Record<string, string>, v: Validators) => undefined | string,
    formError?: string,
    onInvalid?: (state: FormState<FD, S>) => any
    onSubmit?: ((data: S) => any | Promise<any>) | OnSubmitOptions<RD, ED>;
    customMessages?: {
        require?: string
        minmaxLow?: string
        minmaxHigh?: string
    }
}

export const getData = async <T>(res: Response): Promise<T> => {
    try {
        const json = await res.text()
        try {
            return JSON.parse(json)
        } catch {
            return json as T   
        }
    } catch (error) {
        console.warn("Error when trying to get data in handled form.", error)
        return {} as T
    }
}

export const handleForm = <
    FD extends FormRecord, 
    S extends FormRecord = FD,
    RD = any,
    ED = RD
>(form: HTMLFormElement, formState: FormState<FD, S, RD, ED>) => {
    const resetErrors = () => {
        formState.errors = {}
        formState.formError = undefined
    }

    form.addEventListener('submit', async e => {
        e.preventDefault()
        resetErrors()

        const sanitize = formState.sanitize || ((fd: FD) => ({...fd}));
        const s = sanitize(formState.data) as S;

        const validators: Validators = {
            require(key) {
                const v = s[key]
                if (v.trim() === "") formState.errors[key] = formState.customMessages?.require || "required"
            },
            minmax(key, vals) {
                const v = Number(s[key])
                const [min, max] = vals
                if (v < min) {
                    formState.errors[key] = formState.customMessages?.minmaxLow || `must be at least ${min}`
                }
                if (v > max) {
                    formState.errors[key] = formState.customMessages?.minmaxHigh || `must be below ${max}`
                }
            },
            length(key, vals) {
                const v = s[key].length
                const [min, max] = vals
                if (v < min) {
                    formState.errors[key] = formState.customMessages?.minmaxLow || `min ${min} characters`
                }
                if (v > max) {
                    formState.errors[key] = formState.customMessages?.minmaxHigh || `max ${max} characters`
                }
            }
        }

        if (formState.validate) {
            formState.formError = formState.validate(s, formState.errors, validators)
        }

        const hasErrors = formState.formError !== undefined || (Object.keys(formState.errors).length > 0);

        if (hasErrors) {
            if (formState.onInvalid) formState.onInvalid(formState);
            return
        }

        if (typeof formState.onSubmit === 'function') {
            formState.onSubmit(s)
        } else if (formState.onSubmit) {
            const { url, method, fetchOptions = {}, onBadRes, onGoodRes, onFetchError } = formState.onSubmit

            fetchOptions.method ??= method || 'GET'
            fetchOptions.headers ??= {}
            fetchOptions['Content-Type'] ??= 'application/json'
            fetchOptions.body ??= JSON.stringify(s)

            // fetch
            try {
                const res = await fetch(url, fetchOptions)
                if (res.ok && onGoodRes) {
                    const data = await getData<RD>(res)
                    onGoodRes(res, data)
                } else if (!res.ok && onBadRes) {
                    const data = await getData<ED>(res)
                    onBadRes(res, data)
                }
            } catch (error) {
                if (onFetchError) onFetchError(error)
            }
        }
    })
}
