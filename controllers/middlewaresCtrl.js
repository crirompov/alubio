
import sequelize from 'sequelize';
import Companies from '../models/companies'
import Utils from '../common/utils'
import Strings from '../common/strings'


var MiddlewareController = module.exports = {

    comprobateCompanyToken(
        token
    ){
        return Companies
        .findOne({
            where: {TOKEN: token}
        })
        .then(result => {
            return [Utils.HTTP_CODE_OK, result]
        })
        .catch(error =>{
            console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT + error + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
            return [Utils.HTTP_CODE_CONFLICT, Strings.SIMPLE_ERROR_MESSAGE]
        })
    }
};