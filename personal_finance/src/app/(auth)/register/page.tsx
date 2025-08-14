"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TabsList, Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import * as yup from 'yup'
import { Mail, Lock, Wallet, User, AlertCircle } from "lucide-react"
import { UsuarioRegister } from '@/feautures/auth/types/usuario-register';
import { useUsuarioService } from '@/feautures/auth/services/usuario.service';
import { useFormik } from "formik";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AxiosError } from "axios";

//Validações com yup
const msgCampoObrigatorio: string = "Campo obrigatório"

const validationSchema = yup.object().shape({
    nome: yup.string().trim().min(5, "O nome deve ter pelo menos 5 caracteres").required(msgCampoObrigatorio),
    senha: yup.string().trim().min(6, "A senha deve ter pelo menos 6 caracteres").required(msgCampoObrigatorio),
    senhaConfirmar: yup.string().trim().min(6, "A senha deve ter pelo menos 6 caracteres").required(msgCampoObrigatorio),
    email: yup.string().trim().required(msgCampoObrigatorio),
})

export default function Home() {
  return (
    <>
      <AuthFormRegister />
    </>
  )
}

export const AuthFormRegister: React.FC = () => {

    const usuarioService = useUsuarioService()

    const formik = useFormik({
        initialValues: {
            nome: '',
            email: '',
            senha: '',
            senhaConfirmar: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            //Limpa o status de erro anterior
            formik.setStatus(null);

            const usuarioRegister: UsuarioRegister = {
                nome: values.nome,
                email: values.email,
                senha: values.senha
            }

            if (values.senha !== values.senhaConfirmar) {
                formik.setStatus("As senhas não coincidem" );
                return;
            }
            
            try {
                const usuarioRegisterResponse = await usuarioService.save(usuarioRegister);
                formik.setStatus("Usuário cadastrado com sucesso! Você já pode fazer login.");
            } catch (error) {
                 //Obs: o formik já lida com erros de validação,
                 // Verifica se é um erro do Axios (erro da API)
                if (error instanceof AxiosError) {
                    if (error.response?.status === 400) {
                        // Erro de validação do backend (ex: email duplicado)
                        const errorMessage = error.response?.data?.message || 
                                           error.response?.data?.error || 
                                           "Dados inválidos. Verifique as informações e tente novamente.";
                        formik.setStatus(errorMessage);
                    } else if (error.response?.status === 409) {
                        // Conflito - email já existe
                        formik.setStatus("Este email já está cadastrado. Tente fazer login ou use outro email.");
                    } else {
                        // Outros erros da API
                        const errorMessage = error.response?.data?.message || 
                                           "Erro ao cadastrar usuário. Tente novamente.";
                        formik.setStatus(errorMessage);
                    }
                } else {
                    // Erro de rede ou outro tipo de erro
                    formik.setStatus("Erro de conexão. Verifique sua internet e tente novamente.");
                }

                 console.error("Erro ao registrar:", error);
                 formik.setStatus( "Email já cadastrado" )
            }
        }
    });


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-600 p-3 rounded-full">
                            <Wallet className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestão Financeira</h1>
                    <p className="text-gray-600 mt-2"> Controle suas finanças de forma inteligente</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Criar Conta</CardTitle>
                        <CardDescription>Crie sua conta para começar a gerenciar suas finanças</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/*Alerta de erro ou sucesso ao cadastrar novo usuário*/}
                        {formik.status && (
                            <Alert variant={formik.status.includes("sucesso") ? "default": "destructive"} className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-sm">
                                    {formik.status}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Formulário */}
                        <form action="/login" method="post" className="space-y-4" onSubmit={formik.handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="register-name">Nome Completo</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="register-name" type="text" placeholder="Seu nome completo" className="pl-10"
                                    {...formik.getFieldProps('nome')}
                                    required/>
                                </div>
                            </div>
                            {
                                formik.touched.nome && formik.errors.nome ? (
                                    <div className='text-red-500 text-sm mt-1'>
                                        {formik.errors.nome}
                                    </div>
                                ): null
                            }

                            <div className="space-y-2">
                                <Label htmlFor="register-email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="register-email" type="email" placeholder="seu@email.com" className="pl-10" 
                                    {...formik.getFieldProps('email')}
                                    required />
                                </div>
                            </div>
                            {
                                formik.touched.email && formik.errors.email ? (
                                    <div className='text-red-500 text-sm mt-1'>
                                        {formik.errors.email}
                                    </div>
                                ): null
                            }

                            <div className="space-y-2">
                                <Label htmlFor="register-password">Senha</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="register-password" type="password" placeholder="••••••••" className="pl-10" 
                                    {...formik.getFieldProps('senha')}
                                    required />
                                </div>
                            </div>
                            {
                                formik.touched.senha && formik.errors.senha ? (
                                    <div className='text-red-500 text-sm mt-1'>
                                        {formik.errors.senha}
                                    </div>
                                ): null
                            }

                            <div className="space-y-2">
                                <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="register-confirm-password" type="password" placeholder="••••••••" className="pl-10" 
                                    {...formik.getFieldProps('senhaConfirmar')}
                                    required />
                                </div>
                            </div>
                            {
                                formik.touched.senhaConfirmar && formik.errors.senhaConfirmar ? (
                                    <div className='text-red-500 text-sm mt-1'>
                                        {formik.errors.senhaConfirmar}
                                    </div>
                                ): null
                            }

                            <Button type="submit" className="w-full bg-black text-white" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? 'Criando...' : 'Criar Conta'}
                            </Button>
                        </form>
                    </CardContent>
                    <div>
                        <p className="text-sm text-gray-500 mt-1 text-center">
                            Já tem uma conta? <Link href="/login" className="text-blue-600 hover:underline">Entrar</Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}