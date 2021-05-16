import Utils from '../common/utils'
import Config from '../common/config'



var UtilsController = module.exports = {
    getFinalUrl(
        url,
        page,
        limitSum
    ){
        if(!Number.isNaN(page)){
            return url+ Config.PAGINATION_URL_CREATE +(page+limitSum)
        }
        return url
    },

    getLimitModule(
        limit
    ){
        if(!Number.isNaN(limit) && (limit % Number.parseInt(Config.LIMIT_MULTIPLE) ) == 0){
            return limit / Number.parseInt(Config.LIMIT_MULTIPLE)
        }
        return 0
    }
};