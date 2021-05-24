import "./index.css";
import { useReducer, useState, useEffect } from "react";
import * as queryString from "query-string";
import { v4 as uuidv4 } from "uuid";
import CountDown from "./CountDown";
const initialState = {
  names: [],
  countdown: false,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "addName":
      return {
        ...state,
        names: [
          ...state.names,
          {
            name: payload.name.trim(),
            id: payload.id,
            selected: payload.selected,
          },
        ],
      };
    case "addNames":
      return {
        ...state,
        names: [...state.names, ...payload],
      };
    case "removeName":
      return {
        ...state,
        names: state.names.filter((x) => x.id !== payload),
      };
    case "resetNames":
      return {
        ...state,
        names: [],
      };
    default:
      throw new Error();
  }
}

const mapName = (name) => ({
  name: name.trim(),
  selected: false,
  id: uuidv4(),
});

function Daily(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  useEffect(() => {
    const { names } = queryString.parse(window.location.search, {
      arrayFormat: "comma",
    });
    if (Boolean(names)) {
      console.log(names);
      dispatch({
        type: "addNames",
        payload: names.map(mapName).sort(() => 0.5 - Math.random()),
      });
    }
  }, []);

  const handleAddName = (e) => {
    e.preventDefault();
    if (name.includes(",")) {
      const names = name
        .split(",")
        .map(mapName)
        .sort(() => 0.5 - Math.random());
      dispatch({ type: "addNames", payload: names });
    } else {
      dispatch({ type: "addName", payload: mapName(name) });
    }
    setName("");
  };

  const handleRemoveName = (value) => {
    dispatch({ type: "removeName", payload: value });
  };

  const [current, ...rest] = state?.names;
  console.log(rest);
  return (
    <>
      <div className="flex flex-row ">
        <div className="flex flex-col" width="medium">
          <p className="text-4xl self-start">Participants</p>
          <form onSubmit={handleAddName}>
            <div direction="row">
              <input type="text" value={name} onChange={handleChangeName} />
              <button
                type="submit"
                disabled={name === ""}
                onClick={handleAddName}
              ></button>
            </div>
          </form>
        </div>
        <div>
          <p className="text-4xl">Timer</p>
          {/* <Clock
            type="digital"
            time="PT0H15M0S"
            run={state.countdown}
            hourLimit="24"
            size="xxlarge"
          /> */}
          <CountDown minutes="15" />
        </div>
      </div>
      {state.names.length ? (
        <div margin={{ bottom: "medium" }}>
          <h1 className="text-6xl capitalize">{current.name}</h1>

          <div direction="row" margin={{ top: "small" }}>
            <button
              secondary
              onClick={() => dispatch({ type: "resetNames" })}
            />
            <button onClick={() => handleRemoveName(state.names[0].name)} />
          </div>
        </div>
      ) : null}
      <div className="flex flex-row">
        {rest.map(({ name, id }) => (
          <div
            className="flex flex-row p-4 mr-1 bg-gray-300 w-auto items-center rounded-lg"
            key={id}
            onClick={() => handleRemoveName(id)}
          >
            <img
              src={`https://avatars.dicebear.com/4.5/api/gridy/${id}.svg`}
              alt="avatar"
              width="48px"
            />
            <span className="font-semibold capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Daily;
