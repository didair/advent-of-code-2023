import buddy from "../buddy.ts";

const solution = {
	run: async () => {
		const scratchcards = await buddy.loadAndSplitFile('./4/input.elf');
		const quantity = new Array(scratchcards.length).fill(1);

		scratchcards.forEach((card, index) => {
			const cardNumbers = buddy.cleanString(card.split(':')[1].split('|'));
			const winnerNumbers = cardNumbers[0].split(' ').filter((num) => num != '');

			const userNumbers = cardNumbers[1]
				.split(' ')
				.filter((num) => num != '')
				.filter((num) => winnerNumbers.indexOf(num) > -1);

			for (let n = 1; n <= userNumbers.length; n++) {
				for (let i = 1; i <= quantity[index]; i++) {
					quantity[index + n]++;
				}
			}
		});

		return buddy.sum(quantity);
	},
};

export default solution;