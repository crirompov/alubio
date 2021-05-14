import express from 'express'
import config from './config'
import sequelize from './common/mysql'
//import Sequelize from 'sequelize'

import router from './routers'

let _server


//Probamos la conexión con la base de datos
sequelize.authenticate().then(err => {
	if (err) {
	   console.log('Hay un error con la conexión de la base de datos');
	} else {
	   console.log('La conexión con la base de datos ha tenido éxito');
	}
});

const server = {
	start(){
		const app = express()

		config(app)

		router(app)

		_server = app.listen(process.env.PORT, () => {
			if(process.env.NODE_ENV !== "test"){
				console.log("Servidor corriendo en http://localhost:9000")
			}
		})
	},
	close(){
		_server.close();
	}
}

export default server

if(!module.parent){
	server.start();
}