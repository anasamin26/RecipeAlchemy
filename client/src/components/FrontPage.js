import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TrippyScroll from "../aesthetics/TrippyScroll";
import CountDown from "../aesthetics/CountDown";
import { useNavigate } from "react-router-dom";
import Nav from "./Navbar";
import PublicNav from "./auth/PublicNav";
const ShuffleHero = () => {
  const navigate=useNavigate();

  return (
    <>
    <PublicNav/>
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-purple-800 font-medium">
          Tastier every day
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Let's start cooking
                  </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
        Unleash your creativity by sharing the ingredients swirling in your mind,
        and voila—a personalized recipe masterpiece awaits you.         </p>
        <button onClick={()=>{
          navigate('/search-recipe');
        }} className="bg-purple-800 text-white font-medium py-2 px-4 rounded transition-all hover:bg-purple-900 active:scale-95" >
         Take a Demo
        </button>
      </div>
      <ShuffleGrid />
    </section>
    <CountDown/>
    </>

  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src:require("../assets/frontpagepics/1.avif")
  },
  {
    id: 2,
    src:require("../assets/frontpagepics/2.avif")
  },
  {
    id: 3,
    src:require("../assets/frontpagepics/3.avif")
  },
  {
    id: 4,
    src:require("../assets/frontpagepics/4.avif")
},
  {
    id: 5,
    src:require("../assets/frontpagepics/5.avif")
},
  {
    id: 6,
    src:require("../assets/frontpagepics/6.avif")
},
  {
    id: 7,
    src:require("../assets/frontpagepics/7.avif")
},
  {
    id: 8,
    src:require("../assets/frontpagepics/8.avif")
  },
  {
    id: 9,
    src:require("../assets/frontpagepics/9.avif")
},
  {
    id: 10,
    src:require("../assets/frontpagepics/10.avif")
},
  {
    id: 11,
    src:require("../assets/frontpagepics/11.avif")
  },
  {
    id: 12,
    src:require("../assets/frontpagepics/12.avif")
  },
  {
    id: 13,
    src:require("../assets/frontpagepics/13.avif")
},
  {
    id: 14,
    src:require("../assets/frontpagepics/14.avif")
  },
  {
    id: 15,
    src:require("../assets/frontpagepics/15.avif")
  },
  {
    id: 16,
    src:require("../assets/frontpagepics/16.avif")
},
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;