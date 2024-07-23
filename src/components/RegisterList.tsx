import { LuPencil } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { GrCut } from "react-icons/gr";
import { FormData } from "../types/Custom.form.types";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import {
  CustomExpenseDescripcion,
  CustomExpenseInputForm,
} from "./Custom.expense.input";
import RevenueRegisterInputForm from "./Custom.register.input";

import { desktopDir, join } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/api/fs";
import UserContext from "../context/User.context.api";

interface RegisterListProps {
  monthData: monthPropsData[];
  expense?: boolean;
  revenue?: boolean;
}

type monthPropsData = {
  ingresos?: number | string | undefined;
  cortes?: number | string | undefined;
  dia?: number | string | undefined;
  mes?: number | string | undefined;
  anio?: number | string | undefined;
  descripcion?: string | undefined;
};

const RegisterList: React.FC<RegisterListProps> = ({
  monthData,
  expense,
  revenue,
}) => {
  const { setSelectedExpenseMonthData, setSelectedMonthData } =
    useContext(UserContext)!;

  const [activeFormIndex, setActiveFormIndex] = useState<number | null>(null);
  const [data, setData] = useState<monthPropsData[]>(monthData);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const toggleExpenseForm = (index: number) => {
    if (activeFormIndex === index) {
      setActiveFormIndex(null);
    } else {
      setActiveFormIndex(index);
      // Establecer valores por defecto del formulario
      setValue("ingresos", monthData[index].ingresos);
      setValue("descripcion", monthData[index].descripcion);
    }
  };

  const handleRevenueMod = handleSubmit(async (formData: FormData) => {
    if (activeFormIndex === null) return;
    const deskDir = await desktopDir();
    formData.dia = data[activeFormIndex].dia;
    formData.mes = data[activeFormIndex].mes;
    formData.anio = data[activeFormIndex].anio;

    const fileName = `ingresos-${formData.mes}-${formData.anio}.json`;
    const route = await join(
      deskDir,
      `el-rodeo-app/src/files/revenue/${fileName}`
    );

    const updatedData = data.map((item, index) =>
      index === activeFormIndex ? { ...item, ...formData } : item
    );
    setData(updatedData);

    setSelectedMonthData(updatedData);

    const jsonStr = JSON.stringify(updatedData, null, 2);
    await writeTextFile(route, jsonStr);

    // Reset the form
    setActiveFormIndex(null);
  });

  const handleExpenseMod = handleSubmit(async (formData: FormData) => {
    if (activeFormIndex === null) return;

    const deskDir = await desktopDir();
    formData.dia = data[activeFormIndex].dia;
    formData.mes = data[activeFormIndex].mes;
    formData.anio = data[activeFormIndex].anio;

    const fileName = `gastos-${formData.mes}-${formData.anio}.json`;
    const route = await join(
      deskDir,
      `el-rodeo-app/src/files/expense/${fileName}`
    );

    const updatedData = data.map((item, index) =>
      index === activeFormIndex ? { ...item, ...formData } : item
    );

    setData(updatedData);

    setSelectedExpenseMonthData(updatedData);

    const jsonStr = JSON.stringify(updatedData, null, 2);
    await writeTextFile(route, jsonStr);

    // Reset the form
    setActiveFormIndex(null);
  });

  return (
    <ul className="inline-flex flex-col w-full gap-2 rounded-md ">
      {monthData.map((e: any, i: number) => (
        <li
          key={i}
          className="flex flex-col rounded-lg py-2 px-4 bg-gradient-to-b from-zinc-900 to-zinc-900 "
        >
          <div className="py-2">
            <h3 className="text-zinc-300 font-semibold">
              {e.dia} / {e.mes} / {e.anio}
            </h3>
          </div>

          {revenue && (
            <div>
              {activeFormIndex !== i ? (
                <div className="flex justify-evenly items-center py-2 flex-wrap">
                  <span className="flex items-center gap-1 font-bold text-zinc-100">
                    <i className="text-red-500">
                      <GrCut />
                    </i>
                    {e.cortes}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-green-400">
                    <i>
                      <FiDollarSign />
                    </i>
                    {e.ingresos}
                  </span>
                  <div>
                    <button
                      className=" 
                      text-zinc-800 bg-zinc-100 hover:bg-red-500 hover:text-zinc-100 px-2 py-1 rounded-2xl font-semibold flex items-center gap-1 outline-none transition-all duration-300"
                      onClick={() => toggleExpenseForm(i)}
                    >
                      <i>
                        <LuPencil />
                      </i>
                      Modificar
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  action=""
                  onSubmit={handleRevenueMod}
                  className="flex flex-col gap-2"
                >
                  <RevenueRegisterInputForm
                    name="ingresos"
                    placeholder="Ingresar monto"
                    register={register}
                    type="number"
                    valueAsNumber={true}
                    defaultValue={e.ingresos}
                    icon={<FiDollarSign />}
                  />
                  <p className="text-zinc-100 font-semibold">
                    {errors.ingresos?.message}
                  </p>

                  <RevenueRegisterInputForm
                    type="number"
                    name="cortes"
                    placeholder="Ingrese cortes"
                    register={register}
                    defaultValue={e.cortes}
                    valueAsNumber={true}
                    icon={<GrCut />}
                  />

                  <div className="flex justify-evenly py-2 items-center">
                    <div>
                      <button
                        className=" 
                      text-zinc-800 bg-zinc-100 hover:bg-red-500 hover:text-zinc-100 px-2 py-1 rounded-2xl font-semibold flex items-center gap-1 outline-none transition-all duration-300"
                        type="submit"
                      >
                        <i>
                          <LuPencil />
                        </i>
                        Modificar
                      </button>
                    </div>
                    <div >
                      <button
                        onClick={() => toggleExpenseForm(i)}
                        className="text-red-400 font-semibold"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}

          {expense && (
            <div>
              {activeFormIndex !== i ? (
                <div className="flex justify-evenly flex-col gap-2 py-2 ">
                  <span className="flex items-center gap-1 font-bold text-red-400">
                    <i>
                      <FiDollarSign />
                    </i>
                    {e.ingresos}
                  </span>
                  <span className="flex items- gap-1 font-semibold text-zinc-200 text-wrap-custom overflow-y-scroll scroll-abrir-tarjeta ">
                    {e.descripcion}
                  </span>
                  <button
                    className=" text-zinc-800 bg-zinc-100 hover:bg-red-500 hover:text-zinc-100 px-2 py-1 rounded-2xl font-semibold flex items-center gap-1 outline-none transition-all duration-300"
                    onClick={() => toggleExpenseForm(i)}
                  >
                    <i>
                      <LuPencil />
                    </i>
                    Modificar
                  </button>
                </div>
              ) : (
                <form
                  action=""
                  onSubmit={handleExpenseMod}
                  className="flex flex-col gap-2"
                >
                  <CustomExpenseInputForm
                    name="ingresos"
                    defaultValue={e.ingresos}
                    type="number"
                    register={register}
                    placeholder="Ingresa el nuevo valor"
                  />
                  <CustomExpenseDescripcion
                    name="descripcion"
                    defaultValue={e.descripcion}
                    placeholder="Ingresa descripcion si es necesario"
                    register={register}
                  />
                  <div className="flex justify-evenly py-2">
                    <button
                      className=" text-zinc-50 bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded-2xl font-semibold 
                        flex items-center gap-1 outline-none"
                      type="submit"
                    >
                      <i>
                        <LuPencil />
                      </i>
                      Modificar
                    </button>
                    <button
                      onClick={() => toggleExpenseForm(i)}
                      className="text-red-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RegisterList;
