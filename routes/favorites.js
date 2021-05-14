import express from 'express'
import FavoritesController from '../controllers/favoritesCtrl'
import OwnersController from '../controllers/ownersCtrl'
import { auth } from '../middlewares'

const router = express.Router()


//router.get('/', auth, (req, res, next) => {
router.get('/', (req, res, next) => {

})

//router.post('/', auth, (req, res, next) => {
router.post('/', (req, res, next) => {
    var data = req.body
    console.log(Date() + " - POST /favorites")
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
                console.error("[ERROR] " +Date() + "")
                res.status(409).send("Error")
            })
        }else{
            res.status(409).send(JSON.stringify({error: "Dueño no existe"}))
        }
    })
    }else{
		res.status(409).send(JSON.stringify({error: "Faltan parámetros"}))
    }
})

//router.put('/:cif', auth, (req, res, next) => {
router.put('/', (req, res, next) => {
    console.log(Date() + " - PUT /favorites/")
    
})

//router.delete('/', auth, (req, res, next) => {
router.delete('/', (req, res, next) => {
    console.log(Date() + " - DELETE /favorites")
    res
        .sendStatus(405)
})

export default router