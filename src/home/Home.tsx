import { useState } from "react";
import AccesosRapidos from "./components/AccesosRapidos";
import TotalCortesRealizados from "./components/TotalCortesRealizados";
import TotalExpense from "./components/TotalExpense";
import TotalRevenue from "./components/TotalRevenue";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";

const Home = () => {
  const [statsActive, setStatsActive] = useState(false);

  return (
    <div className="grid grid-cols-12 grid-rows-12 h-full w-full ">
      <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex justify-center items-center  w-full">
        <button
          onClick={() => setStatsActive(!statsActive)}
          className="rounded-full p-2 flex justify-center"
        >
          <i className="text-red-600 hover:scale-150 hover:text-zinc-50 text-4xl">
            <RiArrowRightSLine />
          </i>
        </button>
      </div>

      {statsActive && (
        <div className="
        flex col-start-1 col-end-13 row-start-1 row-end-13 justify-center items-center gap-5 transition-all duration-200 ease-linear text-white left-10 z-20 backdrop-blur-md "

      >
          <div className="
            flex flex-col gap-3 shadow-xl shadow-neutral-700 justify-evenly 
            sm:h-3/4 sm:w-5/6 sm:rounded-2xl
            md:h-3/4 md:w-3/4
            lg:h-3/4 lg:w-2/4
            xl:h-3/4 xl:w-2/5
            2xl:h-3/4 2xl:w-2/5

            h-full w-full
            bg-gradient-to-b from-zinc-900 to-neutral-900

          "
          
          >
            <div className="flex w-full justify-center ">
              <button onClick={() => setStatsActive(!statsActive)}>
                <i className="text-2xl hover:text-red-500 transition-all duration-200 ease-linear py-4">
                  <IoCloseSharp />
                </i>
              </button>
            </div>

            <div className="flex w-full px-3">
              <a
                href="https://www.instagram.com/elrodeobarber/"
                target="elRodeo"
                className="flex items-center gap-1 hover:text-amber-300 transition-all duration-300"
              >
                <i className="text-2xl">
                  <FaInstagram />
                </i>
                El rodeo
              </a>
            </div>

            <div className=" flex h-1/2 w-full justify-center ">
              <img
                src="/logo.svg"
                className="object-contain drop-shadow-3xl "
                alt=""
              />
            </div>

            <div className="flex w-full justify-evenly  p-1 gap-2 ">
              <TotalRevenue />
              <TotalExpense />
              <TotalCortesRealizados />
            </div>
          </div>
        </div>
      )}

      <AccesosRapidos />
    </div>
  );
};

export default Home;
