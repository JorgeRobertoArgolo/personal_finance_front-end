"use client";

import { Header } from "@/components/layout/header"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CardSummary } from "@/components/layout/card-summary";
import { CalendarIcon, TrendingDown, TrendingUp, Wallet } from "lucide-react";

export default function UserPage() {
    return (
        <>
            <DashboardUser />
        </>
    )
}

//Dashboard do usuário autenticado
export const DashboardUser: React.FC = () => {
    const router = useRouter();
    const [usuario, setUsuario] = 
        useState<{nome: string; email: string} | null>(null);

    useEffect(() => {
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (usuarioLogado) {
            try {
                const usuarioParse = JSON.parse(usuarioLogado);
                setUsuario(usuarioParse);
            } catch (error) {
                console.error("Erro ao parsear usuário logado:", error);
                // Limpar o localStorage se houver erro
                localStorage.removeItem("usuarioLogado");
                router.push("/login");
            }
        } else {
            //Redirecionar para a página de login se não estiver autenticado
            router.push("/login");
        }
    }, [router]);

    if (!usuario) {
        //TODO: Colocar um loading spinner aqui
        return null; 
    }

    const logout = () => {
        localStorage.removeItem("usuarioLogado");
        router.push("/login");
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Header nome={usuario.nome}email={usuario.email} logout={logout}/>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/**
                 * TODO: balance >= 0 ? "text-green-600" : "text-red-600"
                 */}
                <CardSummary title="Saldo Atual" 
                             icon={<Wallet className="h-4 w-4 text-muted-foreground"/>} 
                             value="0.00"
                             />

                <CardSummary title="Receitas" 
                             icon={<TrendingUp className="h-4 w-4 text-green-600" />}
                             value="0.00"
                             />
                             
                <CardSummary title="Despesas"
                             icon={<TrendingDown className="h-4 w-4 text-red-600" />}
                             value="0.00"
                             />
                <CardSummary title="Transações"
                             icon={<CalendarIcon className="h-4 w-4 text-muted-foreground" />}
                             value="0.00"/>
            </div>
        </div>
    )
}