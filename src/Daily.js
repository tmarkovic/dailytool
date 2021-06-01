import { useReducer, useState, useEffect } from "react";
import * as queryString from "query-string";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Footer from "./Footer";
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

  const [current, ...rest] = state?.names.slice(0, 4);

  return (
    <>
      <Header />
      <div className="container mx-auto w-full flex flex-col h-full items-center">
        {state.names.length ? (
          <div className="flex flex-row my-44 items-center place-items-center flex-shrink">
            <img
              src={`https://avatars.dicebear.com/4.5/api/human/${current.id}.svg`}
              alt="avatar"
              className="w-48 h-48 mr-8"
            />
            <h1 className="capitalize text-9xl">{current.name}</h1>
          </div>
        ) : null}
        <div className="flex flex-wrap flex-row-reverse">
          {rest.map(({ name, id }, i) => (
            <div
              className="flex flex-col p-2 mr-1 w-auto items-center"
              key={id}
              onClick={() => handleRemoveName(id)}
            >
              <img
                src={`https://avatars.dicebear.com/4.5/api/human/${id}.svg`}
                alt="avatar"
                className="rounded-full p-4 border-4 border-bg-base w-24 h-24"
              />
              <span className="capitalize font-medium text-base text-black max-w-[12ch] text-center">
                {name}
              </span>
            </div>
          ))}
        </div>
        {/* <form onSubmit={handleAddName} className="">
            <div className="form-control">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Add participant"
                  value={name}
                  onChange={handleChangeName}
                  className="w-full pr-16 input input-bordered"
                />
                <button
                  type="submit"
                  disabled={name === ""}
                  onClick={handleAddName}
                  className="absolute right-0 top-0 rounded-l-none btn btn-primary"
                >
                  go
                </button>
              </div>
            </div>
          </form> */}

        <div className="mt-auto h-24">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Daily;
