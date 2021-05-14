import express from 'express'
import OwnersController from '../controllers/ownersCtrl'
import { auth } from '../middlewares'

const router = express.Router()


//router.get('/', auth, (req, res, next) => {
router.get('/', (req, res, next) => {
    var page_query = Number.parseInt(req.query.page)
    var limit_query = Number.parseInt(req.query.limit)
    console.log(Date() + " - GET /owners")
    OwnersController.getAllUsers(page_query, limit_query)
    .then(result => {
        res.send(result)
    })
})

//router.get('/:id', auth, (req, res, next) => {
    router.get('/:id', (req, res, next) => {
        var param_id = Number.parseInt(req.params.id)
        console.log(Date() + " - GET /owners")
        //req.pipe(OwnersController.getDataUsers(param_id)).pipe(res)
        OwnersController.getDataUsers(param_id)
        .then(result => {
            res.send(result)
        })
    })
    
//router.post('/', auth, (req, res, next) => {
router.post('/', (req, res, next) => {
    console.log(Date() + " - POST /owners")
})

//router.put('/:cif', auth, (req, res, next) => {
router.put('/', (req, res, next) => {
    console.log(Date() + " - PUT /owners/")
    
})

//router.delete('/', auth, (req, res, next) => {
router.delete('/', (req, res, next) => {
    console.log(Date() + " - DELETE /companies")
    res
        .sendStatus(405)
})

export default router