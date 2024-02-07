const { randomBytes } = require('node:crypto');
const { CertificateModel } = require('../../models');
const Customer = require('./Customer');
const { notifyExternal } = require('../sharedFunctions/notify');

class Certificate {
	constructor(email, active, pkey) {
		this.id = null;
		this.email = email ?? null;
		this.active = active ?? true;
		this.privateKey = Buffer.from(pkey, 'utf8');
		this.certBody = this.generateBody();
	}
	async create() {
		if (!this.email) {
			return;
		}
		try {
			const customer = new Customer(this.email);
			// retrieve customer info from db
			await customer.get();
            if (!customer?.id) {
                throw 'customer not found'
            }
            
			// create entry in Certificate table
			const newCert = await CertificateModel.create({
				customerId: customer.id,
				email: this.email,
				active: this.active,
				privateKey: this.privateKey,
				certBody: this.certBody,
			});
			this.id = newCert.id;
			// destuctured for future error handling
			return { success: true, error: null };
		} catch (err) {
			return { success: false, error: err };
		}
	}
	static async toggleActive(id, active) {
		// this could be done the way I did it here or it could be a simply a genuine toggle
		try {
			const cert = await CertificateModel.findOne({
				where: { id: id },
				rejectOnEmpty: true,
			});
			if (!cert) {
				return;
			}
			await cert.update({ active: active });
			// handle external notification via another function, make it cleaner / more swappable
			await notifyExternal(id, active);
			return { success: true };
		} catch (err) {
			return { success: false, error: err };
		}
	}
    static async deleteAllFromCustomer(customerId) {
		try {
            await CertificateModel.destroy({
				where: { customerId: customerId },
			});
			return { success: true };
		} catch (err) {
			return { success: false, error: err };
		}
	}
	generateBody() {
		// random certificate body for this exercise
		return `-----BEGIN CERTIFICATE----- ${randomBytes(64).toString('hex')} -----END CERTIFICATE-----`;
	}
}

module.exports = Certificate;
