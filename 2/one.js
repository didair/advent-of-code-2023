import buddy from "../buddy.ts";

const solution = {
	settings: {
		red: 12,
		green: 13,
		blue: 14,
	},
	run: async () => {
		const games = await buddy.loadAndSplitFile('./2/input.elf');
		let result = 0;

		games.forEach((game) => {
			let isPossible = true;
			const gameTag = game.split(': ')[0];
			const gameId = buddy.keepNumbers(gameTag, true);
			const gameRolls = game.split(': ')[1];

			gameRolls.split(';').forEach((roll) => {
				const cubes = buddy.cleanString(roll.split(','));
				cubes.forEach((cube) => {
					const amount = buddy.keepNumbers(cube.split(' ')[0], true);
					const color = cube.split(' ')[1];
					if (amount > solution.settings[color]) {
						isPossible = false;
					}
				});
			});

			if (isPossible) {
				result += gameId;
			}
		});

		return result;
	},
};

export default solution;
