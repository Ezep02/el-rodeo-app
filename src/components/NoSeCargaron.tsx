import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

interface SelectedMonth {
  month: number;
}

const NoSeCargaron: React.FC<SelectedMonth> = ({ month }) => {
  return (
    <div className="w-full flex justify-center items-center">

      <article 
        className="
          flex items-center justify-center bg-zinc-100 rounded-md shadow-md 
          w-5/6 sm:w-auto
      ">
        <div className="flex px-8 py-5 gap-3 w-full flex-wrap items-center">

          <div className="flex gap-2 items-center">
            <i className="text-4xl text-red-400 font-bold">
              <IoAlertCircleOutline />
            </i>
            <p className="font-semibold text-neutral-800 py-2 text-balance">
              sin registros disponibles del mes {month}.
            </p>
          </div>

          <div className="flex items-center">
            <Link
              to={"/rodeo/register"}
              className="
                text-zinc-50 bg-zinc-800 hover:bg-red-500 hover:text-zinc-100 px-3 py-1 rounded-2xl font-semibold flex items-center gap-1 outline-none transition-all duration-300 shadow-md
            "
            >
              Crear
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NoSeCargaron;
