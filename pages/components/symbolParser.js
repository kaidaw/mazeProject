import styles from "../../styles/Home.module.css";

export const ParseSymbol = ({ symbol, big = false }) => {
  if (symbol === "sword") {
    return <span className={big ? styles.bigSymbol : ""}>&#9876;</span>;
  }
  if (symbol === "shield") {
    return <span className={big ? styles.bigSymbol : ""}>&#128737;</span>;
  }
  if (symbol === "skeleton") {
    return <span className={big ? styles.bigSymbol : ""}>&#128128;</span>;
  }
  if (symbol === "knight") {
    return <span className={big ? styles.bigSymbol : ""}>&#9822;</span>;
  }
  if (symbol === "door") {
    return <span className={big ? styles.bigSymbol : ""}>&#128682;</span>;
  }
  if (symbol === "coin") {
    return <span className={big ? styles.bigSymbol : ""}>&#129689;</span>;
  }
  if (symbol === "castle") {
    return <span className={big ? styles.bigSymbol : ""}>&#127984;</span>;
  }
  if (symbol === "dragon") {
    return <span className={big ? styles.bigSymbol : ""}>&#128050;</span>;
  }
  if (symbol === "ring") {
    return <span className={big ? styles.bigSymbol : ""}>&#128141;</span>;
  }
  if (symbol === "armour") {
    return <span className={big ? styles.bigSymbol : ""}>&#65707;</span>;
  }
  if (symbol === "lock") {
    return <span className={big ? styles.bigSymbol : ""}>&#128274;</span>;
  }
  if (symbol === "key") {
    return <span className={big ? styles.bigSymbol : ""}>&#128477;</span>;
  }
  if (symbol === "avatarOne") {
    return <span className={big ? styles.bigSymbol : ""}>&#9785;</span>;
  }
  if (symbol === "avatarTwo") {
    return <span className={big ? styles.bigSymbol : ""}>&#9786;</span>;
  }
  if (symbol === "avatarThree") {
    return <span className={big ? styles.bigSymbol : ""}>&#9787;</span>;
  }
};
