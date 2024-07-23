import { useEffect, useContext } from "react";

import UserContext from "../../../context/User.context.api";

//icons
import { FiDollarSign } from "react-icons/fi";
import { BsCalendarWeek } from "react-icons/bs";
// React hook form
import { useForm } from "react-hook-form";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";

// OnSuccess and OnErrors handlers
import OnErrorForm from "../../../components/OnErrorForm";
import OnSuccessForm from "../../../components/OnSuccessForm";

// Custom input
import {
  CustomExpenseDescripcion,
  CustomExpenseInputForm,
} from "../../../components/Custom.expense.input";
import {
  CustomExpenseFormSchema,
  FormData,
} from "../../../types/Custom.form.types";
import { desktopDir, join } from "@tauri-apps/api/path";
import { exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";

const CustomExpenseForm = () => {
  const {
    customExpenseFormError,
    setCustomExpenseFormError,
    customExpenseFormSuccess,
    setCustomExpenseFormSuccess,
  } = useContext(UserContext)!;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(CustomExpenseFormSchema),
  });

  const RegisterCustomExpense = handleSubmit(async (data: FormData) => {
    //abosulte path

    const deskDir = await desktopDir();

    const { dia, mes } = data;

    const newYear = new Date().getFullYear();
    data.anio = newYear;

    const fileName = `gastos-${mes}-${newYear}.json`;

    const route = await join(
      deskDir,
      `el-rodeo-app/src/files/expense/${fileName}`
    );

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
        setCustomExpenseFormSuccess((prevSuccess) => [
          ...prevSuccess,
          {
            message: `Registro ${dia}/${mes} creado correctamente`,
          },
        ]);
        reset({
          ingresos: "",
          dia: "",
          mes: "",
          descripcion: "",
        });
      } catch (error: any) {
        setCustomExpenseFormError((prevErrors) => [
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
        dia: "",
        mes: "",
        descripcion: "",
      });

      //una vez concetrado se le muestra al usuario el mensaje de success
      setCustomExpenseFormSuccess((prevSuccess) => [
        ...prevSuccess,
        {
          message: `Registro ${dia}/${mes} creado correctamente`,
        },
      ]);
    }
  });

  //limpia los errores
  useEffect(() => {
    if (
      customExpenseFormError.length > 0 ||
      customExpenseFormSuccess.length > 0
    ) {
      const timer = setTimeout(() => {
        setCustomExpenseFormError([]);
        setCustomExpenseFormSuccess([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [customExpenseFormError, customExpenseFormSuccess]);

  return (
    <form
      action=""
      onSubmit={RegisterCustomExpense}
      className="flex flex-col gap-1"
    >
      <CustomExpenseInputForm
        name="ingresos"
        placeholder="Ingrese monto"
        register={register}
        icon={<FiDollarSign />}
        valueAsNumber={true}
      />
      <p className="text-neutral-100 font-semibold">
        {errors.ingresos?.message}
      </p>

      <div className="flex gap-1 ">
        <div className="w-full">
          <CustomExpenseInputForm
            icon={<BsCalendarWeek />}
            name="dia"
            placeholder="Ingrese dia"
            register={register}
            valueAsNumber={true}
          />
          <p className="text-neutral-100 font-semibold">
            {errors.dia?.message}
          </p>
        </div>

        <div>
          <CustomExpenseInputForm
            icon={<BsCalendarWeek />}
            name="mes"
            placeholder="Ingrese mes"
            register={register}
            valueAsNumber={true}
          />
          <p className="text-neutral-100 font-semibold">
            {errors.mes?.message}
          </p>
        </div>
      </div>

      <CustomExpenseDescripcion
        name="descripcion"
        placeholder="Si es necesario agrega una descripcion"
        register={register}
      />
      <p className="text-neutral-100 font-semibold">
        {errors.descripcion?.message}
      </p>

      {customExpenseFormError.length > 0 ? (
        <OnErrorForm onErrorProp={customExpenseFormError} />
      ) : (
        customExpenseFormSuccess.length > 0 && (
          <OnSuccessForm onSuccessProp={customExpenseFormSuccess} />
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

export default CustomExpenseForm;
