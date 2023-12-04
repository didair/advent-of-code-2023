import buddy from "../buddy.ts";

const solution = {
	run: async () => {
		const scratchcards = await buddy.loadAndSplitFile('./4/input.elf');
		const cardValues = scratchcards.map((card) => {
			const cardNumbers = buddy.cleanString(card.split(':')[1].split('|'));
			const winnerNumbers = cardNumbers[0].split(' ').filter((num) => num != '');

			const userNumbers = cardNumbers[1]
				.split(' ')
				.filter((num) => num != '')
				.filter((num) => winnerNumbers.indexOf(num) > -1)

			return Math.pow(2, userNumbers.length - 1);
		});

		return buddy.sum(cardValues);
	},
};

export default solution;