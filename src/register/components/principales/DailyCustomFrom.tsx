import { useState } from "react";
import CustomRevenueForm from "../reutilizables/CustomRevenueForm";
import CustomExpenseForm from "../reutilizables/CustomExpenseForm";

const DailyCustomFrom = () => {
  const [selectedState, setSelectedState] = useState("ingresos");

  return (
    <div
      className="flex flex-col h-4/5 w-4/5 sm:h-4/5 sm:w-2/3 md:h-4/5 md:w-2/4
        rounded-xl shadow-2xl lg:w-1/3 lg:h-2/3 gap-3 p-4 justify-center
        shadow-zinc-900 backdrop-blur-sm xl:w-1/3"
    >
      <div className="inline-flex">
        <h2 className="text-zinc-50 font-bold">Cargar registro diario</h2>
      </div>

      <select
        name=""
        id=""
        defaultValue={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="p-2 bg-neutral-900 text-zinc-100  rounded-md"
      >
        <option value="ingresos">Ingresos</option>
        <option value="gastos">Gastos</option>
      </select>

      {selectedState === "ingresos" ? (
        <CustomRevenueForm />
      ) : (
        <CustomExpenseForm />
      )}
    </div>
  );
};

export default DailyCustomFrom;
