import styles from "./CardList.module.css";
import Card from "../Card/Card";
import { useContext, useRef, useState } from "react";
import { trelloContext } from "../../App";

const CardList = ({ title, id }) => {
  const trelloCtx = useContext(trelloContext);
  const [showAddCardBox, setShowAddCardBox] = useState(false);
  const textBoxRef = useRef(null);

  const addCardBtn = () => {
    setShowAddCardBox(true);
  };

  const addClick = () => {
    const taskText = textBoxRef.current.value;
    trelloCtx.dispatch({
      type: "ADD_ITEM",
      payload: {
        data: taskText,
        list: id
      }
    });
    textBoxRef.current.value = "";
    setShowAddCardBox(false);
  };

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      {
        trelloCtx.state[id].map((task, index) => {
          console.log(task);
          return(
          <Card key={`${id}-${index}`} title={task} listId={id} index={index} />
          )
})
      }
      {
        showAddCardBox ? (
          <div>
            <input type="text" placeholder="Add a new card" ref={textBoxRef} />
            <button onClick={addClick}>Add</button>
            <button onClick={() => setShowAddCardBox(false)}>Cancel</button>
          </div>
        ) : (
          <span onClick={addCardBtn}>+ Add Another Card</span>
        )
      }
    </div>
  );
};

export default CardList;
