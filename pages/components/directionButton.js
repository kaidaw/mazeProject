import styles from "../../styles/Home.module.css";
import { disableDirection } from "../functions/functions";

export function DirectionButton({
  rowIndex,
  cellIndex,
  direction,
  mapGrid,
  setMapGrid,
  cell,
}) {
  if (
    (direction === "north" && rowIndex !== 1) ||
    (direction === "east" && cellIndex !== mapGrid[0].length - 1) ||
    (direction === "south" && rowIndex !== mapGrid.length - 1) ||
    (direction === "west" && cellIndex !== 0)
  ) {
  }
  if (
    (direction === "north" && rowIndex === 0) ||
    (direction === "west" && cellIndex === 0) ||
    (direction === "east" && cellIndex === mapGrid[0].length - 1) ||
    (direction === "south" && rowIndex === mapGrid.length - 1)
  ) {
    return;
  }
  return (
    <button
      className={styles.directionButton}
      onClick={() => {
        disableDirection(rowIndex, cellIndex, direction, mapGrid, setMapGrid);
      }}
    >
      {direction === "north" && cell.directions[direction] && <b>&uarr;</b>}
      {direction === "east" && cell.directions[direction] && <b>&rarr;</b>}
      {direction === "south" && cell.directions[direction] && <b>&darr;</b>}
      {direction === "west" && cell.directions[direction] && <b>&larr;</b>}
    </button>
  );
}
