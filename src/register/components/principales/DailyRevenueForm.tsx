import { useEffect, useContext } from "react";
//Tauri dependencies
import { exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
//React icons
import { FiDollarSign } from "react-icons/fi";
import { GrCut } from "react-icons/gr";
//Context Api
import UserContext from "../../../context/User.context.api";
// React hook form
import { useForm } from "react-hook-form";
//Custom form arquitecture
import { RevenueFormSchema, FormData } from "../../../types/Custom.form.types";
//Zod dependencie
import { zodResolver } from "@hookform/resolvers/zod";
//Custom Success and Error Form handlers
import OnSuccessForm from "../../../components/OnSuccessForm";
import OnErrorForm from "../../../components/OnErrorForm";
//Custom Input
import RevenueRegisterInputForm from "../../../components/Custom.register.input";

const DailyRevenueForm = () => {
  const {
    revenueFormError,
    setRevenueFormError,
    revenueFormSuccess,
    setRevenueFormSuccess,
  } = useContext(UserContext)!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(RevenueFormSchema),
  });

  const RegisterRevenue = handleSubmit(async (data: FormData) => {
    //abosulte path
    const deskDir = await desktopDir();

    const date = new Date();
    const newAnio = date.getFullYear();
    const newDay = date.getDate();
    const newMonth = date.getMonth() + 1;

    data.anio = newAnio;
    data.dia = newDay;
    data.mes = newMonth;

    const { dia, mes } = data;

    const fileName = `ingresos-${newMonth}-${newAnio}.json`;

    const route = await join(
      deskDir,
      `el-rodeo-app/src/files/revenue/${fileName}`
    );

    // Verificar si el archivo existe
    if (await exists(route)) {
      try {
        // Si existe, se lee el archivo desde la ruta especificada
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
        setRevenueFormSuccess((prevSuccess) => [
          ...prevSuccess,
          {
            message: `Registro ${dia}/${mes} creado correctamente`,
          },
        ]);

        reset({
          ingresos: "",
          cortes: "",
        });
      } catch (error: any) {
        setRevenueFormError((prevErrors) => [
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
        cortes: "",
      });
      //una vez concetrado se le muestra al usuario el mensaje de success
      setRevenueFormSuccess((prevSuccess) => [
        ...prevSuccess,
        {
          message: `Registro ${dia}/${mes} creado correctamente`,
        },
      ]);
    }
  });

  //limpia los errores
  useEffect(() => {
    if (revenueFormError.length > 0 || revenueFormSuccess.length > 0) {
      const timer = setTimeout(() => {
        setRevenueFormError([]);
        setRevenueFormSuccess([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [revenueFormError, revenueFormSuccess]);

  return (
    <form
      action=""
      className="flex flex-col h-full w-full sm:h-1/2 sm:w-1/2 md:h-1/2 md:w-1/2
        rounded-xl shadow-2xl lg:w-1/4 lg:h-1/2 gap-3 p-4 justify-center
        shadow-zinc-900 backdrop-blur-sm
       "
      onSubmit={RegisterRevenue}
    >
      <div className="inline-flex">
        <h2 className="text-zinc-100 font-bold">Cargar ingresos</h2>
      </div>

      <div className="flex flex-col gap-1">
        <RevenueRegisterInputForm
          name="ingresos"
          placeholder="Ingresar monto"
          register={register}
          type="number"
          valueAsNumber={true}
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
          valueAsNumber={true}
          icon={<GrCut />}
        />
        <p className="text-zinc-100 font-semibold">{errors.cortes?.message}</p>
        {revenueFormError.length > 0 ? (
          <OnErrorForm onErrorProp={revenueFormError} />
        ) : (
          revenueFormSuccess.length > 0 && (
            <OnSuccessForm onSuccessProp={revenueFormSuccess} />
          )
        )}
        <div className="py-1">
          <button
            className="bg-amber-50 text-zinc-800 p-1 font-semibold rounded-md w-full hover:bg-red-500
              transition-all duration-300 hover:text-zinc-100
            "
            type="submit"
          >
            Registrar ingresos
          </button>
        </div>
      </div>
    </form>
  );
};

export default DailyRevenueForm;
