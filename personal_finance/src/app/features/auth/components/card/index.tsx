import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

interface CardTextProps {
    text: string;
}

export const Card: React.FC<CardProps> = ({
    children
}: CardProps) => {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            {children}
        </div>
    )
}

export const CardHeader: React.FC<CardProps> = ({
    children
}: CardProps) => {
    return (
        <div className="flex flex-col space-y-1.5 p-6">
            {children}
        </div>
    )
}

export const CardTitle: React.FC<CardTextProps> = ({
    text
}: CardTextProps) => {
    return (
        <div className="text-2xl font-semibold leading-none tracking-tight">
            {text}
        </div>
    )
}

export const CardDescription: React.FC<CardTextProps> = ({
    text
}: CardTextProps) => {
    return (
        <div className="text-sm text-muted-foreground">
            {text}
        </div>
    )
}

export const CardContent: React.FC<CardProps> = ({
    children
}: CardProps) => {
    return (
        <div className="p-6 pt-0">
            {children}
        </div>
    )
}

