import express from 'express'
import CompaniesController from '../controllers/companiesCtrl'
import { auth } from '../middlewares'

const router = express.Router()

//router.get('/', auth, (req, res, next) => {
router.get('/', (req, res, next) => {
    var param_page = Number.parseInt(req.query.page)
    var pagination_aux = Number.isNaN(param_page) || param_page == 1  ? 0 : (param_page - 1)*20
    console.log(Date() + " - GET /companies")
    if(pagination_aux < 10000000000)
        CompaniesController.getCompaniesList(
            pagination_aux,
            20 
            )
        .then(result => {
            res.status(result[0]).send(result[1])
        })
        .catch(error => {
            console.error("[ERROR] " +Date() + "")
            res.status(409).send("Error")
        })
    else{
        console.error("[ERROR] " +Date() + "")
        res.status(409).send("Error demasiadas páginas")
    }
})

//router.get('/find', auth, (req, res, next) => {
router.get('/find', (req, res, next) => {
    console.log(Date() + " - GET /companies/find")
    var data_search_param = req.body.searchParam
    CompaniesController.findCompany(data_search_param)
    .then(result => {
        res.status(result[0]).send(result[1])
    })
    .catch(error => {
        console.error("[ERROR] " +Date() + "")
        res.status(409).send("Error")
    })
})

//router.post('/', auth, (req, res, next) => {
router.post('/', (req, res, next) => {
    var data = req.body
    console.log(Date() + " - POST /companies")

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
            res.status(result[0]).send(result[1])
        })
        .catch(error => {
            console.error("[ERROR] " +Date() + "")
            res.status(409).send("Error")
        })

    } else {
		res.status(409).send(JSON.stringify({error: "Faltan parámetros"}))
	}
})

//router.put('/:cif', auth, (req, res, next) => {
router.put('/:cif', auth, (req, res, next) => {
    var param_cif = req.params.cif
    var data = req.body
    console.log(Date() + " - PUT /companies/"+param_cif)
    if (data.hasOwnProperty("cif") || data.hasOwnProperty("date")
    || data.hasOwnProperty("email") || data.hasOwnProperty("id")){

		res.status(409).send(JSON.stringify({error: "Error parámetros"}))

    }else{
        if(req.cif_company != param_cif){
            res.status(409).send(JSON.stringify({error: "El token no pertenece a la empresa que se quiere editar"}))
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
                console.error("[ERROR] " +Date() + "")
                res.status(409).send("Error")
            })
            }
    }
})

//router.delete('/', auth, (req, res, next) => {
router.delete('/', (req, res, next) => {
    console.log(Date() + " - DELETE /companies")
    res
        .sendStatus(405)
})

export default router