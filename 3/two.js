import buddy from "../buddy.ts";

const solution = {
	getIndexes: (engine) => {
		let partsIndex = [];
		let symbolsIndex = [];

		engine.forEach((row, rowIndex) => {
			const test = row.split('.').filter((v) => v != '')

			partsIndex.push({
				value: '',
				start: null,
				end: null,
				y: null,
			});

			[...row].forEach((col, colIndex) => {
				const last_part = partsIndex[partsIndex.length - 1];

				if (buddy.is_numeric(col)) {
					last_part.value += col;

					if (last_part.start == null) {
						last_part.start = colIndex;
						last_part.y = rowIndex;
					}

					// Check if next character isnt numeric on row
					if (!buddy.is_numeric(row[colIndex + 1])) {
						last_part.end = colIndex;

						// Create empty part index for next possible match
						partsIndex.push({
							value: '',
							start: null,
							end: null,
							y: null,
						});
					}
				}

				// Character and not . so it must be a symbol
				if (buddy.is_character(col) && col == '*') {
					symbolsIndex.push({
						value: col,
						start: colIndex,
						end: colIndex,
						y: rowIndex,
					});
				}
			});
		});

		partsIndex = partsIndex.filter((index) => index.value != '');
		symbolsIndex = symbolsIndex.filter((index) => index.value != '');

		return { partsIndex, symbolsIndex };
	},
	run: async () => {
		const engine = await buddy.loadAndSplitFile('./3/input.elf');
		const { symbolsIndex, partsIndex } = solution.getIndexes(engine);

		let gearRatios = symbolsIndex.map((s) => {
			const matchingParts = partsIndex.filter((p) => {
				return (
					s.start >= p.start - 1 &&
					s.end <= p.end + 1 &&
					s.y >= p.y - 1 &&
					s.y <= p.y + 1
				);
			});

			if (matchingParts.length == 2) {
				return parseInt(matchingParts[0].value) * parseInt(matchingParts[1].value);
			}

			return null;
		});

		gearRatios = gearRatios.filter((ratio) => ratio != null);

		return buddy.sum(gearRatios);
	},
};

export default solution;
