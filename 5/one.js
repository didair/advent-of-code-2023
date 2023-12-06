import buddy from "../buddy.ts";

const solution = {
	file: null,
	loadFile: async () => {
		solution.file = (await buddy.loadFile('./5/input.elf')).split('\n\n');
	},
	getData: (path) => {
		const pathIndex = solution.file.findIndex((f) => f.indexOf(path) > -1);
		return buddy.cleanString(solution.file[pathIndex].split(':')[1]);
	},
	getLocation: (item, path) => {
		const data = solution.getData(path).split('\n');
		let result = item;
		data.forEach((row) => {
			const destinationStart = parseInt(row.split(' ')[0]);
			const sourceStart = parseInt(row.split(' ')[1]);
			const range = parseInt(row.split(' ')[2]);

			if (item >= sourceStart && item <= sourceStart + range) {
				result = destinationStart + (item - sourceStart);
			}
		});

		return result;
	},
	run: async () => {
		await solution.loadFile();
		const seeds = solution.getData('seeds').split(' ');
		const maps = [
			'seed-to-soil',
			'soil-to-fertilizer',
			'fertilizer-to-water',
			'water-to-light',
			'light-to-temperature',
			'temperature-to-humidity',
			'humidity-to-location',
		];

		const locations = seeds.map((seed) => {
			const location = {
				'seed': parseInt(seed),
				'soil': 0,
				'fertilizer': 0,
				'water': 0,
				'light': 0,
				'temperature': 0,
				'humidity': 0,
				'location': 0,
			};

			maps.forEach((path) => {
				const loc = path.split('-')[0];
				const id = path.split('-')[2];
				location[id] = solution.getLocation(location[loc], path);
			});

			return location;
		});

		let lowestLocation = null;
		locations.forEach((location) => {
			if (lowestLocation == null) lowestLocation = location.location;
			if (location.location < lowestLocation) lowestLocation = location.location;
		})

		return lowestLocation;
	},
};

export default solution;