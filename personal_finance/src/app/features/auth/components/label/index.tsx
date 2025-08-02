import { cn } from "@/common/util/utils"

interface LabelProps {
    text: string
    htmlFor?: string
    className?: string
}

export const Label: React.FC<LabelProps> = ({
    text,
    htmlFor,
    className
}: LabelProps) => {
    return (
        <label 
        htmlFor={htmlFor}
        className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className
        )}>
            {text}
        </label>
    )
}