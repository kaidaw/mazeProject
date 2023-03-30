import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { AttributeBar } from "./components/attributeBar";
import { MenuBar } from "./components/menuBar";

export default function NewCharacter() {
  let [player, setPlayer] = useState({
    name: "",
    stats: { strength: 0, intelligence: 0, stealth: 0 },
    avatar: "",
    inventory: [],
  });
  const [attribPoints, setAttribPoints] = useState(5);
  const [rerolls, setRerolls] = useState(3);
  const [showHints, setShowHints] = useState(false);
  const router = useRouter();
  return (
    <div>
      <MenuBar />
      <div className={styles.characterSheet}>
        <input
          placeholder="Enter name:"
          className={styles.characterButton}
          onChange={(e) => {
            setPlayer({ ...player, name: e.target.value });
          }}
        />
        <div>
          <button
            className={styles.characterButton}
            onClick={() => {
              if (!player.name) {
                alert("Please choose a name");
                return;
              }
              if (attribPoints) {
                alert("Please spend your attribute points... wisely");
                return;
              }
              if (!player.avatar) {
                alert(
                  "Please select your avatar or we will choose one for you. And you will not like it."
                );
                return;
              }
              if (localStorage.getItem(`player.${player.name}`)) {
                alert("Please choose a unique name");
                return;
              }
              localStorage.setItem(
                `player.${player.name}`,
                JSON.stringify(player)
              );
              alert(`Successfully saved character ${player.name}`);
            }}
          >
            SAVE
          </button>
        </div>
        <div className={styles.pickAvatar}>
          Avatar:
          <div>
            <input
              defaultChecked={player.avatar === "avatarOne"}
              type="radio"
              name="avatar"
              value={player.avatar}
              onClick={(e) => {
                setPlayer({ ...player, avatar: e.target.value });
              }}
            />
            <label>&#9785; The Eternal Frowner</label>
          </div>
          <div>
            <input
              defaultChecked={player.avatar === "avatarTwo"}
              type="radio"
              name="avatar"
              value={player.avatar}
              onClick={(e) => {
                setPlayer({ ...player, avatar: e.target.value });
              }}
            />
            <label>&#9786; Monsieur Smiles</label>
          </div>
          <div>
            <input
              defaultChecked={player.avatar === "avatarThree"}
              type="radio"
              name="avatar"
              value={player.avatar}
              onClick={(e) => {
                setPlayer({ ...player, avatar: e.target.value });
              }}
            />
            <label>&#9787; Mysterious Man</label>
          </div>
        </div>
        <div> {`Attribute points:`}</div>
        <div>{`${attribPoints}`}</div>
        <div>
          {" "}
          <button
            className={styles.characterButton}
            disabled={!rerolls}
            onClick={() => {
              rerolls &&
                setPlayer({
                  ...player,
                  stats: { strength: 0, intelligence: 0, stealth: 0 },
                });
              rerolls && setRerolls(rerolls - 1);
              rerolls && setAttribPoints(Math.round(Math.random() * 6));
            }}
          >
            Reroll
          </button>{" "}
        </div>
        <div>
          {rerolls === 1
            ? `You have one try left. Choose wisely.`
            : `You have ${rerolls} rolls left.`}
        </div>
        <div>
          {" "}
          <AttributeBar
            player={player}
            attribPoints={attribPoints}
            attribName="strength"
            setPlayer={setPlayer}
            setAttribPoints={setAttribPoints}
          ></AttributeBar>
          <AttributeBar
            player={player}
            attribPoints={attribPoints}
            attribName="intelligence"
            setPlayer={setPlayer}
            setAttribPoints={setAttribPoints}
          ></AttributeBar>
          <AttributeBar
            player={player}
            attribPoints={attribPoints}
            attribName="stealth"
            setPlayer={setPlayer}
            setAttribPoints={setAttribPoints}
          ></AttributeBar>
        </div>

        <button
          className={styles.characterButton}
          onClick={() => {
            setShowHints(!showHints);
          }}
        >
          Hints (show/hide)
        </button>
        {showHints && (
          <div>
            <ul>
              <li>
                {`1: The maximum number of attribute points you can roll is 6.`}
              </li>
              <li>
                {`2: You only get 3 rolls so be careful. If you use all 3, you are stuck with your last roll.`}
              </li>
              <li>
                {`3: Attributes can be a maximum of 5 and a minimum of 0. Special options may appear in the game for especially high or low attributes.`}
              </li>
              <li>
                {`4: Make sure you are ready to start when you decide to enter- there is no turning back once you start!`}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
