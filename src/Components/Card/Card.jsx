import { useState, useContext } from "react";
import { trelloContext } from "../../App";
import styles from "./Card.module.css";

const Card = ({ title, listId, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isHovered, setIsHovered] = useState(false); // Changed from `ishover` to `isHovered`
  const trelloCtx = useContext(trelloContext);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteButton = () => {
    trelloCtx.dispatch({
      type: "DeleteItem",
      payload: {
        list: listId,
        index: index,
      },
    });
  };

  const handleSaveClick = () => {
    trelloCtx.dispatch({
      type: "EditItem",
      payload: {
        list: listId,
        index: index,
        newTitle: newTitle,
      },
    });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewTitle(title);
    setIsEditing(false);
  };

  // Handle hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter} // Add mouse enter event
      onMouseLeave={handleMouseLeave} // Add mouse leave event
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <p>
          {title}
          {isHovered && ( // Show buttons when hovered
            <span>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleDeleteButton}>Delete</button>
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default Card;
