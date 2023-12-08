import buddy from "../buddy.ts";

const solution = {
	run: async () => {
		const mapData = (await buddy.loadFile('./8/input.elf')).split('\n\n').filter((r) => r != '');
		const predefinedInstructions = mapData[0];
		const elementsData = mapData[1];
		const elements = {};
		elementsData
			.split('\n')
			.filter((r) => r != '')
			.forEach((row) => {
				const id = buddy.cleanString(row.split('='))[0];
				const steps = buddy.cleanString(
					row.split('=')[1]
						.replaceAll('(', '')
						.replaceAll(')', '')
						.split(',')
				);
				elements[id] = steps;
			});

		let instructions = predefinedInstructions;
		let stepsTaken = 0;
		let currentPosition = 'AAA';

		while (instructions.length > 0) {
			const instruction = instructions[0];
			const currentSteps = elements[currentPosition];
			stepsTaken++;

			if (instruction == 'L') {
				currentPosition = currentSteps[0];
			}

			if (instruction == 'R') {
				currentPosition = currentSteps[1];
			}

			if (currentPosition === 'ZZZ') {
				break;
			}

			instructions = buddy.removeCharAtIndex(instructions, 0);
			if (instructions.length == 0) {
				instructions = predefinedInstructions;
			}
		}

		return stepsTaken;
	},
};

export default solution;