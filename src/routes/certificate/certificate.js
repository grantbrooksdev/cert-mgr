const Certificate = require('../../classes/Certificate');

const createCertificate = async (request, response) => {
    if (!request || !request.body) {
		return response.status(400).send('invalid data provided');
    }
	const { email, active, pkey } = request?.body;
	if (!email) {
		return response.status(400).send('customer email not provided');
	}
	if (!pkey) {
		return response.status(400).send('pkey not provided');
	}
    if (typeof active !== 'boolean') {
		return response.status(400).send('active must be a boolean');
    }
	const cert = new Certificate(email, active, pkey);
	const { success, error } = await cert.create();
	if (success) {
		return response.send({ body: cert.certBody });
	} else {
		return response.status(400).send(`${error}`);
	}
};

const toggleCertificateActive = async (request, response) => {
	const { id, active } = request?.body;
	if (!id) {
		return response.status(400).send('Id not provided');
	}
	if (typeof active !== 'boolean') {
		return response.status(400).send('active must be a boolean');
	}
	const { success, error } = await Certificate.toggleActive(id, active);
	if (success) {
		return response.send({ body: active });
	} else {
		return response.status(400).send(`${error}`);
	}
};

module.exports = { createCertificate, toggleCertificateActive };
