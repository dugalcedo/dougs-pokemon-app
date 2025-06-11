export default async function tryFetch(times: number, resCb: () => Promise<Response>): Promise<any> {
    while (times > 0) {
        try {
            const res = await resCb()
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
            console.log("Failed. Trying again.")
            await new Promise(resolve => setTimeout(resolve, 500))
            times--
        }
    }

    throw {
        status: 500,
        message: "Failed fetching"
    }
}