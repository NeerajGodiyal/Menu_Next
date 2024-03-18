import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactCurvedText from "react-curved-text";
import { AnimatePresence } from "framer-motion";
import styles from "../styles/Home.module.css";

interface FloatingMenuProps {
  setState: (state: string) => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ setState }) => {
  const [hover, setHover] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const menuItem: string[] = ["About", "Projects", "Contacts"];

  const menuAnim = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 2 },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: { type: "spring", duration: 1 },
    },
  };

  const masksize: string = hover && !active ? "800px" : active ? "3500px" : "500px";
  const position: string = active ? "-300px" : "-200px";

  useEffect(() => {
    if (hover && active) {
      setState("overlay");
    } else if (hover && !active) {
      setState("bg");
    } else if (!active) {
      setState("only");
    } else {
      setState("none");
    }
  }, [hover, active, setState]);

  return (
    <>
      <motion.div
        className={styles.mask}
        animate={{
          WebkitMaskSize: masksize,
          WebkitMaskPosition: `${position} ${position}`,
          transition: { duration: 1.5, type: "tween", ease: "backOut" },
        }}
        transition={{ type: "tween", ease: "backOut" }}
      >
        <motion.div
          className={`absolute top-5 left-5  overflow-hidden `}
          animate={{
            rotate: 360,
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
            text="Creative Menu  Neeraj Godiyal - "
            cx={50}
            cy={50}
            rx={50}
            ry={50}
            textPathProps={{ fill: "#ffffff" }}
            textProps={{
              style: { color: "white", fontSize: 20, position: "absolute" },
            }}
          />
        </motion.div>
        <div
          className={`  h-[3.75rem] w-[3.75rem] absolute top-10 left-10 cursor-pointer  rounded-full  ${
            active ? "bg-red-500 animate-pulse" : "bg-pink-500"
          } ${active && "transform translate-y-[75vh]"} transition-all duration-300`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setActive(!active)}
        ></div>
        <nav className={` absolute top-[12.5rem] left-[12.5rem] flex justify-center items-center group-hover:ring-offset-fuchsia-200 `}>
          <AnimatePresence>
            {active && (
              <ul className="text-red-400 text-7xl leading-tight font-bold">
                {menuItem.map((item, index) => (
                  <motion.div
                    key={item} // Use a unique key
                    variants={menuAnim}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <li
                      className="cursor-pointer uppercase opacity-100 group-hover:opacity-10 hover:translate-x-3 hover:!opacity-100 hover:text-pink-300 transition-all  duration-500 "
                      onClick={() => setValue(item)}
                      onMouseEnter={() => setValue(item)}
                      onMouseLeave={() => setValue("")}
                    >
                      {item}
                    </li>
                  </motion.div>
                ))}
              </ul>
            )}
          </AnimatePresence>

          <div
            className={` ${styles.masks} h-full w-full  flex justify-center items-center transition-all duration-1000 ${
              value === "About"
                ? "bg-red-400 scale-[200%]"
                : value === "Projects"
                ? "bg-pink-400 scale-[200%]"
                : value === "Contacts"
                ? "bg-blue-400 scale-[200%]"
                : hover && active
                ? "scale-[50%]"
                : !active
                ? "scale-[400%]"
                : null
            }`}
          ></div>
        </nav>

        <div className="w-[80vw] flex absolute justify-between items-center bottom-[10vh] left-[10vw] text-red-500 font-bold">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            &nbsp;Close Menu
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default FloatingMenu;
