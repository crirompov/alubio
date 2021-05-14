import sequelize from '../common/mysql.js'
import Sequelize from 'sequelize'

const Companies = sequelize.define(
	'COMPANIES',
	{
		ID: {
			type: Sequelize.BIGINT(11),
			autoIncrement: true,
			field: 'ID',
			allowNull: false,
			primaryKey: true
		},
		NAME: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: 'NAME'
		},
		CIF: {
			type: Sequelize.STRING(9),
			allowNull: false,
			field: 'CIF',
			unique: true,
			validate: {
				is: /^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/
			}
		},
		SHORTDESC: {
			type: Sequelize.STRING(100),
			allowNull: true,
			field: 'SHORTDESC'
		},
		DESCRIPTION: {
			type: Sequelize.STRING(255),
			allowNull: false,
			field: 'DESCRIPTION'
		},
		EMAIL: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: 'EMAIL',
			unique: true, //Cada empresa debe tener un email diferente. 
			validate: {
				isEmail: true
			}
		},
		CCC: {
			type: Sequelize.INTEGER(8),
			allowNull: true,
			field: 'CCC'
		},
		DATE: {
			type: Sequelize.DATE(),
			allowNull: true,
			field: 'DATE'
		},
		STATUS: {
			type: Sequelize.BOOLEAN(),
			allowNull: true,
			field: 'STATUS'
		},
		LOGO: {
			type: Sequelize.STRING(255),
			allowNull: false,
			field: 'LOGO',
			validate: {
				isUrl: true
			}
		},
		TOKEN: {
			type: Sequelize.STRING(255),
			allowNull: false,
			unique: true,
			field: 'TOKEN',
		},
		CREATED_AT: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		},
		UPDATED_AT: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		}
	},
	{
		timestamps: false,
		freezeTableName: true //Desactiva la modificación de los campos de la base de datos
	}
)

module.exports = Companies