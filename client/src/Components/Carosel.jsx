import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Img1 from "../Asserts/vul.png";
import Img2 from "../Asserts/UzLanding.png";
import Img3 from "../Asserts/uzhavan.png";
import Img4 from "../Asserts/res.png";
import Img5 from "../Asserts/weatherapp.png";
import Img6 from "../Asserts/guess.png";
import Img7 from "../Asserts/tema.png";
import Img8 from "../Asserts/team.png";
import Img9 from "../Asserts/git.png";

const ShuffleHero = () => {
  return (
    <section className="w-full px-8  py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4  md:text-xl text-white text-lg  ">
          FrontEnd Magician
        </span>
        <h3 className="text-5xl tracking-wider md:text-6xl text-yellow-600 font-semibold">
          Dinesh G
        </h3>
        <p className="text-base md:text-lg tracking-wider border-yellow-600 border-2 rounded-2xl text-white my-4 md:my-8">
          <span className="text-yellow-600 text-2xl">&quot;</span> From database
          design to pixel-perfect frontends, I traverse the full development
          stack with expertise.{" "}
          <span className="text-yellow-600 text-2xl">&quot;</span>
        </p>
        <div className="flex justify-center">
          <button className="bg-yellow-600 rounded-full text-black font-medium py-2 px-4  transition-all hover:bg-yellow-300 active:scale-95 flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
            Connect
          </button>
        </div>
      </div>
      <ShuffleGrid />
    </section>
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
    src: Img1,
  },
  {
    id: 2,
    src: Img2,
  },
  {
    id: 3,
    src: Img3,
  },
  {
    id: 4,
    src: Img4,
  },
  {
    id: 5,
    src: Img5,
  },

  {
    id: 7,
    src: Img6,
  },
  {
    id: 8,
    src: Img9,
  },
  {
    id: 9,
    src: Img8,
  },
  {
    id: 10,
    src: Img7,
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full border-yellow-600 border-2 rounded-lg "
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
    <div className="grid grid-cols-3 grid-rows-3 h-[450px] gap-2">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;
