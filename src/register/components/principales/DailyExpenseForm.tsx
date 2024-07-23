import React, { useEffect } from "react";
//Tauri depdendencies
import { exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
//Context api
import UserContext from "../../../context/User.context.api";
//icons
import { FiDollarSign } from "react-icons/fi";
//React hook form
import { useForm } from "react-hook-form";
//
import { ExpenseFormSchema, FormData } from "../../../types/Custom.form.types";
//Custom input
import {
  CustomExpenseDescripcion,
  CustomExpenseInputForm,
} from "../../../components/Custom.expense.input";

//Zod dependencie
import { zodResolver } from "@hookform/resolvers/zod";
//Custom Success and Error Form handlers
import OnSuccessForm from "../../../components/OnSuccessForm";
import OnErrorForm from "../../../components/OnErrorForm";

const DailyExpenseForm = () => {
  const {
    expenseFormError,
    setExpenseFormError,
    expenseFormSuccess,
    setExpenseFormSuccess,
  } = React.useContext(UserContext)!;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(ExpenseFormSchema),
  });

  const RegisterExpense = handleSubmit(async (data: FormData) => {
    //abosulte path

    const deskDir = await desktopDir();

    const newDay = new Date().getDate();
    const newMonth = new Date().getMonth() + 1;
    const newYear = new Date().getFullYear();

    const fileName = `gastos-${newMonth}-${newYear}.json`;

    const route = await join(
      deskDir,
      `el-rodeo-app/src/files/expense/${fileName}`
    );

    data.dia = newDay;
    data.mes = newMonth;
    data.anio = newYear;

    const { dia, mes } = data;

    // Verificar si el archivo existe
    if (await exists(route)) {
      try {
        // Asume que existentFile es una cadena que contiene los datos JSON
        const existentFile: string = await readTextFile(route);

        // Parsear el contenido existente
        let existentFileData = JSON.parse(existentFile) as FormData[];

        // Verificar si newValue ya existe en el array
        const exists = existentFileData.some(
          (e: FormData) => e.dia === dia && e.mes === mes
        );

        if (exists) {
          throw new Error(`El registro del dia ${dia}/${mes} ya existe.`);
        }

        existentFileData.push(data);
        // Escribir el contenido actualizado de vuelta al archivo
        const jsonStr = JSON.stringify(existentFileData, null, 2);
        await writeTextFile(route, jsonStr);
        setExpenseFormSuccess((prevSuccess) => [
          ...prevSuccess,
          {
            message: `Registro ${dia}/${mes} creado correctamente`,
          },
        ]);
        reset({
          ingresos: "",
          descripcion: "",
        });
      } catch (error: any) {
        setExpenseFormError((prevErrors) => [
          ...prevErrors,
          { message: error.message || error },
        ]);
      }
    } else {
      // Si el archivo no existe, crearlo con un array que contenga el nuevo valor
      const jsonStr = JSON.stringify([data], null, 2);
      await writeTextFile(route, jsonStr);
      reset({
        ingresos: "",
        descripcion: "",
      });

      //una vez concetrado se le muestra al usuario el mensaje de success
      setExpenseFormSuccess((prevSuccess) => [
        ...prevSuccess,
        {
          message: `Registro ${dia}/${mes} creado correctamente`,
        },
      ]);
    }
  });

  //limpia los errores
  useEffect(() => {
    if (expenseFormError.length > 0 || expenseFormSuccess.length > 0) {
      const timer = setTimeout(() => {
        setExpenseFormError([]);
        setExpenseFormSuccess([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [expenseFormError, expenseFormSuccess]);

  return (
    <form
      className="flex flex-col h-4/5 w-4/5 sm:h-4/5 sm:w-4/5 md:h-4/5 md:w-4/5
        rounded-xl shadow-2xl lg:w-2/4 lg:h-2/4 gap-3 p-4 justify-center
        shadow-zinc-900 backdrop-blur-sm xl:w-1/4"
      onSubmit={RegisterExpense}
    >
      <div className="inline-flex">
        <h2 className="text-neutral-200 font-bold">Cargar gastos</h2>
      </div>

      <div className="flex flex-col gap-1">
        <CustomExpenseInputForm
          name="ingresos"
          placeholder="Ingrese el gasto"
          register={register}
          type="number"
          icon={<FiDollarSign />}
          valueAsNumber={true}
        />
        <p className="text-zinc-100 font-semibold">
          {errors.ingresos?.message}
        </p>

        <CustomExpenseDescripcion
          name="descripcion"
          placeholder="Si es necesario agrega una descripcion"
          register={register}
          defaultValue=""
        />
        <p className="text-zinc-100 font-semibold">
          {errors.descripcion?.message}
        </p>
      </div>

      {expenseFormError.length > 0 ? (
        <OnErrorForm onErrorProp={expenseFormError} />
      ) : (
        expenseFormSuccess.length > 0 && (
          <OnSuccessForm onSuccessProp={expenseFormSuccess} />
        )
      )}
      <div className="py-1">
        <button
          className="bg-amber-50 text-zinc-800 p-1 font-semibold rounded-md w-full hover:bg-red-500
              transition-all duration-300 hover:text-zinc-100"
          type="submit"
        >
          Registrar gastos
        </button>
      </div>
    </form>
  );
};

export default DailyExpenseForm;
