import styles from "../../styles/Home.module.css";

export function AttributeBar({
  player,
  setPlayer,
  attribPoints,
  setAttribPoints,
  attribName,
}) {
  return (
    <div className={styles.attribBar}>
      <button
        className={styles.incrementButton}
        disabled={player.stats[attribName] === 0}
        onClick={() => {
          setPlayer({
            ...player,
            stats: {
              ...player.stats,
              [attribName]: player.stats[attribName] - 1,
            },
          });
          setAttribPoints(attribPoints + 1);
        }}
      >
        -
      </button>
      <button
        className={styles.incrementButton}
        disabled={attribPoints === 0 || player.stats[attribName] === 5}
        onClick={() => {
          setPlayer({
            ...player,
            stats: {
              ...player.stats,
              [attribName]: player.stats[attribName] + 1,
            },
          });

          setAttribPoints(attribPoints - 1);
        }}
      >
        +
      </button>
      <div>{`${attribName}: ${player.stats[attribName]}`}</div>
    </div>
  );
}
