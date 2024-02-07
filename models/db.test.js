const db = require('./');
const Certificate = require('../src/classes/Certificate');
const Customer = require('../src/classes/Customer');

beforeAll(async () => {
	await db.sequelize.sync({ force: true });
});

const TEST_CUSTOMER = {
	email: 'grant@grantbrooks.dev',
	name: 'Grant',
	password: 'supersecretpassword1234',
};

const TEST_CERT_INPUT = {
	email: TEST_CUSTOMER.email,
	active: true,
	pkey: 'abcdefghijklmnop',
};

test('Create a customer & ensure proper email, name, and hashed password', async () => {
	expect.assertions(4);
	const customer = new Customer(TEST_CUSTOMER.email, TEST_CUSTOMER.name, TEST_CUSTOMER.password);
	await customer.create();
	expect(customer.id).not.toBeNaN();
	expect(customer.email).toEqual(TEST_CUSTOMER.email);
	expect(customer.name).toEqual(TEST_CUSTOMER.name);
	// for now we just check that it didnt store the password as is
	// more sophisticated tests would be needed in prod
	expect(customer.password).not.toEqual(TEST_CUSTOMER.password);
});

test('Get a customer', async () => {
	expect.assertions(2);
	const customer = new Customer(TEST_CUSTOMER.email);
	await customer.get();
	expect(customer.email).toEqual(TEST_CUSTOMER.email);
	expect(customer.name).toEqual(TEST_CUSTOMER.name);
});

test('Create a certificate and deactivate it', async () => {
	expect.assertions(4);
	const certificate = new Certificate(TEST_CERT_INPUT.email, TEST_CERT_INPUT.active, TEST_CERT_INPUT.pkey);
	const { success } = await certificate.create();
	expect(success).toBe(true);
	expect(certificate.active).toBe(TEST_CERT_INPUT.active);
	expect(certificate.privateKey).toStrictEqual(Buffer.from(TEST_CERT_INPUT.pkey, 'utf8'));
	const toggle = await Certificate.toggleActive(certificate.id, false);
	expect(toggle.success).toBeTruthy();
});

test('Delete a customer', async () => {
	expect.assertions(1);
	const customer = new Customer(TEST_CUSTOMER.email);
	await customer.delete();
	const { success } = await customer.get();
	expect(success).toBeFalsy();
});

afterAll(async () => {
	await db.sequelize.close();
});
