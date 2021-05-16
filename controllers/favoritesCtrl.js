import Favorites from '../models/favorites'
import Utils from '../common/utils'
import Strings from '../common/strings'


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
                return [Utils.HTTP_CODE_OK, Strings.FAVORTIES_CREATED]
            })
            .catch(error => {
                console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT + error + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
                return [Utils.HTTP_CODE_CONFLICT, Strings.SIMPLE_ERROR_MESSAGE]
            })

    }
};