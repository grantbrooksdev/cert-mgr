const { delaySomething } = require('./helperFunctions');

test('delaySomething does indeed return', async () => {
	expect(await delaySomething(1)).toBe(undefined);
});
