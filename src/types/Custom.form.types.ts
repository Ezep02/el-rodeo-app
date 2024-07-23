import { UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

//Form structure composition
export type FormData = {
  ingresos?: number | string;
  cortes?: number | string;
  dia?: number | string;
  mes?: number | string; 
  anio?: number | string;
  descripcion?: string;
};

//Form composition properties
export type FormFieldProps = {
  type?: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  valueAsNumber?: boolean;
  icon?: any;
  defaultValue?: any;
};

//Form valid names for Forms fields
export type ValidFieldNames =
  | "ingresos"
  | "cortes"
  | "dia"
  | "mes"
  | "descripcion";

export const CustomFormSchema: ZodType<FormData> = z.object({
  ingresos: z
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Ingresos debe ser un dato numerico",
    })
    .min(0,"No se permiten numeros negativos")
    .max(999999, "Ingresos debe ser menor a 999999"),

  cortes: z
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Cortes debe ser un dato numerico",
    })
    .min(0, "No se permiten numeros negativos")
    .max(999999, "El numero debe ser menor a 999999"),

  dia: z
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Dia debe ser un dato numerico",
    })
    .min(1, "Dia no puede ser menor a 1")
    .max(31, "Dia debe ser menor o igual a 31"),

  mes: z
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Mes debe ser un dato numerico",
    })
    .min(1, "Mes no puede ser menor a 1")
    .max(12, "Mes debe ser menor o igual a 12"),
});

export const RevenueFormSchema: ZodType<FormData> = z.object({
  ingresos: z
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Ingresos debe ser un dato numerico",
    })
    .min(0, "No se permiten numeros negativos")
    .max(999999, "Ingresos debe ser menor a 999999"),

  cortes: z
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Cortes debe ser un dato numerico",
    })
    .min(0, "No se permiten numeros negativos")
    .max(999999, "El numero debe ser menor a 999999"),
});

export const ExpenseFormSchema: ZodType<FormData> = z.object({
  ingresos: z
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Ingresos debe ser un dato numerico",
    })
    .min(0, "No se permiten numeros negativos")
    .max(999999, "Ingresos debe ser menor a 999999"),
  descripcion: z.string(),
});

export const CustomExpenseFormSchema: ZodType<FormData> = z.object({
  ingresos: z
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Ingresos debe ser un dato numerico",
    })
    .min(0, "No se permiten numeros negativos")
    .max(999999, "Ingresos debe ser menor a 999999"),
  descripcion: z.string(),
  dia: z
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Dia debe ser un dato numerico",
    })
    .min(1, "Dia no puede ser menor a 1")
    .max(31, "Dia debe ser menor o igual a 31"),

  mes: z
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Mes debe ser un dato numerico",
    })
    .min(1, "Mes no puede ser menor a 1")
    .max(12, "Mes debe ser menor o igual a 12"),
});
