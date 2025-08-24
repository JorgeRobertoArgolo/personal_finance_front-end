import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardSummaryProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

/**
 * Model para os Cards de resumos da situação
 */
export const CardSummary: React.FC<CardSummaryProps> = ({
    title,
    value,
    icon
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
                <div className="text-2x1 font-bold">
                    {value}
                </div>
            </CardContent>
        </Card>
    )
}