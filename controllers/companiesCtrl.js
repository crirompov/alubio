
import sequelize from 'sequelize';
import Companies from '../models/companies'
import  Op from "sequelize";


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
            return [200, "token: "+companyUpdated.TOKEN]
        })
        .catch(error => {
            console.log("[ERROR] ["+error+"]")
			return [409, "Error"]
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
			return [200, "Updated"]
        })
        .catch(error =>{
            console.log("[ERROR] ["+error+"]")
			return [409, "Error"]
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
            return [200, result]
        })
        .catch(error =>{
            console.log("[ERROR] ["+error+"]")
			return [409, "Error"]
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
            return [200, result]
        })
        .catch(error =>{
            console.log("[ERROR] ["+error+"]")
			return [409, "Error"]
        })
    },

    generateCompanyToken(){
        return Math.random().toString(36).substr(2);
    }
};