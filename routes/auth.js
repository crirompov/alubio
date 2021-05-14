import express from 'express'
import authController from '../controllers/auth'

const router = express.Router()

router.post('/', (req, res, next) => {

    //Recibimos los parámetros:
    var data = req.body //importante poner las variables que se reciben por formulario con esta variable previa.
    var email_data = data.email
    var password_data = data.password

    console.log("Email => " + email_data)
    //console.log("Password => " + password_data)
    authController.auth(email_data, password_data).then(data => {
        if (data != 401 && data != 409){
            res.send(data)
        }else{
            res.sendStatus(data)
        }
    })
        .catch(error => {
            console.log("[ERROR] [" + error + "]")
            res.sendStatus(409)
        })
})

router.post('/spd', (req, res, next) => {

    //Recibimos los parámetros:
    var data = req.body //importante poner las variables que se reciben por formulario con esta variable previa.
    var serial_number = data.serial_number

    authController.comprobateSerialNumber(serial_number).then(data => {
        if(data != 0){
            res.send(data)
        }else{
            res.sendStatus(409)
        }
    })
    .catch(error => {
        console.log("[ERROR] [" + error + "]")
        res.sendStatus(409)
    })
})

export default router