import React from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { PiNotePencilDuotone } from "react-icons/pi";
import { SlNotebook } from "react-icons/sl";

interface itemProps {
  text: string;
  cardIcon?: any;
  icon?: any;
  linkTo: string;
  descrip?: string;
}

const AccesosRapidos = () => {
  return (
    <div
      className="
      sm:col-start-2 sm:col-end-11 sm:row-start-3 sm:row-end-12
      md:col-start-2 md:col-end-11 md:row-start-3 md:row-end-12
      lg:col-start-2 lg:col-end-11 lg:row-start-8 lg:row-end-11 
      xl:col-start-3 xl:col-end-11 xl:row-start-8 xl:row-end-11
      2xl:col-start-3 2xl:col-end-11 2xl:row-start-7 2xl:row-end-10
      col-start-2 col-end-11 row-start-2 row-end-12
    "
    >
      <div className="flex gap-2 h-full flex-col sm:flex-col md:flex-col lg:flex-row">
        <AccesoRapidoItem
          linkTo="/rodeo/register"
          text="crear registro"
          cardIcon={<PiNotePencilDuotone />}
          icon={<MdArrowOutward />}
          descrip="Tu registro al dia, para llevar control de tus gastos y ganancias"
        />
        <AccesoRapidoItem
          linkTo="/rodeo/revenue-list"
          text="ver ingresos"
          icon={<MdArrowOutward />}
          cardIcon={<SlNotebook />}
          descrip="De forma rapida y sencilla podras ver las ganancias de cada mes"
        />
        <AccesoRapidoItem
          linkTo="/rodeo/expense-list"
          text="ver gastos"
          icon={<MdArrowOutward />}
          cardIcon={<SlNotebook />}
          descrip="Llevar control de tus gastos es crucial, aqui podras acceder a ellos"
        />
      </div>
    </div>
  );
};

const AccesoRapidoItem: React.FC<itemProps> = ({
  linkTo,
  text,
  icon,
  cardIcon,
  descrip,
}) => {
  return (
    <div
      className="bg-gradient-to-b from-zinc-900 to-neutral-900 p-3 flex h-full w-full flex-col justify-evenly overflow-y-scroll scroll-abrir-tarjeta rounded-md shadow-md shadow-neutral-800 
      
    "
    >
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-row sm:flex-row md:flex-row gap-2">
          <div>
            <i className="text-4xl text-red-500 ">{cardIcon}</i>
          </div>

          <div className="flex">
            <Link
              to={linkTo}
              className="text-amber-300 hover:text-zinc-300 active:text-red-500 flex items-center gap-1 font-semibold rounded-3xl py-1"
            >
              {text}
              <i>{icon}</i>{" "}
            </Link>
          </div>
        </div>
        <div>
          <p className="text-neutral-300 text-balance font-semibold">
            {descrip}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccesosRapidos;
