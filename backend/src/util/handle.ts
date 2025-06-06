import { 
    type RequestHandler,
    type Request,
    type Response,
    type NextFunction
} from "express";

type DougsCustomRequestHandler = (req: Request, res: Response, next: NextFunction) => DougsCustomResponse | Promise<DougsCustomResponse>;

type DougsCustomResponse = {
    status: number
    message: string
    data?: any
}

export default function handle(handler: DougsCustomRequestHandler): RequestHandler {
    return async (req, res, next) => {

        // handler
        try {
            const response = await handler(req, res, next)
            res.status(response.status)
            res.json({
                message: response.message,
                data: response.data
            })
        } catch (error) {
            console.log(`🚨 error 🚨`)
            console.error(error)
            console.log(`🚨 end of error 🚨`)
            res.status(error?.status || 500)
            res.json({
                message: error?.message || "Internal server error",
                data: error?.data
            })
        }

    }
}