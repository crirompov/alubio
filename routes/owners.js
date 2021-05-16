import express from 'express'
import OwnersController from '../controllers/ownersCtrl'

import Utils from '../common/utils'
import Strings from '../common/strings'

var logger = require("../services/logger.service").Logger;

const router = express.Router()


router.get('/', (req, res, next) => {
    var page_query = Number.parseInt(req.query.page)
    var limit_query = Number.parseInt(req.query.limit)
    console.log(Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.GET_OWNERS)
    OwnersController.getAllUsers(page_query, limit_query)
    .then(result => {
        res.send(result)
    })
    .catch(error => {
        console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT +error+Utils.REQUEST_ERROR_CONTAINER_RIGHT)
        res.status(Utils.HTTP_CODE_CONFLICT).send(Strings.SIMPLE_ERROR_MESSAGE)
    })
})

    router.get('/:id', (req, res, next) => {
        var param_id = Number.parseInt(req.params.id)
        if(!Number.isNaN(param_id)){
            console.log(Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.GET_OWNERS + param_id)
            OwnersController.getDataUsers(param_id)
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT +error+Utils.REQUEST_ERROR_CONTAINER_RIGHT)
                res.status(Utils.HTTP_CODE_CONFLICT).send(Strings.SIMPLE_ERROR_MESSAGE)
            })
        }else{
            logger.error(Utils.ERROR + Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.GET_OWNERS + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.REQUEST_ERROR_CONTAINER_LEFT + req.params.id + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
            res.status(Utils.HTTP_CODE_OK).send(Strings.TRY_ERROR)
        }
    })

export default router