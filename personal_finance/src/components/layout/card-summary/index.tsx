import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardSummaryProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    className?: string;
}

/**
 * Componente para os cards de resumo da situação financeira
 */
export const CardSummary: React.FC<CardSummaryProps> = ({
    title,
    value,
    icon,
    className
}) => {
    return (
        <Card className={className}>
            <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {value}
                </div>
            </CardContent>
        </Card>
    )
}
