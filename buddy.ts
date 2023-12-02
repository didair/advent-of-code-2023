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
};

export default buddy;
