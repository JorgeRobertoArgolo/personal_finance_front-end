"use client";

import { Header } from "@/components/layout/header"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CardSummary } from "@/components/layout/card-summary";
import { CalendarIcon, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { TransactionList } from "@/components/layout/transactions-list";
import { useTransacaoService } from "@/feautures/transaction/services/transacao.service";
import { Loader } from "@/components/layout/loader";

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
        useState<{nome: string; email: string; id: string} | null>(null);

    {/**Cálculo para os resumos */}
    const { getTransactionsByAuthenticated } = useTransacaoService()
    const [total, setTotal] = useState(0)
    const [totalDespesas, setTotalDespesas] = useState(0)
    const [totalReceitas, setTotalReceitas] = useState(0)

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

    {/**Cálculo para os resumos */}
    useEffect(() => {
        const fetchData = async () => {
            const data = await getTransactionsByAuthenticated(usuario.id)

            // total de transações
            setTotal(data.length)

            // total de despesas
            const despesas = data
                .filter(t => t.tipo === "DESPESA")
                .reduce((acc, t) => acc + t.valor, 0)
                setTotalDespesas(despesas)

            // total de receitas
            const receitas = data
                .filter(t => t.tipo === "RECEITA")
                .reduce((acc, t) => acc + t.valor, 0)
                setTotalReceitas(receitas)
        }

        fetchData()
    }, [usuario?.id, getTransactionsByAuthenticated])

    //Loader (Carregando)
    if (!usuario) {
        return (
            <Loader />
        )
    }

    //Sair da conta
    const logout = () => {
        localStorage.removeItem("usuarioLogado");
        router.push("/login");
    }


    return (
        <div className="container mx-auto p-4 space-y-6">
            <Header nome={usuario.nome}email={usuario.email} logout={logout} userEmail={usuario.email} />

            {/**Resumo da situação financeira */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <CardSummary title="Saldo Atual" 
                             icon={<Wallet className="h-4 w-4 text-muted-foreground"/>}
                             className={(totalReceitas - totalDespesas) >= 0 ? "text-green-600" : "text-red-600"} 
                             value={'R$ ' + (totalReceitas - totalDespesas).toString()}
                             />

                <CardSummary title="Receitas" 
                             icon={<TrendingUp className="h-4 w-4 text-green-600" />}
                             className="text-green-600" 
                             value={'R$ ' + totalReceitas.toString()}
                             />
                             
                <CardSummary title="Despesas"
                             icon={<TrendingDown className="h-4 w-4 text-red-600" />}
                             className="text-red-600" 
                             value={'R$ ' + totalDespesas.toString()}
                             />
                <CardSummary title="Transações"
                             icon={<CalendarIcon className="h-4 w-4 text-muted-foreground" />}
                             value={total.toString()}
                             />
            </div>

            {/**
             * Tabs com 2 seções a com a listagem das transações
             * E a outra com os gráficos
             */}
            <Tabs defaultValue="transactions" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="transactions">
                        Lançamentos
                    </TabsTrigger>
                    <TabsTrigger value="charts">
                        Gráficos
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="transactions">
                    <TransactionList userId={usuario.id} userEmail={usuario.email} />
                </TabsContent>
            </Tabs>
        </div>
    )
}