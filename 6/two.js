import buddy from "../buddy.ts";

const solution = {
	run: async () => {
		const raceData = await buddy.loadAndSplitFile('./6/input.elf');
		const time = buddy.cleanString(raceData[0].split(':')[1]).replaceAll(' ', '');
		const distance = buddy.cleanString(raceData[1].split(':')[1]).replaceAll(' ', '');

		let raceBeaten = 0;
		for (let speed = 0; speed < time; speed++) {
			const timeLeft = time - speed;
			const testDistance = timeLeft * speed;
			if (testDistance > distance) {
				raceBeaten++;
			}
		}

		return raceBeaten;
	},
};

export default solution;