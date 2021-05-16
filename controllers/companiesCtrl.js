
import sequelize from 'sequelize';
import Companies from '../models/companies'
import  Op from "sequelize";
import Utils from '../common/utils'
import Strings from '../common/strings'
import Config from '../common/config'


var CompaniesController = module.exports = {
    
    createCompany(
        param_name, 
        param_description, 
        param_email, 
        param_cif, 
        param_logo,
        param_shortdesc,
        param_CCC,
        param_date,
        param_status
        ){
        return Companies.build({
            NAME: param_name,
            DESCRIPTION: param_description,
            EMAIL: param_email,
            CIF: param_cif,
            LOGO: param_logo,
            SHORTDESC: param_shortdesc ? param_shortdesc : null,
            CCC: param_CCC ? param_CCC : null,
            DATE: param_date ? param_date : null,
            STATUS: param_status ? param_status : null,
            TOKEN: this.generateCompanyToken()
        })
        .save()
        .then(companySaved => {
            return [Utils.HTTP_CODE_OK, JSON.stringify(Utils.JSON_CREATE_LEFT + Utils.JSON_CREATE_AUX + Config.COMPANIES_SEND_TOKEN_JSON + Utils.JSON_CREATE_AUX + Utils.JSON_CREATE_AUX_POINT+ Utils.JSON_CREATE_AUX+companySaved.TOKEN + Utils.JSON_CREATE_AUX + Utils.JSON_CREATE_RIGHT)]
        })
        .catch(error => {
            console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT + error + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
			return [Utils.HTTP_CODE_CONFLICT, Strings.SIMPLE_ERROR_MESSAGE]
        })
    },

    updateCompany(
        param_cif,
        param_name, 
        param_description,  
        param_logo,
        param_shortdesc,
        param_CCC,
        param_status
        ){
        return Companies.update({
            NAME: param_name,
            DESCRIPTION: param_description,
            LOGO: param_logo,
            SHORTDESC: param_shortdesc,
            CCC: param_CCC,
            STATUS: param_status
        }, { where: {CIF: param_cif}})
        .then( companyUpdated => {
			return [Utils.HTTP_CODE_OK, Strings.COMPANY_UPDATE_MESSAGE]
        })
        .catch(error =>{
            console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT + error + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
			return [Utils.HTTP_CODE_CONFLICT, Strings.SIMPLE_ERROR_MESSAGE]
        })
    },

    getCompaniesList(param_offset, param_limit){
        return Companies
        .findAll({
            offset: param_offset,
            limit: param_limit,
            attributes: { exclude: ['CCC', 'CIF', 'DATE', 'TOKEN']}
        })
        .then(result => {
            return [Utils.HTTP_CODE_OK, result]
        })
        .catch(error =>{
            console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT + error + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
			return [Utils.HTTP_CODE_CONFLICT, Strings.SIMPLE_ERROR_MESSAGE]
        })
    },

    findCompany(param_text){
        return Companies
        .findAll({
            attributes: { exclude: ['CCC', 'CIF', 'DATE', 'TOKEN']},
            where: {
                DESCRIPTION: {
                    [sequelize.Op.like]: "%"+param_text+"%"
                }
            }
        })
        .then(result => {
            return [Utils.HTTP_CODE_OK, result]
        })
        .catch(error =>{
            console.error(Utils.ERROR +Date() + Utils.REQUEST_ERROR_CONTAINER_LEFT + error + Utils.REQUEST_ERROR_CONTAINER_RIGHT)
			return [Utils.HTTP_CODE_CONFLICT, Strings.SIMPLE_ERROR_MESSAGE]
        })
    },

    generateCompanyToken(){
        return Math.random().toString(36).substr(2);
    }
};