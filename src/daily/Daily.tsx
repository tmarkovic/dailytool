import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import * as queryString from "query-string";
import { motion, AnimatePresence } from "framer-motion"
import { addNames, removeName, participantsSelector, currentStartTimeSelector } from './reducer'

import Header from "./Header";
import Footer from "./Footer";
import { isRunningSelector, setDuration } from "../time/reducer";
import { formatTime } from "../utils";





function Daily() {
  const dispatch = useDispatch();
  const names = useSelector(participantsSelector);
  const isRunning = useSelector(isRunningSelector)
  const currentStartTime = useSelector(currentStartTimeSelector);
  const [currentTick, setCurrentTick] = useState('00:00')
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const { minutes, seconds } = formatTime(Date.now() - currentStartTime)
        setCurrentTick(`${minutes}:${seconds}`);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isRunning, setCurrentTick, currentTick, currentStartTime]);

  useEffect(() => {
    const { names, duration } = queryString.parse(window.location.search, {
      arrayFormat: "comma",
    });
    if (Boolean(names)) {
      dispatch(addNames((names as string[])))
    }
    if (duration) {
      dispatch(setDuration(Number.parseInt(duration as string, 10)))
    }
  }, [dispatch]);

  const [current, next, ...rest] = names.slice(0, 5)

  return (
    <>
      <Header />
      <div className="container mx-auto w-full flex flex-col h-full items-center">
        {names.length ? (

          <div className="flex flex-row my-36 mb items-center place-items-center flex-shrink">
            <img
              src={`https://avatars.dicebear.com/4.5/api/human/${current.id}.svg`}
              alt="avatar"
              className="w-48 h-48 mr-8"
            />
            <h1 className="capitalize text-9xl"><span className="text-error block text-xl">ON AIR: {currentTick} </span>{current.name}</h1>
          </div >
        ) : null
        }

        {
          next ? (

            <motion.div
              animate={{ scale: 1 }}
              initial={{ scale: 0 }}
              key={next?.id}
              className="flex flex-row items-center place-items-center mb-6">
              <img
                src={`https://avatars.dicebear.com/4.5/api/human/${next?.id}.svg`}
                alt="avatar"
                className="w-24 h-24 mr-8"
              />
              <h2 className="capitalize text-5xl"><span className="text-success block text-xl">NEXT UP:</span>{next?.name}</h2>
            </motion.div>
          ) : null
        }
        <div className="flex flex-wrap">
          <AnimatePresence initial={false}>
            {rest.map(({ name, id }, i) => (

              <motion.div
                animate={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0, opacity: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                layout
                key={id}
                className="flex flex-col p-2 mr-1 w-auto items-center cursor-pointer"
                onClick={() => dispatch(removeName(id))}
              >
                <img
                  src={`https://avatars.dicebear.com/4.5/api/human/${id}.svg`}
                  alt="avatar"
                  className="rounded-full p-4 border-4 border-bg-base w-20 h-20"
                />
                <span className="capitalize font-medium text-base text-black max-w-[12ch] text-center">
                  {name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
        {
          names.length - 5 > 0 ?

            <motion.p
              animate={{ scale: 1 }}
              initial={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-2xl w-full text-center">+ {names.length - 5}</motion.p> : null
        }
        <div className="mt-auto h-24">
          <Footer />
        </div>
      </div >
    </>
  );
}

export default Daily;
