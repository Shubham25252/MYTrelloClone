import { createContext, useReducer, useRef, useState } from 'react';
import './App.css';
import CardList from './Components/CardList/CardList';

export const trelloContext = createContext();

function App() {
  const textBox = useRef(null);
  const [newCardList, setNewCardList] = useState(false);
  const [dynamicLists, setDynamicLists] = useState([]);

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        return {
          ...state,
          [action.payload.list]: [...state[action.payload.list], action.payload.data],
        };
      case "EditItem":
        return {
          ...state,
          [action.payload.list]: state[action.payload.list].map((task, index) => {
            if (index === action.payload.index) {
              return action.payload.newTitle;
            }
            return task;
          }),
        };
      case "DeleteItem": {
        const newList = [...state[action.payload.list]];
        newList.splice(action.payload.index, 1); // Remove item at index
        return {
          ...state,
          [action.payload.list]: newList, 
        };
      }
      case "ADD_LIST": 
        return {
          ...state,
          [action.payload.newList]: [] // Create a new empty list
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFn, {
    todoList: [],
    inProgress: [],
    completed: []
  });

  const onAddCardList = () => {
    const newListTitle = textBox.current.value.trim();
    if (!newListTitle) return;

    // Dispatch the new card list to the reducer
    dispatch({
      type: "ADD_LIST",
      payload: { newList: newListTitle }
    });

    // Also, add the new list to the dynamic lists array to render it
    setDynamicLists(prev => [...prev, newListTitle]);

    // Reset input field and hide the input box
    setNewCardList(false);
    textBox.current.value = "";
  };

  return (
    <>
      Trello-clone
      <trelloContext.Provider value={{ state, dispatch }}>
        <div className='card-list-Container'>
          {/* Predefined Card Lists */}
          <CardList id={"todoList"} title={"To do"} />
          <CardList id={"inProgress"} title={"In progress"} />
          <CardList id={"completed"} title={"Completed"} />
          
          {/* Render dynamically added Card Lists */}
          {dynamicLists.map((listTitle, index) => (
            <CardList key={index} id={listTitle} title={listTitle} />
          ))}
          
          {/* New Card List Input */}
          {
            newCardList ? (
              <div>
                <input type="text" placeholder="Add a new list" ref={textBox} />
                <button onClick={onAddCardList}>Add</button>
              </div>
            ) : (
              <button onClick={() => setNewCardList(true)}>+</button>
            )
          }
        </div>
      </trelloContext.Provider>
    </>
  );
}

export default App;
