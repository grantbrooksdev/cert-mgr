const Customer = require('../../classes/Customer');

const createCustomer = async (request, response) => {
	const { email, name, password } = request?.body;
	if (!email || !name || !password) {
		// let future implementation of front end validate data types
		// purposefully provide vague response from server
		return response.status(403).send('Insufficient data');
	}
	const customer = new Customer(email, name, password);
	const { success } = await customer.create();
	if (success) {
		return response.send(customer.email);
	} else {
		return response.status(403).send('Duplicate customer conflict');
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
	const { email } = request?.body;
	const customer = new Customer(email);
	const deleted = await customer.delete();
	if (deleted > 0) {
		return response.send('deleted');
	} else {
		return response.status(404).send('customer not found');
	}
};

const getAllCustomerCertificates = async (request, response) => {
	const { email } = request?.query;
	const customer = new Customer(email);
	const certs = await customer.getActiveCerts();
	return response.send(certs ?? []);
};

module.exports = { createCustomer, deleteCustomer, getCustomer, getAllCustomerCertificates };
