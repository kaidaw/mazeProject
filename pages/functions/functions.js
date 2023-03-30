export const disableDirection = (
  rowIndex,
  cellIndex,
  direction,
  grid,
  setGrid
) => {
  let newGrid = [...grid];
  newGrid[rowIndex][cellIndex].directions[direction] =
    !newGrid[rowIndex][cellIndex].directions[direction];
  setGrid(newGrid);
};

export const createDefaultState = () => {
  let defaultRoom = {
    enabled: false,
    directions: { north: false, south: false, east: false, west: false },
    entities: [],
  };
  let defaultSize = [3, 3];
  let defaultMaze = [];
  for (let i = 0; i < defaultSize[1]; i++) {
    let newRow = [];
    for (let i = 0; i < defaultSize[0]; i++) {
      newRow.push({
        ...defaultRoom,
        directions: { ...defaultRoom.directions },
        entities: [],
      });
    }
    defaultMaze.push([...newRow]);
  }
  return defaultMaze;
};

export const findAdjacent = (rowIndex, cellIndex, grid) => {
  let updatedDirections = {
    north: false,
    south: false,
    east: false,
    west: false,
  };
  //Cancel out of check if cell is disabled
  if (!grid[rowIndex][cellIndex].enabled) {
    return updatedDirections;
  }
  //Check to see if the room to the north is enabled
  if (rowIndex !== 0) {
    if (grid[rowIndex - 1][cellIndex].enabled) {
      updatedDirections.north = true;
    }
  }
  //Check to see if the room to the south is enabled
  if (rowIndex !== grid.length - 1) {
    if (grid[rowIndex + 1][cellIndex].enabled) {
      updatedDirections.south = true;
    }
  }
  //Check to see if the room to the east is enabled
  if (cellIndex !== grid[0].length - 1) {
    if (grid[rowIndex][cellIndex + 1].enabled) {
      updatedDirections.east = true;
    }
  }
  //Check to see if the room to the west is enabled
  if (cellIndex !== 0) {
    if (grid[rowIndex][cellIndex - 1].enabled) {
      updatedDirections.west = true;
    }
  }
  return updatedDirections;
};

export const cellClickHandler = (
  mapGrid,
  rowIndex,
  cellIndex,
  findAdjacent,
  setMapGrid
) => {
  let updateGrid = [...mapGrid];
  updateGrid[rowIndex][cellIndex].enabled =
    !updateGrid[rowIndex][cellIndex].enabled;
  setMapGrid(
    updateGrid.map((mapRow, mapRowIndex) => {
      return mapRow.map((mapCell, mapCellIndex) => {
        let newCell = {
          ...mapCell,
          directions: findAdjacent(mapRowIndex, mapCellIndex, updateGrid),
        };
        return newCell;
      });
    })
  );
};

export const goInDirection = (
  direction,
  currentLocation,
  setHasLooked,
  newRoom
) => {
  if (!newRoom.enabled) {
    alert(
      "There is no way to get through in this direction. Rocks now block the passage"
    );
    return currentLocation;
  }
  setHasLooked(false);
  if (direction === "north") {
    let newLocation = [...currentLocation];
    newLocation[0]--;
    return newLocation;
  }
  if (direction === "east") {
    let newLocation = [...currentLocation];
    newLocation[1]++;
    return newLocation;
  }
  if (direction === "south") {
    let newLocation = [...currentLocation];
    newLocation[0]++;
    return newLocation;
  }
  if (direction === "west") {
    let newLocation = [...currentLocation];
    newLocation[1]--;
    return newLocation;
  }
};

