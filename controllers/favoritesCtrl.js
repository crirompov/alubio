import Favorites from '../models/favorites'


var FavoritesController = module.exports = {
    createFavoriteRelation(
        id_owner_param,
        id_company_param
    ){
    
        return Favorites.build({
                ID_OWNER: id_owner_param,
                ID_COMPANY: id_company_param
            })
            .save()
            .then(companySaved => {
                return [200, "CREATED"]
            })
            .catch(error => {
                console.log("[ERROR] ["+error+"]")
                return [409, "Error"]
            })

    }
};