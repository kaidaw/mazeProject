import styles from "../styles/Home.module.css";
import { easyMap } from "./templateMaps";
import { useState, useEffect } from "react";
import { ParseSymbol } from "./components/symbolParser";
import { goInDirection, changeDirectionOnKeyDown } from "./functions/functions";
import { MenuBar } from "./components/menuBar";
import { StatsSheet } from "./components/statsSheet";
import { TextPrompt } from "./components/textPrompt";
import { GameMap } from "./components/gameMap";
import { useRouter } from "next/router";

export default function Game() {
  let router = useRouter();
  let params = router.query;
  const [gameFiles, setGameFiles] = useState({});
  const [world, setWorld] = useState(easyMap);
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [endCoordinates, setEndCoordinates] = useState([0, 0]);
  const [showHints, setShowHints] = useState(false);
  const [player, setPlayer] = useState({
    name: "Johnny",
    stats: { strength: 5, intelligence: 0, stealth: 0 },
    avatar: "avatarThree",
    inventory: [],
  });
  const [danger, setDanger] = useState({
    name: "",
    value: 0,
    type: "",
    enabled: false,
    symbol: "",
    seen: false,
  });
  const [hasLooked, setHasLooked] = useState(false);
  useEffect(() => {
    if (params.character) {
      let character = JSON.parse(localStorage.getItem(params.character));
      setPlayer(character);
    }
    if (params.map) {
      let map = JSON.parse(localStorage.getItem(params.map));
      setWorld(map);
    }
    if (params.coords) {
      let start = JSON.parse(params.coords)[0];
      setPlayerPosition(start);
      let end = JSON.parse(params.coords)[1];
      setEndCoordinates(end);
    }
  }, [params]);
  return (
    <div>
      <MenuBar
        game={true}
        gameFiles={gameFiles}
        setGameFiles={setGameFiles}
        world={world}
        setWorld={setWorld}
        playerPosition={playerPosition}
        setPlayerPosition={setPlayerPosition}
        endCoordinates={endCoordinates}
        setEndCoordinates={setEndCoordinates}
        player={player}
        setPlayer={setPlayer}
        danger={danger}
        setDanger={setDanger}
        hasLooked={hasLooked}
        setHasLooked={setHasLooked}
      />
      <div className={styles.center}>
        <div className={styles.gameSheet}>
          {world.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className={styles.gameRow}>
                {row.map((cell, cellIndex) => {
                  if (
                    playerPosition[0] === rowIndex &&
                    playerPosition[1] === cellIndex
                  ) {
                    return (
                      <div key={cellIndex} className={styles.currentScreen}>
                        <div className={styles.cellRow}>
                          <span className={styles.cellSegment}>
                            {cell.entities.map((entity, index) => {
                              if (
                                entity.type === "weapon" &&
                                player.inventory.includes(entity.symbol)
                              ) {
                                return (
                                  <ParseSymbol
                                    key={index}
                                    symbol={entity.symbol}
                                    big={true}
                                  />
                                );
                              }
                            })}
                          </span>
                          <span className={styles.cellSegment}>
                            {cell.directions.north &&
                              !danger.type &&
                              hasLooked && (
                                <b
                                  className={styles.bigSymbol}
                                  onClick={() => {
                                    setPlayerPosition(
                                      goInDirection(
                                        "north",
                                        playerPosition,
                                        setHasLooked,
                                        world[playerPosition[0] - 1][
                                          playerPosition[1]
                                        ]
                                      )
                                    );
                                  }}
                                >
                                  &uarr;
                                </b>
                              )}
                          </span>
                          <span className={styles.cellSegment}>
                            {cell.entities.map((entity, index) => {
                              if (
                                entity.type === "item" &&
                                player.inventory.includes(entity.symbol)
                              ) {
                                return (
                                  <ParseSymbol
                                    key={index}
                                    symbol={entity.symbol}
                                    big={true}
                                  />
                                );
                              }
                            })}
                          </span>
                        </div>
                        <div className={styles.cellRow}>
                          <span className={styles.cellSegment}>
                            {cell.directions.west && !danger.type && hasLooked && (
                              <b
                                className={styles.bigSymbol}
                                onClick={() => {
                                  setPlayerPosition(
                                    goInDirection(
                                      "west",
                                      playerPosition,
                                      setHasLooked,
                                      world[playerPosition[0]][
                                        playerPosition[1] - 1
                                      ]
                                    )
                                  );
                                }}
                              >
                                &larr;
                              </b>
                            )}
                          </span>
                          <span className={styles.cellSegment}>
                            {playerPosition[0] === rowIndex &&
                              playerPosition[1] === cellIndex && (
                                <div className={styles.stickFigure}>
                                  <b>{player.name}</b>
                                  <ParseSymbol
                                    symbol={player.avatar}
                                    big={true}
                                  />
                                  <div className={styles.stickBody}>-|-</div>
                                  <div className={styles.stickLegs}>/\</div>
                                </div>
                              )}
                          </span>
                          <span className={styles.cellSegment}>
                            {cell.directions.east && !danger.type && hasLooked && (
                              <b
                                className={styles.bigSymbol}
                                onClick={() => {
                                  setPlayerPosition(
                                    goInDirection(
                                      "east",
                                      playerPosition,
                                      setHasLooked,
                                      world[playerPosition[0]][
                                        playerPosition[1] + 1
                                      ]
                                    )
                                  );
                                }}
                              >
                                &rarr;
                              </b>
                            )}
                          </span>
                        </div>
                        <div className={styles.cellRow}>
                          <span className={styles.cellSegment}>
                            {danger.type === "enemy" && (
                              <ParseSymbol symbol={danger.symbol} big={true} />
                            )}
                          </span>
                          <span className={styles.cellSegment}>
                            {cell.directions.south &&
                              !danger.type &&
                              hasLooked && (
                                <b
                                  className={styles.bigSymbol}
                                  onClick={() => {
                                    setPlayerPosition(
                                      goInDirection(
                                        "south",
                                        playerPosition,
                                        setHasLooked,
                                        world[playerPosition[0] + 1][
                                          playerPosition[1]
                                        ]
                                      )
                                    );
                                  }}
                                >
                                  &darr;
                                </b>
                              )}
                          </span>
                          <span className={styles.cellSegment}>
                            {danger.type === "obstacle" && (
                              <ParseSymbol symbol={danger.symbol} big={true} />
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
        <TextPrompt
          room={world[playerPosition[0]][playerPosition[1]]}
          setPlayer={setPlayer}
          player={player}
          danger={danger}
          setDanger={setDanger}
          setHasLooked={setHasLooked}
          hasLooked={hasLooked}
          playerPosition={playerPosition}
          endCoordinates={endCoordinates}
        />
        <StatsSheet player={player} />
        <GameMap
          playerPosition={playerPosition}
          setPlayerPosition={setPlayerPosition}
          player={player}
          hasLooked={hasLooked}
          map={world}
        />
        <div className={styles.characterSheet}>
          <button
            className={styles.characterButton}
            onClick={() => {
              setShowHints(!showHints);
            }}
          >
            Hints (show/hide)
          </button>
          {showHints && (
            <div className={styles.hintsSheet}>
              <ul>
                <li>{`Welcome to this dungeon!`}</li>
                <li>{`You must first look around by typing 'look' or hitting the look button`}</li>
                <li>{`Other prompts are available by typing 'help' into the command prompt`}</li>
                <li>{`Good luck- and try to get out alive!`}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
