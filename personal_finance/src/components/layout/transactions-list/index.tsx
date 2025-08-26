"use client"

import { useEffect, useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { Transacao } from "@/feautures/transaction/types/transacao"
import { useTransacaoService } from "@/feautures/transaction/services/transacao.service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionFormDialog } from "../transaction-form-dialog"

interface TransactionListProps {
  userId: string
  userEmail: string
  filters: {
    month?: string
    type?: string
    category?: string
  }
}

/**
 *  Lista as transações do usuário autenticado
 */
export const TransactionList: React.FC<TransactionListProps> = ({ userId, userEmail, filters }) => {
  const { getTransactionsByAuthenticated, remove, update } = useTransacaoService()
  const [transactions, setTransactions] = useState<Transacao[]>([])
  const [loading, setLoading] = useState(true)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transacao | null>(null)
  const [formData, setFormData] = useState({
    descricao: "",
    valor: 0,
    tipo: "RECEITA" as "RECEITA" | "DESPESA",
    categoria: "",
    data: ""
  })

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    getTransactionsByAuthenticated(userId)
      .then((res) => setTransactions(res))
      .finally(() => setLoading(false))
  }, [userId])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (filters.month && transaction.data.substring(0, 7) !== filters.month) return false
      if (filters.type && transaction.tipo !== filters.type) return false
      if (filters.category && transaction.categoria?.nome !== filters.category) return false
      return true
    })
  }, [transactions, filters])

  if (loading) {
    return <p>Carregando transações...</p>
  }

  if (filteredTransactions.length === 0) {
    return <p>Nenhuma transação encontrada</p>
  }

  const onDelete = async (id: string) => {
    if (!id) return

    try {
      await remove(id)
      setTransactions((prev) => prev.filter((t) => t.id !== id))
    } catch (error) {
      console.error("Erro ao deletar transação:", error)
    }
  }

  const onEdit = (transaction: Transacao) => {
    setEditingTransaction(transaction)
    setFormData({
      descricao: transaction.descricao,
      valor: transaction.valor,
      tipo: transaction.tipo,
      categoria: transaction.categoria?.nome || "",
      data: transaction.data
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setEditingTransaction(null)
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
    if (!editingTransaction) return 

      try {
          const updatedTransaction = await update(editingTransaction.id, {
          ...editingTransaction,
          descricao: formData.descricao,
          valor: formData.valor,
          tipo: formData.tipo,
          categoria: { nome: formData.categoria },
          data: formData.data,
          emailUsuario: userEmail
          })

          setTransactions(prev =>
          prev.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t))
          )
      } catch (error) {
          console.error("Erro ao atualizar transação:", error)
      } finally {
          setIsDialogOpen(false)
          resetForm()
      }
  }


  return (
    <Card>
        <CardHeader>
            <CardTitle>Lançamentos</CardTitle>
            <CardDescription>
                List de todas as transações financeiras
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-4 flex justify-end">
                <TransactionFormDialog
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    formData={formData}
                    setFormData={setFormData}
                    editingTransaction={!!editingTransaction}
                    handleSubmit={handleSubmit}
                    resetForm={resetForm}
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="text-gray-600">Data</TableHead>
                    <TableHead className="text-gray-600" >Descrição</TableHead>
                    <TableHead className="text-gray-600" >Categoria</TableHead>
                    <TableHead className="text-gray-600" >Tipo</TableHead>
                    <TableHead className="text-right text-gray-600">Valor</TableHead>
                    <TableHead className="text-right text-gray-600">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.data).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{transaction.descricao}</TableCell>
                        <TableCell>{transaction.categoria?.nome}</TableCell>
                        <TableCell>
                            <Badge variant={transaction.tipo === "DESPESA" ? "destructive" : "default"}>
                                {transaction.tipo === "DESPESA" ? "Despesa" : "Receita"}
                            </Badge>

                        </TableCell>
                        <TableCell
                        className={`text-right font-medium ${
                            transaction.tipo === "RECEITA" ? "text-green-600" : "text-red-600"
                        }`}
                        >
                        {transaction.tipo === "RECEITA" ? "+R$ " : "-R$ "}
                        {transaction.valor}
                        </TableCell>
                        <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(transaction)}>
                            <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                if (transaction.id) {
                                onDelete(transaction.id)
                                }
                            }}
                            >
                            <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}
