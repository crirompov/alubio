import express from 'express'
import CompaniesController from '../controllers/companiesCtrl'
import { auth, authGet } from '../middlewares'
import Utils from '../common/utils'
import Strings from '../common/strings'
import Config from '../common/config'
var logger = require("../services/logger.service").Logger;

const router = express.Router()

router.get('/', authGet, (req, res, next) => {
    var param_page = Number.parseInt(req.query.page)
    var pagination_aux = Number.isNaN(param_page) || param_page == 1  ? 0 : (param_page - 1)*20
    console.log(Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.GET_COMPANIES)
    if(pagination_aux < Config.PAGINATION_MAX)
        CompaniesController.getCompaniesList(
            pagination_aux,
            20 
            )
        .then(result => {
            res.status(result[0]).send(result[1])
        })
        .catch(error => {
            console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT + error + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
            res.status(Utils.HTTP_CODE_CONFLICT).send(Strings.SIMPLE_ERROR_MESSAGE)
        })
    else{
        console.error(Utils.ERROR +Date() + Utils.ERROR_MAX_PAGINATION + '['+pagination_aux+']')
        res.status(Utils.HTTP_CODE_CONFLICT).send(Strings.ERROR_MAX_PAGINATION)
    }
})

router.get('/find', (req, res, next) => {
    console.log(Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.GET_COMPANIES_FIND)
    var data_search_param = req.body.searchParam.toString()
    if(data_search_param.length < 3){
        logger.error(Utils.ERROR + Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.GET_COMPANIES_FIND + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.LESS_THAN_THREE_CHARACTER + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.REQUEST_ERROR_CONTAINER_LEFT + data_search_param + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
        res.status(Utils.HTTP_CODE_OK).send(Strings.TRY_ERROR)
    }else{
        CompaniesController.findCompany(data_search_param)
        .then(result => {
            res.status(result[0]).send(result[1])
        })
        .catch(error => {
            console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT + error + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
            res.status(Utils.HTTP_CODE_CONFLICT).send(Strings.SIMPLE_ERROR_MESSAGE)
        })
    }
})

router.post('/', (req, res, next) => {
    var data = req.body
    console.log(Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.POST_COMPANIES)
    
    if (data.hasOwnProperty("name") && data.hasOwnProperty("description")
    && data.hasOwnProperty("email") && data.hasOwnProperty("cif")
    && data.hasOwnProperty("logo")) {
        var param_name = data.name.toString()
        var param_description = data.description.toString()
        var param_email = data.email
        var param_cif = data.cif
        var param_logo = data.logo
        var param_shortdesc = data.shortdesc
        var param_CCC = data.ccc
        var param_date = data.date
        var param_status = data.status

        CompaniesController.createCompany(param_name, param_description, param_email, param_cif, param_logo, param_shortdesc, param_CCC, param_date, param_status)
        .then(result => {
            res.status(result[0]).send(JSON.parse(result[1]))
        })
        .catch(error => {
            console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT + error + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
            res.status(Utils.HTTP_CODE_CONFLICT).send(JSON.stringify({error: Strings.SIMPLE_ERROR_MESSAGE}))
        })

    } else {
        logger.error(Utils.ERROR + Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.POST_COMPANIES + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.ERROR_PARAMETER + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.REQUEST_ERROR_CONTAINER_LEFT + JSON.stringify(data) + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
		res.status(Utils.HTTP_CODE_CONFLICT).send(JSON.stringify({error: Strings.PARAMETERS_INCORRECT}))
	}
})

router.put('/:cif', auth, (req, res, next) => {
    var param_cif = req.params.cif
    var data = req.body
    console.log(Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.PUT_COMPANIES + param_cif)
    if (data.hasOwnProperty("cif") || data.hasOwnProperty("date")
    || data.hasOwnProperty("email") || data.hasOwnProperty("id")){

        logger.error(Utils.ERROR + Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.PUT_COMPANIES + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.ERROR_PARAMETER + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.REQUEST_ERROR_CONTAINER_LEFT + JSON.stringify(data) + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
		res.status(Utils.HTTP_CODE_OK).send(JSON.stringify({error: Strings.TRY_ERROR}))

    }else{
        if(req.cif_company != param_cif){
            logger.error(Utils.ERROR + Date() + Utils.REQUEST_MESSAGE_SEPARATOR + Utils.PUT_COMPANIES + Utils.REQUEST_MESSAGE_SEPARATOR + Strings.TOKEN_INCORRECT_EDIT_COMPANY + Utils.REQUEST_ERROR_CONTAINER_LEFT + req.cif_company + Utils.REQUEST_ERROR_CONTAINER_RIGHT + Utils.REQUEST_ERROR_CONTAINER_LEFT + param_cif + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
            res.status(Utils.HTTP_CODE_OK).send(Strings.TRY_ERROR)
        }else{

            var param_name = data.name.toString()
            var param_description = data.description.toString()
            var param_logo = data.logo
            var param_shortdesc = data.shortdesc
            var param_CCC = data.ccc
            var param_status = data.status
            
            CompaniesController.updateCompany(param_cif, param_name, param_description, param_logo, param_shortdesc, param_CCC, param_status)
            .then(result => {
                res.status(result[0]).send(result[1])
            })
            .catch(error => {
                console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT + error + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
                res.status(Utils.HTTP_CODE_CONFLICT).send(Strings.SIMPLE_ERROR_MESSAGE)
            })
            }
    }
})

export default router