import companies from './routes/companies'
import owners from './routes/owners'
import favorites from './routes/favorites'
var logger = require("./services/logger.service").Logger;
import Utils from './common/utils'
import Strings from './common/strings'

const BASE_API_PATH = "/api/v0";

export default app => {
    app.use(BASE_API_PATH+'/companies', companies)
    app.use(BASE_API_PATH+'/owners', owners)
    app.use(BASE_API_PATH+'/favorites', favorites)
    app.get("*", (req, res) => {
        logger.error(Utils.ERROR + Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.GET_COMPANIES_FIND + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.ROUTE_NOT_FOUND + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.REQUEST_ERROR_CONTAINER_LEFT + req.url + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
        res.status(Utils.HTTP_CODE_OK).send(Strings.TRY_ERROR)
    });
}