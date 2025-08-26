import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardSummaryProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    className?: string;
}

/**
 * Model para os Cards de resumos da situação
 */
export const CardSummary: React.FC<CardSummaryProps> = ({
    title,
    value,
    icon,
    className
}) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className={`text-2x1 font-bold ${className ?? ""}`}>
                    {value}
                </div>
            </CardContent>
        </Card>
    )
}