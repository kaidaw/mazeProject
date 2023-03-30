import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { ParseSymbol } from "./symbolParser";
import { SymbolSelector } from "./symbolSelector";

export function CreateEntities({ setMapGrid, mapGrid }) {
  let defaultEntity = {
    name: "",
    value: 3,
    type: "",
    enabled: false,
    symbol: "",
    seen: false,
  };
  const [newEntity, setNewEntity] = useState({ ...defaultEntity });
  const [entities, setEntities] = useState([]);
  useEffect(() => {
    setEntities([...mapGrid[0][0].entities]);
  }, [mapGrid]);
  const clickHandler = () => {
    if (!newEntity.name || entities.length === 15) {
      return;
    }
    if (newEntity.name.length > 15) {
      alert("Please use a name with 15 characters or fewer");
      return;
    }
    if (!newEntity.type) {
      alert("Please select an entity type");
      return;
    }
    if (!newEntity.symbol) {
      alert("Please select a symbol");
      return;
    }
    setEntities([...entities, { ...newEntity }]);
    setNewEntity({ ...defaultEntity });
  };

  return (
    <div className={styles.entitySheet}>
      <b>{`Entities: ${entities.length}/12`}</b>
      <div className={styles.createEntity}>
        <select
          value={newEntity.type}
          onChange={(e) => {
            setNewEntity({ ...newEntity, type: e.target.value });
          }}
        >
          <option value="">Type</option>
          <option value="weapon">Weapon</option>
          <option value="enemy">Enemy</option>
          <option value="item">Item</option>
          <option value="obstacle">Obstacle</option>
        </select>
        <SymbolSelector
          newEntity={newEntity}
          setNewEntity={setNewEntity}
          entities={entities}
        />
        <button
          disabled={newEntity.value === 0}
          onClick={() => {
            setNewEntity({ ...newEntity, value: newEntity.value - 1 });
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            alert(
              "The strength/value of the enemy, item, or obstacle with 0 being the lowest and 6 being the highest."
            );
          }}
        >
          {newEntity.value}
        </button>
        <button
          disabled={newEntity.value === 6}
          onClick={() => {
            setNewEntity({ ...newEntity, value: newEntity.value + 1 });
          }}
        >
          +
        </button>
        <input
          placeholder="Description"
          value={newEntity.name && newEntity.name}
          onChange={(e) => {
            setNewEntity({ ...newEntity, name: e.target.value });
          }}
          onKeyDown={(e) => {
            e.key === "Enter" && clickHandler();
          }}
        />

        <button
          disabled={!newEntity.type || !newEntity.name || !newEntity.symbol}
          onClick={clickHandler}
        >
          Add
        </button>
      </div>
      {entities.map((entity, index) => {
        return (
          <div key={index} className={styles.entities}>
            <b className={styles.name}>{`Entity name: ${entity.name}`}</b>
            <ParseSymbol symbol={entity.symbol && entity.symbol} />
            <b
              className={styles.attribute}
            >{`Entity value: ${entity.value}`}</b>
            <b className={styles.attribute}>{`Entity type: ${entity.type}`}</b>

            <button
              className={styles.delete}
              onClick={() => {
                let newEntities = [...entities];
                newEntities.splice(index, 1);
                setEntities([...newEntities]);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button
        onClick={() => {
          setMapGrid(
            mapGrid.map((row) => {
              return row.map((cell) => {
                return { ...cell, entities: [...entities] };
              });
            })
          );
        }}
      >
        Set
      </button>
      <button
        onClick={() => {
          setNewEntity({ ...defaultEntity });
          setEntities([]);
        }}
      >
        Reset
      </button>
    </div>
  );
}
