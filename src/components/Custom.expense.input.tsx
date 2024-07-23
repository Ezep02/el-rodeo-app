import { FormFieldProps } from "../types/Custom.form.types";

export const CustomExpenseInputForm: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  valueAsNumber,
  icon,
  defaultValue
}) => {
  return (
    <div className="flex bg-neutral-900 p-2 items-center  rounded-lg gap-2 shadow-md">
      <i className="text-red-500">{icon}</i>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, {
          valueAsNumber: valueAsNumber,
        })}
        defaultValue={defaultValue}
        className="w-full outline-none text-zinc-100 placeholder-neutral-400 bg-transparent"
      />
    </div>
  );
};

export const CustomExpenseDescripcion: React.FC<FormFieldProps> = ({
  placeholder,
  name,
  register,
}) => {
  return (
    <div className="flex bg-neutral-900 p-2 items-center  rounded-lg gap-2 shadow-md">
      <textarea
        defaultValue=""
        placeholder={placeholder}
        {...register(name)}
        className="p-2 w-full h-full resize-none outline-none rounded-md bg-transparent text-zinc-50 scroll-abrir-tarjeta "
        rows={4}
      
      />
    </div>
  );
};
