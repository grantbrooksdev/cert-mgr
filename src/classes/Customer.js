const { CustomerModel, CertificateModel } = require('../../models');

class Customer {
	constructor(email, name, password) {
		this.id = null;
		this.email = email;
		this.name = name ?? null;
		this.password = password ?? null;
	}
	async create() {
		try {
			const existingCustomer = await CustomerModel.findOne({
				where: {
					email: this.email,
				},
			});
			if (existingCustomer) {
				throw 'customer email exists already';
			}
			// take data from instantiation of the Customer and add it to the database
			const newCustomer = await CustomerModel.create({
				email: this.email,
				name: this.name,
				password: this.password,
			});
			this.id = newCustomer.id;
			this.password = null;
			return { success: true, error: null };
		} catch (err) {
			return { success: false, error: err };
		}
	}
	async get() {
		const customer = await CustomerModel.findOne({
			where: {
				email: this.email,
			},
		});
		if (customer) {
			// assign found information we want to the instance of the class
			this.id = customer.id;
			this.name = customer.name;
			return { success: true };
		} else {
			return { success: false };
		}
	}
	async delete() {
		try {
			const numberDeleted = await CustomerModel.destroy({
				where: {
					email: this.email,
				},
			});
			if (numberDeleted) {
				return { success: true, error: null };
			} else {
				return { success: false, error: null };
			}
		} catch (err) {
			return { success: false, error: err };
		}
	}
	async getActiveCerts() {
		try {
			await this.get();
			const customer = await CustomerModel.findOne({
				where: {
					id: this.id,
				},
				include: {
					model: CertificateModel,
					as: 'certificates',
					where: {
						active: true,
					},
				},
			});
			return customer.certificates ?? [];
		} catch (err) {
			return [];
		}
	}
}

module.exports = Customer;
