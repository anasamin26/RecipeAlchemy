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
        <button onClick={()=>{
          navigate('/signin');
        }} className=" ml-2 bg-black text-white font-medium py-2 px-4 rounded transition-all hover:bg-purple-900 active:scale-95" >
         Sign In
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
    src:"https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=2792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    src:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2813&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
  {
    id: 5,
    src:"https://images.unsplash.com/photo-1444731961956-751ed90465a5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
  {
    id: 6,
    src:"https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
  {
    id: 7,
    src:"https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
  {
    id: 8,
src:"https://images.unsplash.com/photo-1597428682757-0216d6532b36?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  },
  {
    id: 9,
    src:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
  {
    id: 10,
src:"https://images.unsplash.com/photo-1610562275255-03b7fa0d4655?q=80&w=2861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
  {
    id: 11,
src:"https://images.unsplash.com/photo-1622003275933-fc87f54913ab?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  },
  {
    id: 12,
    src:"https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 13,
    src:"https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=2872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
},
  {
    id: 14,
src:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  },
  {
    id: 15,
src:"https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  },
  {
    id: 16,
    src:"https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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