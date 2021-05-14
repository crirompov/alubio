import sequelize from '../common/mysql.js'
import Sequelize from 'sequelize'
import Companies from './companies'

const Favorites = sequelize.define(
	'FAVORITES',
	{
		ID: {
			type: Sequelize.BIGINT(11),
			autoIncrement: true,
			field: 'ID',
			allowNull: false,
			primaryKey: true
		},
		ID_OWNER: {
			type: Sequelize.BIGINT(11),
			allowNull: false,
			field: 'ID_OWNER'
		},
		ID_COMPANY: {
			type: Sequelize.BIGINT(11),
			allowNull: false,
			field: 'ID_COMPANY',
			references: {
				model: Companies,
				key: 'ID'
			},
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

module.exports = Favorites