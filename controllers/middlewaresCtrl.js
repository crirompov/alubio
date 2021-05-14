
import sequelize from 'sequelize';
import Companies from '../models/companies'



var MiddlewareController = module.exports = {

    comprobateCompanyToken(
        token
    ){
        return Companies
        .findOne({
            where: {TOKEN: token}
        })
        .then(result => {
            return [200, result]
        })
        .catch(error =>{
            console.log("[ERROR] ["+error+"]")
			return [409, "Error"]
        })
    }
};