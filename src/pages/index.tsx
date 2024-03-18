import ReactCurvedText from "react-curved-text";
import FloatingMenu from "../components/FloatingMenu";
import styles from '../styles/Home.module.css';
import { useState } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

function App() {
  const [state, setState] = useState("");

  return (
    <>
      <div
        className={`   fixed w-full h-full z-20 pointer-events-none border-[10rem] border-white rounded-lg transition duration-500 ${
          state === "overlay" ? "scale-[100%]" : "scale-[400%]"
        }`}
      >
        {state === "overlay" && (
          <>
            <motion.div
              className="text-xl absolute top-0 text-black z-10"
              initial={{ y: -500 }}
              animate={{ y: -100, transition: { type: "spring", duration: 1 } }}
            >
              <Marquee className="overflow-hidden" gradient autoFill>
                <ul className="flex gap-[1rem] font-medium uppercase">
                  <li> - Back to Main - </li>
                  <li> - Back to Main - </li>
                </ul>
              </Marquee>
            </motion.div>
            <motion.div
              className="text-xl absolute bottom-0 text-black z-10"
              initial={{ y: 500 }}
              animate={{ y: 100, transition: { type: "spring", duration: 1 } }}
            >
              <Marquee
                className="overflow-hidden"
                gradient
                autoFill
                direction="right"
              >
                <ul className="flex gap-[1rem] font-thin uppercase">
                  <li> - Back to Main - </li>
                  <li> - Back to Main - </li>
                </ul>
              </Marquee>
            </motion.div>
          </>
        )}
      </div>
      <div
        className={`  fixed w-full h-full ${
          state === "bg" ? "bg-red-400" : "bg-white"
        } transition duration-300`}
      ></div>
      <div className={`h-full `}>
        <FloatingMenu setState={setState} />
        <div className={styles.body}>
          {state === "only" && (
            <motion.div
              className={`absolute top-5 left-5  overflow-hidden font-thin  `}
              initial={{ opacity: 0 }}
              animate={{
                rotate: 360,
                opacity: 1,
                transition: {
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }}
            >
              <ReactCurvedText
                width={100}
                height={100}
                text="Creative Menu by ---- Neeraj Godiyal ----  " 
                cx={50}
                cy={50}
                rx={50}
                ry={50}
                
              />
              <div className="h-[50px] w-[50px] absolute top-6 left-6 flex justify-center items-center rounded-full bg-black z--20"></div>
            </motion.div>
          )}
          
          
        </div>
      </div>
    </>
  );
}

export default App;