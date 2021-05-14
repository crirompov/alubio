import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'

const SETTINGS = config()


export default app => {
    app.disabled("x-powered-by") //Por seguridad para que nadie sepa que estamos ejecutando express como servidor

    app.set("env", SETTINGS.parsed.ENV)
    app.set("config", SETTINGS.parsed)
    app.set("port", SETTINGS.parsed.PORT)
    app.locals.env = app.get("env")
    app.locals.config = app.get("config")

    if(process.env.NODE_ENV !== "test"){
        app.use(logger("combined"))
    }

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded( { extend: false }))

    app.use(cors())
}