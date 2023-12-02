import buddy from "../buddy.ts";

const solution = {
	run: async () => {
		const games = await buddy.loadAndSplitFile('./2/input.elf');
		let result = 0;

		games.forEach((game) => {
			const gameRolls = game.split(': ')[1];
			const lowestCubes = {};

			gameRolls.split(';').forEach((roll) => {
				const cubes = buddy.cleanString(roll.split(','));
				cubes.forEach((cube) => {
					const amount = buddy.keepNumbers(cube.split(' ')[0], true);
					const color = cube.split(' ')[1]
					if (lowestCubes[color] == null || lowestCubes[color] < amount) {
						lowestCubes[color] = amount;
					}
				});
			});

			const gameSum = Object.keys(lowestCubes).reduce((prev, current, index) => {
				const value = lowestCubes[Object.keys(lowestCubes)[index]];
				if (prev == 0) return value;
				if (value > 0) return prev * value;
				return prev;
			}, 0);

			result += gameSum;
		});

		return result;
	},
};

export default solution;
