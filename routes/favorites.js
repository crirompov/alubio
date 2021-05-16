import express from 'express'
import FavoritesController from '../controllers/favoritesCtrl'
import OwnersController from '../controllers/ownersCtrl'
import Utils from '../common/utils'
import Strings from '../common/strings'

var logger = require("../services/logger.service").Logger;

const router = express.Router()

router.post('/', (req, res, next) => {
    var data = req.body
    console.log(Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.POST_FAVORITES)
    if (data.hasOwnProperty("id_owner") && data.hasOwnProperty("id_company")) {
        var param_id_owner = Number.parseInt(data.id_owner)
        var param_id_company = Number.parseInt(data.id_company) 
        OwnersController.getExistUser(param_id_owner)
        .then(result => {
          if ( result == 1){
            FavoritesController.createFavoriteRelation(param_id_owner, param_id_company)
            .then(result => {
                res.status(result[0]).send(result[1])
            })
            .catch(error => {
                console.error(Utils.ERROR +Date() + '['+error+']')
                res.status(Utils.HTTP_CODE_CONFLICT).send(Strings.SIMPLE_ERROR_MESSAGE)
            })
        }else{
            res.status(Utils.HTTP_CODE_CONFLICT).send(JSON.stringify({error: Strings.OWNER_NOT_EXIST}))
        }
    })
    }else{
        logger.error(Utils.ERROR + Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.POST_FAVORITES + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.ERROR_PARAMETER + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.REQUEST_ERROR_CONTAINER_LEFT + data_search_param + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
        res.status(Utils.HTTP_CODE_OK).send(Strings.TRY_ERROR)
    }
})

export default router