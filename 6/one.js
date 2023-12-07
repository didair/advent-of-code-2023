import buddy from "../buddy.ts";

const solution = {
	run: async () => {
		const raceData = await buddy.loadAndSplitFile('./6/input.elf');
		const times = buddy.cleanString(raceData[0].split(':')[1]).split(' ').filter((s) => s != '');
		const distances = buddy.cleanString(raceData[1].split(':')[1]).split(' ').filter((s) => s != '');

		const recordsBeaten = [];

		for (let i = 0; i < times.length; i++) {
			const ms = times[i];
			const recordDistance = distances[i];
			let raceBeaten = 0;

			for (let speed = 0; speed < ms; speed++) {
				const timeLeft = ms - speed;
				const testDistance = timeLeft * speed;
				if (testDistance > recordDistance) {
					raceBeaten++;
				}
			}

			recordsBeaten.push(raceBeaten);
		}

		return recordsBeaten.reduce((prev, current, index) => {
			if (prev == 0) return recordsBeaten[index];
			return prev * recordsBeaten[index];
		}, 0);
	},
};

export default solution;