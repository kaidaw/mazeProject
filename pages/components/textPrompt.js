import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { changeHandler } from "../functions/functions";
import { useRouter } from "next/router";

export function TextPrompt({
  room,
  setPlayer,
  player,
  danger,
  setDanger,
  setHasLooked,
  hasLooked,
  playerPosition,
  endCoordinates,
}) {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [promptText, setPromptText] = useState([]);
  const [roomEntities, setRoomEntities] = useState(
    room.entities.filter((entity) => {
      return entity.enabled;
    })
  );
  const [endGame, setEndGame] = useState(null);
  useEffect(() => {
    setPromptText([
      `You arrive in a new room.`,
      `Type "help" to see the list of available commands if you are stuck.`,
      `Look around to see the exits.`,
      `Alternatively, to save you a few keystrokes you can hit the button with the eyes.`,
    ]);
    setRoomEntities(
      room.entities.filter((entity) => {
        return entity.enabled;
      })
    );
  }, [room]);
  return (
    <div className={styles.textPrompt}>
      <button
        className={styles.eye}
        onClick={() => {
          changeHandler(
            "look",
            danger,
            roomEntities,
            player,
            setPromptText,
            setPlayer,
            setInputText,
            setDanger,
            setHasLooked,
            playerPosition,
            endCoordinates,
            router,
            room
          );
        }}
      >
        &#128064;
      </button>
      <div className={styles.textOutput}>
        {promptText.length &&
          promptText.map((line, index) => {
            return (
              <div key={index} className={styles.textLine}>
                {line}
              </div>
            );
          })}
      </div>

      <div className={styles.textInput}>
        <input
          placeholder="Type command:"
          value={inputText}
          className={styles.textInputBar}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === "Enter" &&
              changeHandler(
                inputText,
                danger,
                roomEntities,
                player,
                setPromptText,
                setPlayer,
                setInputText,
                setDanger,
                setHasLooked,
                playerPosition,
                endCoordinates,
                router,
                room
              );
          }}
        ></input>
      </div>
    </div>
  );
}
