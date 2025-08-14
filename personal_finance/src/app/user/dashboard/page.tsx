"use client";

import { Header } from "@/components/layout/header"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function UserPage() {
    return (
        <>
            <DashboardUser />
        </>
    )
}

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
        </div>
    )
}