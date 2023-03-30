import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Menu() {
  const router = useRouter();
  return (
    <div className={styles.center}>
      <h1 className={styles.olde}>OLDE WORLDE PHUNNE</h1>
      <div className={styles.menu}>
        <button
          className={styles.menuItem}
          onClick={() => {
            router.push("/selectScreen");
          }}
        >
          New Game
        </button>
        <button
          className={styles.menuItem}
          onClick={() => {
            router.push("/newCharacter");
          }}
        >
          New Character
        </button>
        <button
          className={styles.menuItem}
          onClick={() => {
            router.push("/newMap");
          }}
        >
          New Map
        </button>
      </div>
    </div>
  );
}
