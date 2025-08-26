"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Plus } from "lucide-react";
import { TransactionFormDialog } from "../transaction-form-dialog";
import { useTransacaoService } from "@/feautures/transaction/services/transacao.service";
import { useState } from "react";

interface HeaderProps {
    nome?: string
    email?: string
    logout?: () => void
    userEmail: string
}

//Header do usuário autenticado
export const Header: React.FC<HeaderProps> = ({
    nome,
    email,
    logout, 
    userEmail
}) => {
    const { save } = useTransacaoService()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [formData, setFormData] = useState({
        descricao: "",
        valor: 0,
        tipo: "RECEITA" as "RECEITA" | "DESPESA",
        categoria: "",
        data: ""
      })
      
    const resetForm = () => {
        setFormData({
        descricao: "",
        valor: 0,
        tipo: "RECEITA",
        categoria: "",
        data: ""
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const updatedTransaction = await save({
                descricao: formData.descricao,
                valor: formData.valor,
                tipo: formData.tipo,
                categoria: { nome: formData.categoria },
                data: formData.data,
                emailUsuario: userEmail
            })
        } catch (error) {
            console.error("Erro ao salvar transação:", error)
        } finally {
            setIsDialogOpen(false)
            resetForm()
        }
    }

    return (
        <>
            <div className="mb-4 flex justify-end">
                <TransactionFormDialog
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    formData={formData}
                    setFormData={setFormData}
                    editingTransaction={false}
                    handleSubmit={handleSubmit}
                    resetForm={resetForm}
                />
            </div>   
            <header className="flex items-center justify-between">
                <h1 className="text-3x1 font-bold">
                    Gestão Financeira
                </h1>
                <div className="flex items-center gap-4">
                <Button variant="default" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Transação
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant ="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar className="bg-gray-200 p-6">
                                <AvatarFallback>
                                    {nome ?.split(" ")[0].charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {nome}
                            </p>
                            <p className="text-xs text-muted-foreground text-gray-500">
                                {email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 hover:text-black hover:border hover:border-black hover:bg-transparent transition-colors duration-200">
                        <LogOut className="w-4 h-4 mr-2 " />
                        <span>Sair</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </header>
        </>
    );
}
