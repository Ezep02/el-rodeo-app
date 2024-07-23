import React, { useEffect } from "react";
//Tauri dependencies
import { exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
//React icons
import { FiDollarSign } from "react-icons/fi";
import { GrCut } from "react-icons/gr";
import { BsCalendarWeek } from "react-icons/bs";
//Context Api
import UserContext from "../../../context/User.context.api";
//react hook form
import { useForm } from "react-hook-form";
//custom Input
import CustomRegisterInputForm from "../../../components/Custom.register.input";
//Custom form arquitecture
import { FormData, CustomFormSchema } from "../../../types/Custom.form.types";
//Zod dependencie
import { zodResolver } from "@hookform/resolvers/zod";
//Custom Success and Error Form handlers
import OnSuccessForm from "../../../components/OnSuccessForm";
import OnErrorForm from "../../../components/OnErrorForm";

const CustomRevenueForm = () => {
  const {
    customRevenueFormError,
    setCustomRevenueFormError,
    customRevenueFormSuccess,
    setCustomRevenueFormSuccess,
  } = React.useContext(UserContext)!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CustomFormSchema),
  });

  const RegisterCustomDay = handleSubmit(async (data: FormData) => {
    const { dia, mes } = data;

    const date = new Date();
    const newAnio = date.getFullYear();
    data.anio = newAnio;

    const deskDir = await desktopDir();
    const fileName = `ingresos-${mes}-${date.getFullYear()}.json`;
    //abosulte path
    const route = await join(
      deskDir,
      `el-rodeo-app/src/files/revenue/${fileName}`
    );

    // Verificar si el archivo existe
    if (await exists(route)) {
      try {
        // Se lee el archivo desde la ruta especificada
        const existentFile: string = await readTextFile(route);

        // Parsear el contenido existente
        let existentFileData = JSON.parse(existentFile) as FormData[];

        // Verifica si el dia ya se encuentra cargado
        const exists = existentFileData.some(
          (e: FormData) => e.dia === dia && e.mes === mes
        );

        if (exists) {
          throw new Error(`El registro del dia ${dia}/${mes} ya existe.`);
        }

        //Se carga el nuevo valor al registro
        existentFileData.push(data);

        // Escribir el contenido actualizado de vuelta al archivo
        const jsonStr = JSON.stringify(existentFileData, null, 2);
        await writeTextFile(route, jsonStr);
        // Se instancia OnSucces
        setCustomRevenueFormSuccess((prevSuccess) => [
          ...prevSuccess,
          {
            message: `Registro ${dia}/${mes} creado correctamente`,
          },
        ]);
        reset({
          ingresos: "",
          cortes: "",
          dia: "",
          mes: "",
        });
      } catch (error: any) {
        setCustomRevenueFormError((prevErrors) => [
          ...prevErrors,
          { message: error.message || error },
        ]);
      }
    } else {
      // si no existe, lo crea
      const jsonStr = JSON.stringify([data], null, 2);
      await writeTextFile(route, jsonStr);
      reset({
        ingresos: "",
        cortes: "",
        dia: "",
        mes: "",
      });
      //se crea, y muestra un success
      setCustomRevenueFormSuccess((prevSuccess) => [
        ...prevSuccess,
        {
          message: `Registro ${dia}/${mes} creado correctamente`,
        },
      ]);
    }
  });

  // limpia los Form handlers
  useEffect(() => {
    if (
      customRevenueFormError.length > 0 ||
      customRevenueFormSuccess.length > 0
    ) {
      const timer = setTimeout(() => {
        setCustomRevenueFormError([]);
        setCustomRevenueFormSuccess([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [customRevenueFormError, customRevenueFormSuccess]);

  return (
    <form
      action=""
      className="flex flex-col gap-3"
      onSubmit={RegisterCustomDay}
    >
      <article className="flex flex-col gap-2">
        <div className="flex gap-1 ">
          <div className="flex flex-col gap-1 w-full">
            <CustomRegisterInputForm
              type="number"
              placeholder="Ingresar monto"
              name="ingresos"
              register={register}
              valueAsNumber={true}
              icon={<FiDollarSign />}
            />
            <p className="text-zinc-100 font-semibold">
              {errors.ingresos?.message}
            </p>

            <CustomRegisterInputForm
              type="number"
              placeholder="Ingresar cortes"
              name="cortes"
              register={register}
              valueAsNumber={true}
              icon={<GrCut />}
            />

            <p className="text-zinc-100 font-semibold">
              {errors.cortes?.message}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <CustomRegisterInputForm
              type="number"
              placeholder="Ingrese dia"
              name="dia"
              register={register}
              valueAsNumber={true}
              icon={<BsCalendarWeek />}
            />

            <p className="text-zinc-100 font-semibold">
              {" "}
              {errors.dia?.message}
            </p>

            <CustomRegisterInputForm
              type="number"
              placeholder="Ingrese mes"
              register={register}
              name="mes"
              valueAsNumber={true}
              icon={<BsCalendarWeek />}
            />
            <p className="text-zinc-100 font-semibold">
              {" "}
              {errors.mes?.message}
            </p>
          </div>
        </div>

        {customRevenueFormError.length > 0 ? (
          <OnErrorForm onErrorProp={customRevenueFormError} />
        ) : (
          customRevenueFormSuccess.length > 0 && (
            <OnSuccessForm onSuccessProp={customRevenueFormSuccess} />
          )
        )}
        <div className="py-1">
          <button
            className="bg-amber-50 text-zinc-800 p-1 font-semibold rounded-md w-full hover:bg-red-500
              transition-all duration-300 hover:text-zinc-100"
            type="submit"
          >
            Registrar dia
          </button>
        </div>
      </article>
    </form>
  );
};

export default CustomRevenueForm;
