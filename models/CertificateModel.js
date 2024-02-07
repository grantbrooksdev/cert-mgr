'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CertificateModel extends Model {
		static associate(models) {
			CertificateModel.belongsTo(models.CustomerModel, {
				foreignKey: 'customerId',
				as: 'customer',
			});
		}
	}
	CertificateModel.init(
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			customerId: DataTypes.INTEGER,
			active: DataTypes.BOOLEAN,
			privateKey: DataTypes.BLOB,
			certBody: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'CertificateModel',
		}
	);
	return CertificateModel;
};