export const changeHandler = (
  inputText,
  danger,
  roomEntities,
  player,
  setPromptText,
  setPlayer,
  setInputText,
  setDanger,
  setHasLooked,
  playerPosition,
  endCoordinates,
  router,
  room
) => {
  const helpText = [
    `To look around you and see what is in the current room, type "look" into the command prompt then hit enter.`,
    `To travel in a valid direction, click any arrow you see on the screen. You must first look around you before you can see available directions.`,
    `To interact with objects and enemies you come across, first specify the action you wish to try then the subject. For example: sword skeleton will be interpreted as an aggressive act and will likely elicit some violent response.`,
    `Certain obstacles such as locks may be overcome with a key, or a good enough weapon if you are strong enough. Other dangers may require you to consider your options. Running away is an option too, especially if you are stealthy enough.`,
    `To read these hints again, type "help."`,
    `Good luck wanderer.`,
  ];
  const objectAdjectives = [
    "rusty",
    "dingy",
    "mossy",
    "ramshackle",
    "suspicious looking",
  ];
  const enemyAdjectives = [
    "ugly",
    "looming",
    "obstruperous",
    "somewhat short looking",
    "furious looking",
  ];
  const weaponAdjectives = [
    "sharp looking",
    "old and rusty",
    "chipped and looking very well used",
    "dangerous looking",
    "very pointy",
  ];
  const itemAdjectives = [
    "shiny",
    "rusty",
    "grimy",
    "slimy",
    "heavy",
    "half burried",
    "partially digested",
    "ancient",
  ];
  const eventAdjectives = [
    "tremendous",
    "underwhelming",
    "spooky",
    "heart stopping",
    "nail biting",
    "explosive",
  ];
  const pickRandomWord = (words) => {
    let randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };
  inputText = inputText.toLowerCase();
  //handles user input asking for help by showing commands available
  if (inputText.includes("help") && !danger.symbol) {
    setPromptText([...helpText]);
  }
  //handles the end of the maze

  if (
    playerPosition[0] === endCoordinates[0] &&
    playerPosition[1] === endCoordinates[1] &&
    !danger.symbol
  ) {
    alert(
      `Game over! You made it to the end. You emerge into a bright, fresh new day, and quickly run away, eager never to set foot in another dungeon.`
    );
    setInputText("");
    router.push({
      pathname: "/score",
      query: {
        character: JSON.stringify(player),
        room: JSON.stringify(room),
        start: JSON.stringify(playerPosition),
        end: JSON.stringify(endCoordinates),
        survived: true,
      },
    });
    return;
  }
  //handles 'danger' situation where exits are barred until the threat is dealt with
  if (danger.type) {
    if (danger.type === "enemy") {
      if (inputText.includes("fight")) {
        if (player.inventory.includes("sword")) {
          setPromptText([
            `You skewer the ${danger.name} with your sword. Crisis averted!`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
        if (player.stats.strength > danger.value) {
          setPromptText([
            `You wrestle the ${danger.name} to the ground and make it eat dirt. Well done.`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        } else {
          alert(
            `Game over! You were eviscerated by the ${danger.name}. Better luck next time!`
          );
          setInputText("");
          router.push({
            pathname: "/score",
            query: {
              character: JSON.stringify(player),
              room: JSON.stringify(room),
              start: JSON.stringify(playerPosition),
              end: JSON.stringify(endCoordinates),
              survived: false,
            },
          });
          return;
        }
      }
      if (inputText.includes("run")) {
        if (player.stats.stealth > danger.value) {
          setPromptText([
            `You sneakily sneak away from the ${danger.name}. You're not proud of yourself but it worked.`,
          ]);
          setInputText("");
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          return;
        }
        if (player.inventory.includes("ring")) {
          setPromptText([
            `You drop the ring on the ground to distract the greedy ${danger.name}. It works, but only just... Now you're poor, but still alive.`,
          ]);
          setPlayer({
            ...player,
            inventory: player.inventory.filter((item) => {
              return item !== "ring";
            }),
          });
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
        if (player.inventory.includes("coin")) {
          setPromptText([
            `You drop the coin on the ground to distract the greedy ${danger.name}. It works, but only just... Now you're poor, but still alive.`,
          ]);
          setPlayer({
            ...player,
            inventory: player.inventory.filter((item) => {
              return item !== "coin";
            }),
          });
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        } else {
          alert(
            `Game over! You were decapitated by the ${danger.name} while trying to run away. Better luck next time!`
          );
          setInputText("");
          router.push({
            pathname: "/score",
            query: {
              character: JSON.stringify(player),
              room: JSON.stringify(room),
              start: JSON.stringify(playerPosition),
              end: JSON.stringify(endCoordinates),
              survived: false,
            },
          });
        }
      }
    }
    if (inputText.includes("talk")) {
      if (player.inventory.includes("armour")) {
        setPromptText([
          `You boldly walk up to the ${danger.name} and tell him to sod off and that you won't stand for any of his nonsense. Confused, the ${danger.name} skulks off into the darkness.`,
        ]);
        setDanger({
          name: "",
          value: 0,
          type: "",
          enabled: false,
          symbol: "",
          seen: false,
        });
        setInputText("");
        return;
      }
      if (player.stats.intelligence > danger.value) {
        setPromptText([
          `You cleverly engage the ${danger.name} in a game of wits, whereupon you cause him to question his very existence. Nice job!`,
        ]);
        setDanger({
          name: "",
          value: 0,
          type: "",
          enabled: false,
          symbol: "",
          seen: false,
        });
        setInputText("");
        return;
      } else {
        alert(
          `Game over! The ${danger.name} wasn't interested in any of your bizarre attempts to confuse it. You are now roasting slowly over a fire. Better luck next time.`
        );
        setInputText("");
        router.push({
          pathname: "/score",
          query: {
            character: JSON.stringify(player),
            room: JSON.stringify(room),
            start: JSON.stringify(playerPosition),
            end: JSON.stringify(endCoordinates),
            survived: false,
          },
        });
        return;
      }
    }
  }
  //handles the 'danger' state when an obstacle is in the way
  if (danger.type === "obstacle") {
    if (danger.symbol === "lock") {
      if (inputText.includes("unlock")) {
        if (player.inventory.includes("key")) {
          setPromptText([
            `The key must be a skeleton key! It fits the lock. I have a feeling this key is lucky... Might want to hold into it`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
        if (player.stats.intelligence > danger.value) {
          setPromptText([
            `You managed to break the lock with a nearby blade of grass and a rock! I'm honestly impressed.`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
      }
      if (inputText.includes("force")) {
        if (player.stats.strength > danger.value) {
          setPromptText([
            `You managed to break the lock with your bare hands! Ouch..`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
        if (player.inventory.includes("shield")) {
          setPromptText([
            `You managed to break the lock with your shield! Unfortunately, you also broke the shield in the process... You throw away the useless handle.`,
          ]);
          setPlayer({
            ...player,
            inventory: player.inventory.filter((item) => {
              return item !== "shield";
            }),
          });
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
      }
      if (inputText.includes("wait")) {
        let chance = Math.round(Math.random() * 2);
        if (chance === 0) {
          alert(`Game over! You starved to death waiting.`);
          setInputText("");
          router.push({
            pathname: "/score",
            query: {
              character: JSON.stringify(player),
              room: JSON.stringify(room),
              start: JSON.stringify(playerPosition),
              end: JSON.stringify(endCoordinates),
              survived: false,
            },
          });
          return;
        }
        if (chance === 1) {
          setPromptText([
            `Nothing happens. Maybe if you keep waiting something will happen... Maybe not.`,
          ]);
        }
        if (chance === 2) {
          setPromptText([
            `The ${danger.name} suddenly creaks open for no apparent reason. Wow, what luck!`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
      }
    }
    if (danger.symbol === "castle") {
      if (inputText.includes("unlock")) {
        if (player.inventory.includes("key")) {
          setPromptText([
            `The key must be a skeleton key! It fits the lock. I have a feeling this key is lucky... Might want to hold into it`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
        if (player.stats.stealth > danger.value) {
          setPromptText([
            `Your stealthiness has made you very agile; you deftly climb through a narrow gap high up in the walls and escape this trap.`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
      }
      if (inputText.includes("force")) {
        if (player.stats.strength > danger.value) {
          setPromptText([
            `You managed to break the lock with your bare hands! Ouch..`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
        if (player.inventory.includes("armour")) {
          setPromptText([
            `You frantically bash at the gate in front of you with different parts of your armour as they break, one after another. Finally, after an eternity of blisters and sweat, you somehow break through. Needless to say, your armour doesn't exist any more.`,
          ]);
          setPlayer({
            ...player,
            inventory: player.inventory.filter((item) => {
              return item !== "armour";
            }),
          });
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
      }
      if (inputText.includes("wait")) {
        let chance = Math.round(Math.random() * 2);
        if (chance === 0) {
          alert(`Game over! You starved to death waiting.`);
          setInputText("");
          router.push({
            pathname: "/score",
            query: {
              character: JSON.stringify(player),
              room: JSON.stringify(room),
              start: JSON.stringify(playerPosition),
              end: JSON.stringify(endCoordinates),
              survived: false,
            },
          });
          return;
        }
        if (chance === 1) {
          setPromptText([
            `Nothing happens. Maybe if you keep waiting something will happen... Maybe not.`,
          ]);
        }
        if (chance === 2) {
          setPromptText([
            `The ${danger.name} suddenly creaks open for no apparent reason. Wow, what luck!`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
      }
    }
    if (danger.symbol === "door") {
      if (inputText.includes("unlock")) {
        if (player.inventory.includes("key")) {
          setPromptText([
            `The key must be a skeleton key! It fits the lock. I have a feeling this key is lucky... Might want to hold into it`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
        if (player.stats.strength > danger.value) {
          setPromptText([
            `You charge through the door like it's made of nothing but plywood. Upon closer inspection, it was made of nothing but plywood.`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
      }
      if (inputText.includes("force")) {
        if (player.stats.strength > danger.value) {
          setPromptText([
            `You managed to break the lock with your bare hands! Ouch..`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
        if (player.inventory.includes("sword")) {
          setPromptText([
            `You managed to break the lock with your sword! Unfortunately, you also broke the sword in the process... You throw away the useless hilt.`,
          ]);
          setPlayer({
            ...player,
            inventory: player.inventory.filter((item) => {
              return item !== "sword";
            }),
          });
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
      }
      if (inputText.includes("wait")) {
        let chance = Math.round(Math.random() * 2);
        if (chance === 0) {
          alert(`Game over! You starved to death waiting.`);
          setInputText("");
          router.push({
            pathname: "/score",
            query: {
              character: JSON.stringify(player),
              room: JSON.stringify(room),
              start: JSON.stringify(playerPosition),
              end: JSON.stringify(endCoordinates),
              survived: false,
            },
          });
          return;
        }
        if (chance === 1) {
          setPromptText([
            `Nothing happens. Maybe if you keep waiting something will happen... Maybe not.`,
          ]);
        }
        if (chance === 2) {
          setPromptText([
            `The ${danger.name} suddenly creaks open for no apparent reason. Wow, what luck!`,
          ]);
          setDanger({
            name: "",
            value: 0,
            type: "",
            enabled: false,
            symbol: "",
            seen: false,
          });
          setInputText("");
          return;
        }
      }
    }
  }
  //handles user input for 'looking'
  if (inputText.toLowerCase().includes("look")) {
    setHasLooked(true);
  }
  if (inputText.toLowerCase().includes("look") && !danger.symbol) {
    let randomEntityIndex = Math.floor(Math.random() * roomEntities.length);
    let randomChance = Math.round(Math.random() * 1);
    let seenEntity = {};
    if (randomChance) {
      seenEntity = { ...roomEntities[randomEntityIndex] };
    } else {
      seenEntity = {
        name: "",
        value: 0,
        type: "",
        enabled: false,
        symbol: "",
        seen: false,
      };
    }
    if (!seenEntity.symbol || player.inventory.includes(seenEntity.symbol)) {
      setPromptText([
        `You didn't find anything new this time, but try again if you're feeling lucky. You might find something you don't want to though...`,
      ]);
      setInputText("");
      return;
    }
    if (seenEntity.type === "enemy") {
      setPromptText([
        `Something interesting catches your eye.`,
        `Quick, defend yourself! Oh god it's the most ${pickRandomWord(
          enemyAdjectives
        )} ${seenEntity.symbol} you've ever seen!`,
        `As it looms closer, you can see it's the ${seenEntity.name} you were warned to be wary of.`,
        `You can fight (it helps to be strong or have a weapon), run (it helps to be sneaky or have a treasure to leave behind) or talk (being intelligent or having some armour might help you intimidate your foe)`,
      ]);
      setDanger({ ...seenEntity });
    }
    if (seenEntity.type === "weapon") {
      setPromptText([
        `Something interesting catches your eye.`,
        `Aha! A very ${pickRandomWord(weaponAdjectives)} ${
          seenEntity.symbol
        }! Just what you need to fight off the ghouls around here.`,
        `Upon closer inspection, you see that it is a very useful ${seenEntity.name}. This will do nicely!`,
        `${seenEntity.name} has been added to your inventory.`,
      ]);
      setPlayer({
        ...player,
        inventory: [...player.inventory, seenEntity.symbol],
      });
    }
    if (seenEntity.type === "item") {
      setPromptText([
        `Something interesting catches your eye.`,
        `How interesting. You've found a very ${pickRandomWord(
          itemAdjectives
        )} ${seenEntity.symbol}.`,
        `This has to be the ${seenEntity.name} you heard the travellers back at the inn talk about.`,
        `${seenEntity.name} has been added to your inventory.`,
      ]);
      setPlayer({
        ...player,
        inventory: [...player.inventory, seenEntity.symbol],
      });
    }
    if (seenEntity.type === "obstacle") {
      setPromptText([
        `A trap! As you enter the room you hear a very ${pickRandomWord(
          eventAdjectives
        )} crash behind you. You're stuck!`,
        `As you look around, you realise you can go no further. In front of you is an extremely ${pickRandomWord(
          objectAdjectives
        )} ${seenEntity.symbol}.`,
        `Etched into it are ancient characters spelling: ${seenEntity.name}. You will have to find some way to get past this before you continue.`,
        `What do you wish to do? I would advise trying to unlock it, or at least try to force it open. Or if you really want to, you can wait for something to happen. Don't hold your breath though.`,
      ]);
      setDanger({ ...seenEntity });
    }
  }
  setInputText("");
};
