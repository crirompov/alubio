import jwt from 'jwt-simple'
import MiddlewareController from './controllers/middlewaresCtrl'

export const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ mensaje: "No authorized" })
    }
    const token = req.headers.authorization

    MiddlewareController.comprobateCompanyToken(token.toString())
    .then(result => {
        if (result != -1){
            req.cif_company = result[1].CIF
            next()
        }else{
            res.status(409).send(JSON.stringify({"data": "Unauthorized"}))
        }
    })
    .catch(error => {
        console.error("[ERROR] " +Date() + "")
        res.status(409).send("Error")
    })


}