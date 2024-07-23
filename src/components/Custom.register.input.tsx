import { FormFieldProps } from "../types/Custom.form.types";

const CustomRegisterInputForm: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  valueAsNumber,
  icon,
  defaultValue
}) => {
  return (
    <div className="flex items-center bg-neutral-900 p-2 rounded-lg gap-2 shadow-md">
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

export default CustomRegisterInputForm;
