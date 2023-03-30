import styles from "../../styles/Home.module.css";
import { ParseSymbol } from "./symbolParser";

export function StatsSheet({ player }) {
  return (
    <div className={styles.displayCharacterInfo}>
      <div className={styles.statsSheet}>
        <b>{player.name}</b>
        <b>~</b>
        <div>Strength:{player.stats.strength}</div>
        <div>Intelligence:{player.stats.intelligence}</div>
        <div>Stealth:{player.stats.stealth}</div>
      </div>
    </div>
  );
}
