import { useContext } from "react";
import UserContext from "../../context/User.context.api";

const TotalCortesRealizados = () => {
  const { totalCortes } = useContext(UserContext)!;

  return (
    <div className="flex flex-col">
      <span className="text-amber-300 font-bold">{totalCortes}</span>
      <div>
        <h3 className="text-zinc-400 font-semibold">Cortes realizados</h3>
      </div>
    </div>
  );
};

export default TotalCortesRealizados;
