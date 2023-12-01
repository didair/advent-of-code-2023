
const solution = {
	run: async () => {
		const input = await Deno.readTextFile('./1/input.elf');
		const calibrationValues = input.split('\n').filter((value) => value != '');
		const letterNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
		let total = 0;
		let numbers = [];

		calibrationValues.forEach((calibrationValue) => {
			const matches = [...calibrationValue.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)].map(match => match[1]);
			numbers = [...numbers, matches.map(n => /\d/.test(n) ? Number(n) : letterNumbers.indexOf(n) + 1)];
		});

		total = numbers.reduce((sum, current) => sum + current.at(0) * 10 + current.at(-1), 0);
		return total;
	},
};

export default solution;
