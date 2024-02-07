const Certificate = require('../../classes/Certificate');
const Customer = require('../../classes/Customer');

const createCustomer = async (request, response) => {
	const { email, name, password } = request?.body;
	if (!email || !name || !password) {
		// let future implementation of front end validate data types
		// purposefully provide vague response from server
		return response.status(403).send('Insufficient data');
	}
	const customer = new Customer(email, name, password);
	const { success, error } = await customer.create();
	if (success) {
		return response.send({ created: customer.email });
	} else {
		return response.status(403).send(error);
	}
};

const getCustomer = async (request, response) => {
	const { email } = request?.query;
	const customer = new Customer(email);
	const { success } = await customer.get();
	if (success) {
		return response.send(customer);
	} else {
		return response.status(404).send('customer not found');
	}
};

const deleteCustomer = async (request, response) => {
	try {
		const { email } = request?.body;
		const customer = new Customer(email);
		await customer.get();
		const deleteCerts = await Certificate.deleteAllFromCustomer(customer.id);
		if (!deleteCerts.success) {
			return response.status(400).send('could not delete certs');
		}
		const { success, error } = await customer.delete();
		if (success) {
			return response.send({ deleted: email });
		} else {
			return response.status(404).send(`Customer may not exist ${error}`);
		}
	} catch (err) {
		return response.status(404).send(`Customer not found: ${err}`);
	}
};

const getAllCustomerCertificates = async (request, response) => {
	const { email } = request?.query;
	const customer = new Customer(email);
	const certs = await customer.getActiveCerts();
	return response.send(certs ?? []);
};

module.exports = { createCustomer, deleteCustomer, getCustomer, getAllCustomerCertificates };
