import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

const NavBar = () => {
  const [activeNav, setActiveNav] = useState(false);

  const toggleNavHandler = () => {
    setActiveNav(!activeNav);
  };

  return (
    <aside
      className="flex-1 bg-zinc-900 p-5
      flex flex-col absolute h-full z-20 right-0
    "
    >
      {activeNav ? (
        <div className="flex flex-col gap-5">
          <div className="w-full flex ">
            <button
              onClick={toggleNavHandler}
              className="text-2xl text-zinc-50 hover:text-red-500 active:text-red-500"
            >
              <IoCloseSharp />
            </button>
          </div>

          <div className="flex flex-col gap-1 ">
            <NavLi navigateTo="/" textValue="Inicio" />
            <NavLi navigateTo="/rodeo/register" textValue="Agregar registro" />
            <NavLi
              navigateTo="/rodeo/revenue-list"
              textValue="Ver listado de ingresos"
            />
            <NavLi
              navigateTo="/rodeo/expense-list"
              textValue="Ver listado de gastos"
            />
          </div>
        </div>
      ) : (
        <button
          onClick={toggleNavHandler}
          className="text-xl text-white hover:text-red-400 active:text-red-500"
        >
          <MdOutlineMenu />
        </button>
      )}
    </aside>
  );
};

interface NavLiProps {
  navigateTo: string;
  textValue: string;
}

const NavLi: React.FC<NavLiProps> = ({ navigateTo, textValue }) => {
  return (
    <div
      className="flex items-center  gap-2 py-3 rounded-xl cursor-pointer active:text-neutral-800
      
    "
    >
      <div className="flex">
        <Link
          to={navigateTo}
          className="text-neutral-200 transition-all duration-100 ease-in w-full hover:text-amber-300"
        >
          {textValue}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
