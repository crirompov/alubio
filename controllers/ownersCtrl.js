
const request = require('request');
const rp = require('request-promise');
import UtilsController from './utilsCtrl' 


var OwnersController = module.exports = {
    async getAllUsers(
        page_query,
        limit_query
    ){
        var limit_aux = UtilsController.getLimitModule(limit_query)
        var resultLimit = JSON.parse('{"code": 200}')
        if(limit_aux > 1){
          const promises = []
          for (let i = 0;i<limit_aux; i++){ 
            promises.push(this.auxGetAllUser(page_query, i))
          }
          return Promise.all(promises)
            .then(result => {
              resultLimit.data = result.flat()
              return resultLimit
            })
        }else{
          const options = {
            url: UtilsController.getFinalUrl('https://gorest.co.in/public-api/users', page_query, 0),
            headers: {
              'Authorization': 'Bearer 9d63976dc046976d8d529d6edb61ba42387ae790aec16bccc1df599cbef1ddfb'
            }
          };
          return rp(options)
          .then(result => {
            resultLimit.data = JSON.parse(result).data
            return resultLimit
          })
        }
    },

    auxGetAllUser(
      page_query,
      i_variable
    ){

      const options = {
        url: UtilsController.getFinalUrl('https://gorest.co.in/public-api/users', page_query, i_variable),
        headers: {
          'Authorization': 'Bearer 9d63976dc046976d8d529d6edb61ba42387ae790aec16bccc1df599cbef1ddfb'
        }
      };
      return rp(options)
      .then(result => {
        return JSON.parse(result).data
      })
    },

    getExistUser(
        id_user
    ){
        const options = {
            url: 'https://gorest.co.in/public-api/users?id='+id_user ,
            headers: {
              'Authorization': 'Bearer 9d63976dc046976d8d529d6edb61ba42387ae790aec16bccc1df599cbef1ddfb'
            }
        };
        return rp(options)
        .then(result => {
          var body_aux = JSON.parse(result);
          if (Number.parseInt(body_aux.meta.pagination.total) != 0) {
            return 1;
          } else {
            return 0;
          } 
        })
    },

    getDataUsers(
        id_user
    ){
      const options1 = {
          url: 'https://gorest.co.in/public-api/users/'+id_user ,
          headers: {
            'Authorization': 'Bearer 9d63976dc046976d8d529d6edb61ba42387ae790aec16bccc1df599cbef1ddfb'
          }
        };
        const options2 = {
            url: 'https://gorest.co.in/public-api/users/'+id_user+'/posts' ,
            headers: {
              'Authorization': 'Bearer 9d63976dc046976d8d529d6edb61ba42387ae790aec16bccc1df599cbef1ddfb'
            }
          };
        return rp(options1)
        .then(user_details => {
            return rp(options2)
            .then(user_posts => {
              const promises = []
              for(let post = 0; post < JSON.parse(user_posts).data.length; post++) {
                promises.push(this.getCommentsByPost(JSON.parse(user_posts).data[post]))
                
              }
              return Promise.all(promises)
              .then(promiseResult => {

                var result = JSON.parse(user_details).data
                result.posts = promiseResult
                
                return result
              })
            })
        })
    },

    getCommentsByPost(
      post
    ){
      const options = {
        url: 'https://gorest.co.in/public-api/posts/'+post.id+'/comments' ,
        headers: {
          'Authorization': 'Bearer 9d63976dc046976d8d529d6edb61ba42387ae790aec16bccc1df599cbef1ddfb'
        }
      };
      return rp(options)
      .then(result => {
        post.comments = JSON.parse(result).data
        return post
      })
    }
};