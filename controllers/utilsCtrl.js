



var UtilsController = module.exports = {
    getFinalUrl(
        url,
        page,
        limitSum
    ){
        if(!Number.isNaN(page)){
            return url+'?page='+(page+limitSum)
        }
        return url
    },

    getLimitModule(
        limit
    ){
        if(!Number.isNaN(limit) && (limit % 20 ) == 0){
            return limit / 20
        }
        return 0
    }
};