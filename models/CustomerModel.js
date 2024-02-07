'use strict';
const { randomBytes, pbkdf2Sync } = require('node:crypto');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CustomerModel extends Model {
		static associate(models) {
			CustomerModel.hasMany(models.CertificateModel, {
				foreignKey: 'customerId',
				as: 'certificates',
			});
		}
		validatePassword(password) {
			return this.hash == pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
		}
	}
	CustomerModel.init(
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			email: DataTypes.STRING,
			name: DataTypes.STRING,
			password: DataTypes.STRING,
			salt: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'CustomerModel',
			hooks: {
				beforeCreate: (user) => {
					try {
						if (user.password) {
							// hash the customer's password for storing
							const salt = randomBytes(16).toString('hex');
							user.salt = salt;
							user.password = pbkdf2Sync(user.password, salt, 1000, 64, `sha512`).toString(`hex`);
						} else {
							// here's one example of what we could throw and then catch
							// we'd want to ensure that we have coverage for all exeptions
							throw 'no password provided';
						}
					} catch (err) {
						// we'd catch and handle this err in further iterations of this exercise
						// for now, just console.log it
						console.log(err);
					}
				},
			},
		}
	);
	return CustomerModel;
};
