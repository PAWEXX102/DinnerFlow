import { InputFieldT } from "@/types/FormTypes"
import { twMerge } from "tailwind-merge";

const InputField = ({type, name, placeholder,label, register, error,className}:InputFieldT) => {
    return (
        <div className="my-2 flex flex-col">
            <input 
                {...register(name)}
                className={twMerge("border-2 outline-none font-medium focus:border-blue-100 bg-blue-50 p-4 rounded-xl border-white", error && "border-red-500", className)}
                type={type}
                name={name}
                autoComplete="off"
                placeholder={placeholder} 
                id={`field_${name}`}
            />
            {
                error && <span className=" text-red-500 py-1">{error.message}</span>
            }
        </div>
    )
};

export default InputField;