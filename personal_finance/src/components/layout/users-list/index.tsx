"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUsuarioService } from "@/feautures/auth/services/usuario.service"
import { Usuario } from "@/feautures/auth/types/usuario"
import { useEffect, useMemo, useState } from "react"

export const UsersList: React.FC = () => {

    const { findall } = useUsuarioService()

    const [users, setUsers] = useState<Usuario[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await findall()
                setUsers(data)
            } catch (error) {
                console.error("Erro ao carregar usuários:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const filteredUsers = useMemo(() => {
        return users.filter((user) => true)
    }, [users])

    if (loading) {
        return <p>Carregando usuários...</p>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Adminisitração</CardTitle>
                <CardDescription>
                    Lista de usuários
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="text-gray-600">ID</TableHead>
                        <TableHead className="text-gray-600" >Email</TableHead>
                        <TableHead className="text-gray-600" >Nome</TableHead>
                        <TableHead className="text-gray-600" >Perfil</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((users) => (
                        <TableRow key={users.id}>
                            <TableCell>{users.id}</TableCell>
                            <TableCell>{users.email}</TableCell>
                            <TableCell>{users.pessoa.nome}</TableCell>
                            <TableCell>{users.perfil?.acesso}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}