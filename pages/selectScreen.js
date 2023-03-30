import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MenuBar } from "./components/menuBar";
import { easyMap } from "./templates/easyMap";
import { mediumMap } from "./templates/mediumMap";
import { hardMap } from "./templates/hardMap";
import { shadow, strongman, wanderer } from "./templates/characters";
export default function SelectScreen() {
  let router = useRouter();
  let [mapNames, setMapNames] = useState([]);
  let [charNames, setCharNames] = useState([]);
  let [selectedMap, setSelectedMap] = useState();
  let [selectedChar, setSelectedChar] = useState();
  let [coords, setCoords] = useState([]);
  let [title, setTitle] = useState("Choose wisely friend");
  useEffect(() => {
    window.localStorage.setItem("player.shadow", JSON.stringify(shadow));
    window.localStorage.setItem("player.strongman", JSON.stringify(strongman));
    window.localStorage.setItem("player.wanderer", JSON.stringify(wanderer));
    window.localStorage.setItem("map.easyMap", JSON.stringify(easyMap.map));
    window.localStorage.setItem(
      "coord.easyMap.start",
      JSON.stringify(easyMap.start)
    );
    window.localStorage.setItem(
      "coord.easyMap.end",
      JSON.stringify(easyMap.end)
    );
    window.localStorage.setItem("map.mediumMap", JSON.stringify(mediumMap.map));
    window.localStorage.setItem(
      "coord.mediumMap.start",
      JSON.stringify(mediumMap.start)
    );
    window.localStorage.setItem(
      "coord.mediumMap.end",
      JSON.stringify(mediumMap.end)
    );
    window.localStorage.setItem("map.hardMap", JSON.stringify(hardMap.map));
    window.localStorage.setItem(
      "coord.hardMap.start",
      JSON.stringify(hardMap.start)
    );
    window.localStorage.setItem(
      "coord.hardMap.end",
      JSON.stringify(hardMap.end)
    );

    let mapNameArray = [];
    let charNameArray = [];
    let coordsArray = [];
    for (let key of Object.keys(window.localStorage)) {
      if (key[0] === "m" && key[1] === "a" && key[2] === "p") {
        mapNameArray.push(key);
      }
      if (key[0] === "p" && key[1] === "l" && key[2] === "a") {
        charNameArray.push(key);
      }
    }
    for (let key of mapNameArray) {
      let coords = [
        JSON.parse(window.localStorage.getItem(`coord.${key.slice(4)}.start`)),
        JSON.parse(window.localStorage.getItem(`coord.${key.slice(4)}.end`)),
      ];
      coordsArray.push([...coords]);
    }
    setMapNames([...mapNameArray]);
    setCharNames([...charNameArray]);
    setCoords([...coordsArray]);
  }, [title]);
  return (
    <div>
      <MenuBar />
      <div className={styles.center}>
        <h1>{title}</h1>
        <div className={styles.list}>
          <h2>MAPS</h2>
          {mapNames.map((name, index) => {
            return (
              <div key={index} className={styles.buttonRow}>
                <button
                  className={
                    selectedMap === index ? styles.entrySelected : styles.entry
                  }
                  onClick={() => {
                    setSelectedMap(index);
                  }}
                >
                  {name.slice(4)}
                </button>
                <button
                  className={styles.entry}
                  onClick={() => {
                    if (
                      confirm(`Are you sure you wish to delete map: ${name}?`)
                    ) {
                      localStorage.removeItem(`${name}`);
                      localStorage.removeItem(`coords.${name.slice(4)}.start`);
                      localStorage.removeItem(`coords.${name.slice(4)}.end`);
                      setTitle("Maps Updated");
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div className={styles.list}>
          <h2>CHARACTERS</h2>
          {charNames.map((name, index) => {
            return (
              <div key={index} className={styles.buttonRow}>
                <button
                  className={
                    selectedChar === index ? styles.entrySelected : styles.entry
                  }
                  onClick={() => {
                    setSelectedChar(index);
                  }}
                >
                  {name.slice(7)}
                </button>
                <button
                  className={styles.entry}
                  onClick={() => {
                    if (
                      confirm(
                        `Are you sure you wish to delete character: ${name.slice(
                          7
                        )}?`
                      )
                    ) {
                      localStorage.removeItem(`${name}`);
                      setTitle("Characters Updated");
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div className={styles.list}>
          {" "}
          <button
            className={styles.entry}
            onClick={() => {
              if (typeof selectedChar !== "number") {
                alert("Please select a character.");
                return;
              }
              if (typeof selectedMap !== "number") {
                alert("Please select a map.");
                return;
              }
              router.push({
                pathname: "/game",
                query: {
                  character: charNames[selectedChar],
                  map: mapNames[selectedMap],
                  coords: JSON.stringify(coords[selectedMap]),
                },
              });
            }}
          >
            READY
          </button>
        </div>
      </div>
    </div>
  );
}
