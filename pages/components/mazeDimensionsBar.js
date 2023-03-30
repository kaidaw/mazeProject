import styles from "../../styles/Home.module.css";
import { createDefaultState } from "../functions/functions";

export function MazeDimensionsBar({ mapGrid, setMapGrid }) {
  return (
    <div className={styles.changeSize}>
      <button
        onClick={() => {
          setMapGrid(createDefaultState());
        }}
      >
        RESET
      </button>
      <div>
        <b>Row</b>
      </div>
      <div>
        <button
          disabled={mapGrid.length === 3}
          onClick={() => {
            let newMapGrid = [];
            for (let i = 0; i < mapGrid.length - 1; i++) {
              newMapGrid.push(mapGrid[i]);
            }
            setMapGrid([...newMapGrid]);
          }}
        >
          -
        </button>
        <button
          disabled={mapGrid.length === 5}
          onClick={() => {
            let newRow = [];
            for (let i = 0; i < mapGrid[0].length; i++) {
              newRow.push({
                enabled: false,
                directions: {
                  north: false,
                  south: false,
                  east: false,
                  west: false,
                },
                entities: [...mapGrid[0][0].entities],
              });
            }
            setMapGrid([...mapGrid, newRow]);
          }}
        >
          +
        </button>
      </div>
      <div>
        <b>Column</b>
      </div>
      <div>
        <button
          disabled={mapGrid[0].length === 3}
          onClick={() => {
            let newMapGrid = [...mapGrid];
            for (let i = 0; i < mapGrid.length; i++) {
              newMapGrid[i].pop();
            }
            setMapGrid([...newMapGrid]);
          }}
        >
          -
        </button>
        <button
          disabled={mapGrid[0].length === 5}
          onClick={() => {
            let newMapGrid = [...mapGrid];
            for (let i = 0; i < mapGrid.length; i++) {
              newMapGrid[i].push({
                enabled: false,
                directions: {
                  north: false,
                  south: false,
                  east: false,
                  west: false,
                },
                entities: [...mapGrid[0][0].entities],
              });
            }
            setMapGrid([...newMapGrid]);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
