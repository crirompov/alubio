import jwt from 'jwt-simple'
import MiddlewareController from './controllers/middlewaresCtrl'
import Strings from './common/strings'
import Utils from './common/utils'
var logger = require("./services/logger.service").Logger;
import security from './common/security'

export const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(Utils.HTTP_CODE_FORBIDDEN).send({ mensaje: Strings.UNAUTHORIZED })
    }
    const token = req.headers.authorization

    MiddlewareController.comprobateCompanyToken(token.toString())
    .then(result => {
        if (result[1] != null){
            req.cif_company = result[1].CIF
            next()
        }else{
            logger.error(Utils.ERROR + Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.PUT_COMPANIES + Utils.REQUEST_MESSAGE_SEPARATOR + Strings.TOKEN_INCORRECT_EDIT_COMPANY + Utils.REQUEST_ERROR_CONTAINER_LEFT + token.toString() + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
            res.status(Utils.HTTP_CODE_CONFLICT).send(JSON.stringify({mensaje: Strings.UNAUTHORIZED}))
        }
    })
    .catch(error => {
        console.error(Utils.ERROR +Date() + '['+error+']')
        res.status(Utils.HTTP_CODE_CONFLICT).send(Strings.SIMPLE_ERROR_MESSAGE)
    })
}
export const authGet = (req, res, next) => {
    var param_page = Number.parseInt(req.query.page)
    var pagination_aux = Number.isNaN(param_page) || param_page == 1  ? 0 : (param_page - 1)*20
    const token = req.headers.authorization ? req.headers.authorization : '' 

    MiddlewareController.comprobateCompanyToken(token.toString())
    .then(result => {
        if (result[1] != null){
            next()
        }else{
            if(pagination_aux > 10){
                res.status(Utils.HTTP_CODE_CONFLICT).send(JSON.stringify({mensaje: Strings.UNAUTHORIZED}))
            }else{
                next()
            }
        }
    })
    .catch(error => {
        console.error(Utils.ERROR +Date() + '['+error+']')
        res.status(Utils.HTTP_CODE_CONFLICT).send(Strings.SIMPLE_ERROR_MESSAGE)
    })
}

export const checkParameters = (req, res, next) => {
    //security
    // if()
    
    //     console.error(Utils.ERROR +Date() + '['+error+']')
    //     res.status(Utils.HTTP_CODE_CONFLICT).send(Strings.SIMPLE_ERROR_MESSAGE)
    
}