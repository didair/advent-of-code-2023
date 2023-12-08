import buddy from "../buddy.ts";

const solution = {
	cardValues: {
		"A": 14,
		"K": 13,
		"Q": 12,
		"J": 11,
		"T": 10,
		"9": 9,
		"8": 8,
		"7": 7,
		"6": 6,
		"5": 5,
		"4": 4,
		"3": 3,
		"2": 2,
	},
	compareHands: (a, b) => {
		if (a.strength.handStrength > b.strength.handStrength) {
			return 1;
		} else if (a.strength.handStrength < b.strength.handStrength) {
			return -1;
		} else {
			for (let i = 0; i < a.hand.length; i++) {
				if (solution.cardValues[a.hand[i]] > solution.cardValues[b.hand[i]]) {
					return 1;
				} else if (solution.cardValues[a.hand[i]] < solution.cardValues[b.hand[i]]) {
					return -1;
				}
			}

			return 0;
		}
	},
	calculateHandStrength: (hand) => {
		const cardCounts = {};
		let handStrength = 1;
		const matchProperties = {
			onePair: false,
			twoPair: false,
			threeOfAKind: false,
			fullHouse: false,
			fourOfAKind: false,
			fiveOfAKind: false,
		};

		for (let i = 0; i < hand.length; i++) {
			const card = hand[i];
			if (cardCounts[card]) {
				cardCounts[card]++;
			} else {
				cardCounts[card] = 1;
			}
		}

		const keys = Object.keys(cardCounts);
		for (let i = 0; i < keys.length; i++) {
			const count = cardCounts[keys[i]];

			if (count == 2) {
				if (matchProperties.onePair) {
					handStrength = 3;
					matchProperties.twoPair = true;
				} else if (matchProperties.threeOfAKind) {
					handStrength = 5;
					matchProperties.onePair = true;
					matchProperties.fullHouse = true;
				} else {
					handStrength = 2;
					matchProperties.onePair = true;
				}
			} else if (count == 3) {
				if (matchProperties.onePair) {
					handStrength = 5;
					matchProperties.fullHouse = true;
					matchProperties.threeOfAKind = true;
				} else {
					handStrength = 4;
					matchProperties.threeOfAKind = true;
				}
			} else if (count == 4) {
				handStrength = 6;
				matchProperties.fourOfAKind = true;
			} else if (count == 5) {
				handStrength = 7;
				matchProperties.fiveOfAKind = true;
			}
		}

		return { handStrength, matchProperties };
	},
	run: async () => {
		const data = await buddy.loadAndSplitFile('./7/input.elf');
		let hands = data.map((line) => {
			const hand = line.split(" ");

			return {
				hand: hand[0],
				bid: parseInt(hand[1]),
				strength: solution.calculateHandStrength(hand[0]),
			};
		});

		hands = hands.sort((a, b) => solution.compareHands(a, b));
		return hands.reduce((prev, current, index) => {
			return prev + (current.bid * (index + 1));
		}, 0);
	},
};

export default solution;