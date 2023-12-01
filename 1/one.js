
const solution = {
	run: async () => {
		const input = await Deno.readTextFile('./1/input.elf');
		const calibrationValues = input.split('\n').filter((value) => value != '');
		let total = 0;

		calibrationValues.forEach((calibrationValue) => {
			const value = calibrationValue.replace(/[^\d]*/g, '');
			total += parseInt(value[0] + value.slice(-1));
		});

		return total;
	},
};

export default solution;
