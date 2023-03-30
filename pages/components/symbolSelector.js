export const SymbolSelector = ({ newEntity, setNewEntity, entities }) => {
  const checkSymbols = (symbol) => {
    for (let entity of entities) {
      if (entity.symbol === symbol) {
        return true;
      }
    }
    return false;
  };
  return (
    <select
      disabled={!newEntity.type}
      value={newEntity.symbol}
      onChange={(e) => {
        setNewEntity({ ...newEntity, symbol: e.target.value });
      }}
    >
      <option value="">Symbol</option>
      {newEntity.type === "weapon" && (
        <option disabled={checkSymbols("sword")} value="sword">
          &#9876; Sword
        </option>
      )}
      {newEntity.type === "weapon" && (
        <option disabled={checkSymbols("shield")} value="shield">
          &#128737; Shield
        </option>
      )}
      {newEntity.type === "weapon" && (
        <option disabled={checkSymbols("armour")} value="armour">
          &#65707; Armour
        </option>
      )}
      {newEntity.type === "enemy" && (
        <option disabled={checkSymbols("knight")} value="knight">
          &#9822; Knight
        </option>
      )}
      {newEntity.type === "enemy" && (
        <option disabled={checkSymbols("skeleton")} value="skeleton">
          &#128128; Skeleton
        </option>
      )}
      {newEntity.type === "enemy" && (
        <option disabled={checkSymbols("dragon")} value="dragon">
          &#128050; Dragon
        </option>
      )}
      {newEntity.type === "item" && (
        <option disabled={checkSymbols("ring")} value="ring">
          &#128141; Treasure
        </option>
      )}
      {newEntity.type === "item" && (
        <option disabled={checkSymbols("coin")} value="coin">
          &#129689; Gold
        </option>
      )}
      {newEntity.type === "item" && (
        <option disabled={checkSymbols("key")} value="key">
          &#128477; Key
        </option>
      )}
      {newEntity.type === "obstacle" && (
        <option disabled={checkSymbols("door")} value="door">
          &#128682; Door
        </option>
      )}
      {newEntity.type === "obstacle" && (
        <option disabled={checkSymbols("castle")} value="castle">
          &#127984; Fortification
        </option>
      )}
      {newEntity.type === "obstacle" && (
        <option disabled={checkSymbols("lock")} value="lock">
          &#128274; Lock
        </option>
      )}
    </select>
  );
};
