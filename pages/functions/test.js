export const test = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      let room = map[i][j];
      if (!Object.keys(room).includes("enabled")) {
        return {
          passed: false,
          message: `Map not validated. Room [${i},${j}] missing key: enabled`,
        };
      }
      if (!Object.keys(room).includes("directions")) {
        return {
          passed: false,
          message: `Map not validated. Room [${i},${j}] missing key: directions`,
        };
      }
      if (!Object.keys(room).includes("entities")) {
        return {
          passed: false,
          message: `Map not validated. Room [${i},${j}] missing key: entities`,
        };
      }
      if (
        !Object.keys(room.directions).includes("north") ||
        !Object.keys(room.directions).includes("east") ||
        !Object.keys(room.directions).includes("south") ||
        !Object.keys(room.directions).includes("west")
      ) {
        return {
          passed: false,
          message: `Map not validated. Room [${i},${j}] missing one of more directions`,
        };
      }
    }
  }

  return { passed: true, message: "Map validated" };
};
