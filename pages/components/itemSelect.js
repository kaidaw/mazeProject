import styles from "../../styles/Home.module.css";
import { ParseSymbol } from "./symbolParser";

export function ItemSelect({
  mapGrid,
  rowIndex,
  cellIndex,
  setMapGrid,
  entities,
}) {
  let newEntities = entities.map((entity) => {
    return { ...entity };
  });

  return (
    <div className={styles.itemSelect}>
      {newEntities.map((entity, index) => {
        return (
          <div key={`${entity.name}${rowIndex}${cellIndex}`}>
            <input
              checked={entity.enabled}
              type="checkbox"
              name={`${index}${rowIndex}${cellIndex}`}
              onClick={() => {
                newEntities[index].enabled = !newEntities[index].enabled;
                setMapGrid(
                  mapGrid.map((row, rowI) => {
                    return row.map((cell, cellI) => {
                      if (rowI === rowIndex && cellI === cellIndex) {
                        return { ...cell, entities: [...newEntities] };
                      }

                      return { ...cell };
                    });
                  })
                );
              }}
            />
            <label>
              <ParseSymbol symbol={entity.symbol} />
            </label>
          </div>
        );
      })}
    </div>
  );
}
