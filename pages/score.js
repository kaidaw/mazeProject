import { MenuBar } from "./components/menuBar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Score() {
  let router = useRouter();
  let params = router.query;
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [survived, setSurvived] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const hidePassword = (pass) => {
    //placeholder function to be replaced by hashing and authentication to protect password, just to show a hidden version of the password for now
    let hiddenPass = "";
    for (let letter of pass) {
      hiddenPass += "*";
    }
    return hiddenPass;
  };
  useEffect(() => {
    let currentScore = 0;
    let character = "";
    let room = "";
    let died = true;
    if (params) {
      character = JSON.parse(params.character);
      room = JSON.parse(params.room);
      died = params.survived === "true" ? false : true;
    }
    if (params.start && params.end && params.start === params.end) {
      currentScore += 100;
    }
    if (character && room) {
      let entities = room.entities;
      let inventory = character.inventory;
      for (let item of inventory) {
        for (let entity of entities) {
          if (item === entity.symbol) {
            currentScore += entity.value;
          }
        }
      }
    }
    setUser(character.name);
    setSurvived(!died);
    setName(character && character.name);
    setScore(currentScore);
  }, [params]);
  return (
    <div>
      <MenuBar></MenuBar>
      <div className={styles.center}>
        <div className={styles.thankYou}>
          <b className={styles.register}>
            Thank you for playing this adventure game by:
          </b>
          <b className={styles.olde}>OLDE WORLDE PHUNNE</b>
          <b className={styles.register}>
            Please consider registering a new account with our new website
            below:
          </b>
        </div>

        <div className={styles.scoreSheet}>
          <b className={styles.scoreSheetItem}>{name}</b>
          <b className={styles.scoreSheetItem}>Score: {score}</b>
          {!survived && <div className={styles.scoreSheetItem}>&#9760;</div>}
          {!survived && <b className={styles.scoreSheetItem}>You died.</b>}
          {survived && <div className={styles.scoreSheetItem}>&#9876;</div>}
          {survived && <b className={styles.scoreSheetItem}>You survived!</b>}
        </div>
        <div className={styles.registerSheet}>
          <input
            className={styles.inputUser}
            placeHolder="user"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          ></input>
          <input
            className={styles.inputEmail}
            placeHolder="Email:"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={hidePassword(password)}
            className={styles.inputPassword}
            placeHolder="Password"
          ></input>
          <button
            className={styles.inputDetails}
            onClick={() => {
              alert(
                `Thank you for registering with email: ${email} and username: ${user}`
              );
            }}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
