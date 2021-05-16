
const request = require('request');
const rp = require('request-promise');
import UtilsController from './utilsCtrl' 
import Config from '../common/config'
import CacheService from '../services/cache.service';

//Cache
const ttl = 60 * 60 * 7; 
const cache = new CacheService(ttl); 


var OwnersController = module.exports = {
    async getAllUsers(
        page_query,
        limit_query
    ){
        var limit_aux = UtilsController.getLimitModule(limit_query)
        var resultLimit = JSON.parse(Config.RESULT_INIT_JSON)
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
          //const options = this.getOptions(Config.GOREST_URL_USERS,)
          const options = {
            url: UtilsController.getFinalUrl(Config.GOREST_URL_USERS, page_query, 0),
            headers: {
              'Authorization': Config.HEADERS_INIT_TOKEN + Config.GOREST_TOKEN
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
        url: UtilsController.getFinalUrl(Config.GOREST_URL_USERS, page_query, i_variable),
        headers: {
          'Authorization': Config.HEADERS_INIT_TOKEN + Config.GOREST_TOKEN
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
            url: Config.GOREST_USERS_ID_PARAM+id_user ,
            headers: {
              'Authorization': Config.HEADERS_INIT_TOKEN + Config.GOREST_TOKEN
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
      return cache.get(id_user, () => this.getDataUserNoCache(id_user), () => this.getPostByUser(id_user))
      .then(result => {
        return result
      })
    },

    getDataUserNoCache(
      id_user
    ){
      const options1 = {
        url: Config.GOREST_URL_USERS+id_user ,
        headers: {
          'Authorization': Config.HEADERS_INIT_TOKEN + Config.GOREST_TOKEN
        }
      };
      return rp(options1)
      .then(user_details => {
          var result = JSON.parse(user_details).data
          return this.getPostByUser(id_user)
          .then(resultPost => {
            result.posts = resultPost
            return result 
          })
      })
    },
    getPostByUser(
      id_user
    ){
      const options2 = {
        url: Config.GOREST_URL_USERS + id_user + Config.GOREST_END_POSTS ,
        headers: {
          'Authorization': Config.HEADERS_INIT_TOKEN + Config.GOREST_TOKEN
        }
      };
      return rp(options2)
          .then(user_posts => {
            const promises = []
            for(let post = 0; post < JSON.parse(user_posts).data.length; post++) {
              promises.push(this.getCommentsByPost(JSON.parse(user_posts).data[post]))
              
            }
            return Promise.all(promises)
            .then(promiseResult => {
              return promiseResult
            })
          })
    },

    getCommentsByPost(
      post
    ){
      const options = {
        url: Config.GOREST_URL_POST + post.id + Config.GOREST_END_COMMENTS ,
        headers: {
          'Authorization': Config.HEADERS_INIT_TOKEN + Config.GOREST_TOKEN
        }
      };
      return rp(options)
      .then(result => {
        post.comments = JSON.parse(result).data
        return post
      })
    }
};