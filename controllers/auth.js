
import Users from '../models/users'
import SPDs from '../models/spds'
import People from '../models/people'
import Profile from '../models/user_profiles'
import jwt from 'jwt-simple'
import { config } from 'dotenv'

const SETTINGS = config()

var authController = module.exports = {
    
    auth(email_data,password_data){
        return Users.findOne({ where: { EMAIL: email_data, PASSWORD: password_data }, include: [{model: People, require: true, as: 'PERSON'}, {model: Profile, require: true, as: 'PROFILE', attributes: ['NAME','DESCRIPTION']}], attributes: ['ID','EMAIL','ACTIVE']}).then(result_usuario => {
            if (result_usuario != null) {
    
                const payload = {
                    id_user: result_usuario.ID,
                    user_profile: result_usuario.ID_PROFILE
                }
    
                const token = jwt.encode(payload, SETTINGS.parsed.TOKEN)
                return JSON.stringify({
                    "token": token,
                    "user_data": result_usuario
                })
            } else {
                //return JSON.stringify({"data": "Authentication error"})
                return 401
            }
        })
        .catch(error => {
            console.log("[ERROR] ["+error+"]")
            return 409
        })
    },

    comprobateSerialNumber(serial_number){
        return SPDs.findOne({ where: {SERIAL_NUMBER: serial_number }}).then(result_spd => {
            if (result_spd != null){
                const payload = {
                    serial_number: serial_number
                }
                const token = jwt.encode(payload, SETTINGS.parsed.TOKEN)
                return JSON.stringify({
                    "token": token
                })
            }else{
                if(this.serialNumberVerification(serial_number) == 0){
                    return SPDs.build({
                        SERIAL_NUMBER: serial_number,
                        TYPE_SPD: 1,
                        ACTIVE: 1
                    })
                    .save()
                    .then( data => {
                        const payload = {
                            serial_number: serial_number
                        }
                        const token = jwt.encode(payload, SETTINGS.parsed.TOKEN)
                        return JSON.stringify({
                            "token": token
                        })
                    })
                }else{
                    return 0 
                }
            }
        })
    },

    serialNumberVerification(serial_number){
        if(serial_number % 5 == 0){
            return 0
        }else{
            return 1
        }
    }
};