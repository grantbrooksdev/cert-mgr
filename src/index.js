const express = require('express');
const app = express();
app.use(express.json());
const db = require('../models');
const path = require('path');
const { connectToDB } = require('./setup/connectToDB');
const { createCustomer, deleteCustomer, getCustomer, getAllCustomerCertificates } = require('./routes/customer/customer');
const { createCertificate, toggleCertificateActive } = require('./routes/certificate/certificate');
const PORT = process.env.PORT || 3240;

connectToDB();

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log('Server Listening on port:', PORT);
	});
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, './www/index.html'));
});
app.get('/index.js', function (req, res) {
	res.sendFile(path.join(__dirname, './www/index.js'));
});

/**
 * CUSTOMER ENDPOINTS
 */
// POST a customer
app.post('/api/customer/create', createCustomer);
// DELETE a customer
app.delete('/api/customer/delete', deleteCustomer);
// GET a customer
app.get('/api/customer', getCustomer);
// GET all active certs for a customer
app.get('/api/customer/certificates', getAllCustomerCertificates);

/**
 * CERTIFICATE ENDPOINTS
 */
// POST a cert
app.post('/api/certificate/create', createCertificate);
// UPDATE the cert (activate / deactivate)
app.put('/api/certificate/update-active', toggleCertificateActive);
