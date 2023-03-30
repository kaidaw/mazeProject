import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function MenuBar({
  game = false,
  gameFiles = null,
  setGameFiles = null,
  world = null,
  setWorld = null,
  playerPosition = null,
  setPlayerPosition = null,
  endCoordinates = null,
  setEndCoordinates = null,
  player = null,
  setPlayer = null,
  danger = null,
  setDanger = null,
  hasLooked = null,
  setHasLooked = null,
}) {
  useEffect(() => {
    if (world) {
      setGameFiles({
        world: world,
        playerPosition: playerPosition,
        endCoordinates: endCoordinates,
        player: player,
        danger: danger,
        hasLooked: hasLooked,
      });
    }
  }, [
    world,
    playerPosition,
    endCoordinates,
    player,
    danger,
    hasLooked,
    setGameFiles,
  ]);
  const router = useRouter();
  return (
    <span className={styles.menuBar}>
      <button
        className={styles.menuButton}
        onClick={() => {
          router.push("/");
        }}
      >
        MENU
      </button>
      {game && (
        <button
          onClick={() => {
            if (
              confirm(
                "Are you sure? This will overwrite any previous save you have made."
              )
            ) {
              //I NEED TO SAVE THIS TWICE- TRY TO FIND A FIX FOR THIS THEN EVERYTHING IS SET EXCEPT THE END GAME!!!

              if (!Object.keys(gameFiles).length) {
                alert(
                  "Your save has been prepared. Please click again to save."
                );
              }
              localStorage.setItem("game.save", JSON.stringify(gameFiles));
            }
          }}
          className={styles.menuButton}
        >
          SAVE
        </button>
      )}
      {game && (
        <button
          onClick={() => {
            if (
              confirm("Are you sure? This will overwrite your current game.")
            ) {
              let loadedGame = JSON.parse(localStorage.getItem("game.save"));

              setWorld(loadedGame.world);
              setPlayerPosition(loadedGame.playerPosition);
              setEndCoordinates(loadedGame.endCoordinates);
              setPlayer(loadedGame.player);
              setDanger(loadedGame.danger);
              setHasLooked(loadedGame.hasLooked);
            }
          }}
          className={styles.menuButton}
        >
          LOAD
        </button>
      )}
    </span>
  );
}
