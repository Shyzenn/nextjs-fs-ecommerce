import { TProductSchema } from "@/lib/types";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  register: ReturnType<UseFormRegister<TProductSchema>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  type: string;
  inputId: string;
  placeholder: string;
  className: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  register,
  onChange,
  type,
  inputId,
  placeholder,
  className,
}) => {
  return (
    <>
      <input
        {...register}
        onChange={onChange}
        value={value}
        type={type}
        id={inputId}
        placeholder={placeholder}
        className={className}
      />
    </>
  );
};

export default InputField;
