const delaySomething = async (delay) => {
	await new Promise((resolve) => {
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			resolve();
		}, delay);
	});
};

module.exports = { delaySomething }

