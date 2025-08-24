"use client";

import { Header } from "@/components/layout/header"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CardSummary } from "@/components/layout/card-summary";
import { CalendarIcon, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "@/components/layout/filter";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { TransactionList } from "@/components/layout/transactions-list";

export default function UserPage() {
    return (
        <>
            <DashboardUser />
        </>
    )
}

//Dashboard do usuário autenticado
export const DashboardUser: React.FC = () => {

    //testes
    const availableMonths = ["2025-01", "2025-02", "2025-03"];
    const [filters, setFilters] = useState({
        month: "",
        type: "",
        category: "",
    })

    const categories = {
    income: ["Salário", "Freelance", "Investimentos", "Outros"],
    expense: ["Alimentação", "Transporte", "Moradia", "Saúde", "Educação", "Lazer", "Outros"],
    }

    //fim testes

    const router = useRouter();
    const [usuario, setUsuario] = 
        useState<{nome: string; email: string; id: string} | null>(null);

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

            {/**Resumo da situação financeira */}
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

            <Card>
                <CardHeader>
                    <CardTitle>Filtros</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Filter
                            title="Mês"
                            value={filters.month}
                            placeholder="Todos os meses"
                            options={[
                                { value: "all", label: "Todos os meses" },
                                ...availableMonths.map((month) => ({
                                value: month,
                                label: new Date(month + "-01").toLocaleDateString("pt-BR", {
                                    month: "long",
                                    year: "numeric",
                                }),
                                })),
                            ]}
                            onChange={(value) => setFilters((prev) => ({ ...prev, month: value }))}
                            />

                            <Filter
                                title="Tipo"
                                value={filters.type}
                                placeholder="Todos os tipos"
                                options={[
                                { value: "all", label: "Todos os tipos" },
                                { value: "income", label: "Receitas" },
                                { value: "expense", label: "Despesas" },
                                ]}
                                onChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
                            />

                            <Filter
                                title="Categoria"
                                value={filters.category}
                                placeholder="Todas as categorias"
                                options={[
                                { value: "all", label: "Todas as categorias" },
                                ...[...categories.income, ...categories.expense].map((category) => ({
                                    value: category,
                                    label: category,
                                })),
                                ]}
                                onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                            />
                    </div>
                </CardContent>
            </Card>
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
                    <TransactionList userId={usuario.id} filters={filters} userEmail={usuario.email} />
                </TabsContent>
            </Tabs>
        </div>
    )
}