import styles from "../styles/Home.module.css";
import { useState } from "react";
import {
  createDefaultState,
  findAdjacent,
  cellClickHandler,
} from "./functions/functions";
import { DirectionButton } from "./components/directionButton";
import { ItemSelect } from "./components/itemSelect";
import { MazeDimensionsBar } from "./components/mazeDimensionsBar";
import { MenuBar } from "./components/menuBar";
import { CreateEntities } from "./components/createEntities";
import { test } from "./functions/test";

export default function NewCharacter() {
  const [mapGrid, setMapGrid] = useState(createDefaultState);
  const [spawnCoordinates, setSpawnCoordinates] = useState([]);
  const [endCoordinates, setEndCoordinates] = useState([]);
  const [name, setName] = useState("");
  const [showHints, setShowHints] = useState(false);
  return (
    <div>
      <MenuBar />
      <div className={styles.mapSheet}>
        <input
          placeholder="Name:"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div>
          <button
            className={styles.saveButton}
            onClick={() => {
              let result = test(mapGrid);
              alert(
                `Test result: ${result.passed ? "Passed" : "Failed"}. ${
                  result.passed ? result.message : `Reason: ${result.message}`
                }`
              );
            }}
          >
            TEST
          </button>
          <button
            className={styles.saveButton}
            onClick={() => {
              if (!name) {
                alert("Please set a name for this map.");
                return;
              }
              if (localStorage.getItem(name)) {
                alert("please set a unique name for this map.");
                setName("");
                return;
              }
              if (!spawnCoordinates.length) {
                alert("Please set a start location.");
                return;
              }
              if (!endCoordinates.length) {
                alert("Please set an end location.");
                return;
              }
              localStorage.setItem(`map.${name}`, JSON.stringify(mapGrid));
              localStorage.setItem(
                `coord.${name}.start`,
                JSON.stringify(spawnCoordinates)
              );
              localStorage.setItem(
                `coord.${name}.end`,
                JSON.stringify(endCoordinates)
              );
              alert(`Successfully saved map: ${name}`);
              setName("");
            }}
          >
            SAVE
          </button>
          <button
            className={styles.saveButton}
            onClick={() => {
              if (!name) {
                alert("Please set a name to load.");
                return;
              }
              if (!localStorage.getItem(`map.${name}`)) {
                alert("Map not found.");
                setName("");
                return;
              }
              let loadedMap = localStorage.getItem(`map.${name}`);
              let start = localStorage.getItem(`coord.${name}.start`);
              let end = localStorage.getItem(`coord.${name}.end`);
              setSpawnCoordinates(JSON.parse(start));
              setEndCoordinates(JSON.parse(end));
              setMapGrid(JSON.parse(loadedMap));
              alert(`Successfully loaded map: ${name}`);
            }}
          >
            LOAD
          </button>
        </div>
        <CreateEntities mapGrid={mapGrid} setMapGrid={setMapGrid} />
        <MazeDimensionsBar mapGrid={mapGrid} setMapGrid={setMapGrid} />
        {mapGrid.map((row, rowIndex) => {
          return (
            <span key={rowIndex} className={styles.row}>
              {rowIndex + 1}
              <div className={styles.mapRow}>
                {row.map((cell, cellIndex) => {
                  return (
                    <span key={cellIndex} className={styles.column}>
                      {rowIndex == 0 && cellIndex + 1}
                      <div className={styles.gridSquare}>
                        <div className={styles.gridRow}>
                          <DirectionButton
                            rowIndex={rowIndex}
                            cellIndex={cellIndex}
                            direction="north"
                            mapGrid={mapGrid}
                            setMapGrid={setMapGrid}
                            cell={cell}
                          />
                        </div>
                        <div className={styles.gridRow}>
                          <div className={styles.gridCell}>
                            <DirectionButton
                              rowIndex={rowIndex}
                              cellIndex={cellIndex}
                              direction="west"
                              mapGrid={mapGrid}
                              setMapGrid={setMapGrid}
                              cell={cell}
                            />
                          </div>
                          <div
                            className={
                              cell.enabled
                                ? styles.roomEnabled
                                : styles.roomDisabled
                            }
                          >
                            {cell.enabled && !spawnCoordinates.length && (
                              <button
                                className={styles.spawnOption}
                                onClick={() => {
                                  setSpawnCoordinates([rowIndex, cellIndex]);
                                }}
                              >
                                Start?
                              </button>
                            )}
                            {cell.enabled &&
                              spawnCoordinates[0] === rowIndex &&
                              spawnCoordinates[1] === cellIndex && (
                                <button
                                  className={styles.spawnPoint}
                                  onClick={() => {
                                    setSpawnCoordinates([]);
                                  }}
                                >
                                  Start
                                </button>
                              )}
                            {cell.enabled && !endCoordinates.length && (
                              <button
                                className={styles.spawnOption}
                                onClick={() => {
                                  setEndCoordinates([rowIndex, cellIndex]);
                                }}
                              >
                                End?
                              </button>
                            )}
                            {cell.enabled &&
                              endCoordinates[0] === rowIndex &&
                              endCoordinates[1] === cellIndex && (
                                <button
                                  className={styles.spawnPoint}
                                  onClick={() => {
                                    setEndCoordinates([]);
                                  }}
                                >
                                  End
                                </button>
                              )}
                            <button
                              className={
                                cell.enabled
                                  ? styles.enabledButton
                                  : styles.disabledButton
                              }
                              onClick={() => {
                                if (
                                  spawnCoordinates[0] === rowIndex &&
                                  spawnCoordinates[1] === cellIndex
                                ) {
                                  setSpawnCoordinates([]);
                                }
                                if (
                                  endCoordinates[0] === rowIndex &&
                                  endCoordinates[1] === cellIndex
                                ) {
                                  setEndCoordinates([]);
                                }
                                cellClickHandler(
                                  mapGrid,
                                  rowIndex,
                                  cellIndex,
                                  findAdjacent,
                                  setMapGrid
                                );
                              }}
                            >
                              {cell.enabled ? "Enabled" : "Disabled"}
                            </button>
                            {cell.enabled && (
                              <ItemSelect
                                cell={cell}
                                mapGrid={mapGrid}
                                rowIndex={rowIndex}
                                cellIndex={cellIndex}
                                setMapGrid={setMapGrid}
                                entities={cell.entities}
                              />
                            )}
                          </div>
                          <div className={styles.gridCell}>
                            <DirectionButton
                              rowIndex={rowIndex}
                              cellIndex={cellIndex}
                              direction="east"
                              mapGrid={mapGrid}
                              setMapGrid={setMapGrid}
                              cell={cell}
                            />
                          </div>
                        </div>
                        <div className={styles.gridRow}>
                          <DirectionButton
                            rowIndex={rowIndex}
                            cellIndex={cellIndex}
                            direction="south"
                            mapGrid={mapGrid}
                            setMapGrid={setMapGrid}
                            cell={cell}
                          />
                        </div>
                      </div>
                    </span>
                  );
                })}
              </div>
            </span>
          );
        })}
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
                <li>{`1: This is where you create new maps.`}</li>
                <li>{`DIMENSIONS`}</li>
                <li>
                  {`2: New maps have both a height and width of between 3 and 5 cells, giving you a total of 9 to 25.`}
                </li>
                <li>{`ENTITIES`}</li>
                <li>
                  {`3: You can set the entities (weapons, items, enemies and obstacles) which you want to be available in your map at the top.`}
                </li>
                <li>
                  {`4: You can have a maximum of 12 entities: one for each symbol.`}
                </li>
                <li>
                  {`5: You can delete entities by clicking the delete button next to them; this will free up the corresponding symbol.`}
                </li>
                <li>
                  {`6: Once you are happy with your entities, click 'set' and they will appear in each dungeon room where you can select as many or as few as you like.`}
                </li>
                <li>
                  {`7: Selected entities within a room have a chance of appearing whenever the character looks around.`}
                </li>
                <li>{`DIRECTIONS`}</li>
                <li>
                  {`8: You can select each direction you wish to be able to go in from the selected room.`}
                </li>
                <li>
                  {`9: You can pick directions into disabled rooms but they will lead nowhere.`}
                </li>
                <li>
                  {`10: You can also make directions go only one way by deselecting one of the arrows. Be careful using this, you might create dead ends where players can get stuck! Unless that's what you want. Mwahaha`}
                </li>
                <li>
                  {`11: Don't forget to select a start and end square so the maze has a start and end.`}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
