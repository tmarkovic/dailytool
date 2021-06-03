import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addNames, removeName, participantsSelector, resetNames } from './reducer'
import * as queryString from "query-string";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Footer from "./Footer";

const mapName = (name: string) => ({
  name: name.trim(),
  selected: false,
  id: uuidv4(),
});

function Daily() {
  const dispatch = useDispatch()
  const names = useSelector(participantsSelector)
  console.log(names);

  useEffect(() => {
    const { names } = queryString.parse(window.location.search, {
      arrayFormat: "comma",
    });
    if (Boolean(names)) {
      dispatch(addNames((names as string[]).map(mapName).sort(() => 0.5 - Math.random())))
    }
  }, [dispatch]);

  const [current, ...rest] = names?.slice(0, 4);

  return (
    <>
      <Header />
      <div className="container mx-auto w-full flex flex-col h-full items-center">
        {names.length ? (
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
              onClick={() => dispatch(removeName(id))}
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
          <Footer
            onNext={() => dispatch(removeName(names[0].id))}
            onReset={() => dispatch(resetNames())}
          />
        </div>
      </div>
    </>
  );
}

export default Daily;
