const buddy = {
  loadAndSplitFile: async (filePath: string) => {
    const input = await Deno.readTextFile(filePath);
    return input.split("\n").filter((value) => value != "");
  },
  keepLetters: (text: string) => text.replace(/[^0-9]*/g, ""),
  keepNumbers: (text: string, makeInt = false) =>
    makeInt
      ? parseInt(text.replace(/[^\d]*/g, ""))
      : text.replace(/[^\d]*/g, ""),
  cleanString: (text: string | Array<string>) => {
    if (Array.isArray(text)) {
      return text.map((t) => t.trim());
    }

    return text.trim();
  },
  is_numeric: (str: string) => /^\d+$/.test(str),
  is_character: (str: string) => /[^0-9]+$/.test(str),
  sum: (list: Array<number | string>, key: string | undefined) => {
    let i = 0;
    list.forEach((item) => {
      if (key != null) {
        i += parseInt(item[key]);
      } else {
        i += parseInt(item);
      }
    });
    return i;
  },
};

export default buddy;
