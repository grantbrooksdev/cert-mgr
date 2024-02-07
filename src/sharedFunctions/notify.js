const notifyExternal = async (id, active) => {
	try {
		await fetch('https://httpbin.org/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: id, active: active }),
		});
		return { success: true };
	} catch (err) {
		return { success: false, error: err };
	}
};

module.exports = { notifyExternal };
