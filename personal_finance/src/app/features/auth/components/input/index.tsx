import { cn } from "@/common/util/utils";
import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
    id: string;
    placeholder: string;
}

export const Input: React.FC<InputProps> = ({
    type,
    id,
    placeholder,
    className
}: InputProps) => {

    return (            
        <input type={type} name={type} id={id} 
                placeholder={placeholder}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className
                )}/>
    )
}