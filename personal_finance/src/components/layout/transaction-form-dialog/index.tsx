"use client"

import { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface TransactionFormDialogProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  formData: {
    descricao: string
    valor: number
    tipo: "RECEITA" | "DESPESA"
    categoria: string
    data: string
  }
  setFormData: Dispatch<SetStateAction<typeof formData>>
  editingTransaction: boolean
  handleSubmit: (e: React.FormEvent) => void
  resetForm: () => void
}

/**
 * Formulário para atualização e cadastro de transações
 */
export const TransactionFormDialog: React.FC<TransactionFormDialogProps> = ({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
  editingTransaction,
  handleSubmit,
  resetForm
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingTransaction ? "Editar Lançamento" : "Novo Lançamento"}</DialogTitle>
          <DialogDescription>
            {editingTransaction
              ? "Edite os dados do lançamento"
              : "Adicione um novo lançamento financeiro"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="valor">Valor</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              value={formData.valor}
              onChange={(e) => setFormData(prev => ({ ...prev, valor: Number(e.target.value) }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="tipo">Tipo</Label>
            <Select
              value={formData.tipo}
              onValueChange={(value: "RECEITA" | "DESPESA") =>
                setFormData(prev => ({ ...prev, tipo: value, categoria: "" }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RECEITA">Receita</SelectItem>
                <SelectItem value="DESPESA">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="categoria">Categoria</Label>
            <Input
              id="categoria"
              value={formData.categoria}
              onChange={(e) => setFormData(prev => ({ ...prev, categoria: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="data">Data</Label>
            <Input
              id="data"
              type="date"
              value={formData.data}
              onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {editingTransaction ? "Atualizar" : "Adicionar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}