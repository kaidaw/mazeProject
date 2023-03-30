import styles from "../../styles/Home.module.css";
import { ParseSymbol } from "./symbolParser";

export function GameMap({ playerPosition, player, hasLooked, map }) {
  return (
    <div id={styles.gameSheet}>
      {map.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={styles.gameRow}>
            {row.map((cell, cellIndex) => {
              if (
                playerPosition[0] === rowIndex &&
                playerPosition[1] === cellIndex
              ) {
                return (
                  <div key={cellIndex} className={styles.currentCell}>
                    <div className={styles.cellRow}>
                      <span className={styles.cellSegment}></span>
                      <span className={styles.cellSegment}>
                        {cell.directions.north && hasLooked && <b>&uarr;</b>}
                      </span>
                      <span className={styles.cellSegment}></span>
                    </div>
                    <div className={styles.cellRow}>
                      <span className={styles.cellSegment}>
                        {cell.directions.west && hasLooked && <b>&larr;</b>}
                      </span>
                      <span className={styles.cellSegment}>
                        {playerPosition[0] === rowIndex &&
                          playerPosition[1] === cellIndex && (
                            <div className={styles.stickFigure}>
                              <ParseSymbol symbol={player.avatar} />
                              <div className={styles.stickBodySmall}>-|-</div>
                              <div className={styles.stickLegsSmall}>/\</div>
                            </div>
                          )}
                      </span>
                      <span className={styles.cellSegment}>
                        {cell.directions.east && hasLooked && <b>&rarr;</b>}
                      </span>
                    </div>
                    <div className={styles.cellRow}>
                      <span className={styles.cellSegment}></span>
                      <span className={styles.cellSegment}>
                        {cell.directions.south && hasLooked && <b>&darr;</b>}
                      </span>
                      <span className={styles.cellSegment}></span>
                    </div>
                  </div>
                );
              }
              return <div key={cellIndex} className={styles.gameCell}></div>;
            })}
          </div>
        );
      })}
    </div>
  );
}
