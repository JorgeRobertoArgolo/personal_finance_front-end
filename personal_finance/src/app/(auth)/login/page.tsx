"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAutenticacaoService } from "@/feautures/auth/services/auth/autenticacao.service"
import * as yup from 'yup'
import { useFormik } from 'formik';
import { Mail, Lock, Wallet, AlertCircle } from "lucide-react"
import { UsuarioLogin } from '@/feautures/auth/types/usuario-login';
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

//Validações com yup
const msgCampoObrigatorio: string = "Campo obrigatório"

const validationSchema = yup.object().shape({
    senha: yup.string().trim().min(6, "A senha deve ter pelo menos 6 caracteres").required(msgCampoObrigatorio),
    email: yup.string().trim().email("Email inválido").required(msgCampoObrigatorio),
})

export default function Home() {
  return (
    <>
      <AuthFormLogin />
    </>
  )
}

//Página de Login
export const AuthFormLogin: React.FC = () => {

    const router = useRouter();
    const autenticacaoService = useAutenticacaoService()

    const formik = useFormik({
        initialValues: {
            email: '',
            senha: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            //Limpa o status de erro anterior
            formik.setStatus(null);

            const usuarioLogin: UsuarioLogin = {
                email: values.email,
                senha: values.senha
            }

            try {
                const usuarioLoginResponse = await autenticacaoService.authenticate(usuarioLogin);

                //Guardar os dados no localStorage
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLoginResponse));
                //Redirecionar ou armazenar token aqui
                router.push("/user/dashboard");
            } catch (e) {
                //Obs: o formik já lida com erros de validação, mas aqui pode-se tratar erros de autenticação
                formik.setStatus( "Credenciais inválidas. Verifique seu email e senha e tente novamente." );
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
                            <CardTitle>Fazer Login</CardTitle>
                            <CardDescription>Entre com suas credenciais para acessar sua conta</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/*Alerta de erro de autenticação*/}
                            {formik.status && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="text-sm">
                                        {formik.status}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/*Formulário*/}
                            <form className="space-y-4" action="#" method="post" onSubmit={formik.handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                        <Input type="email" id="login-email" placeholder="seu@email.com" className="pl-10"
                                        {...formik.getFieldProps('email')}
                                        required/>
                                    </div>
                                    {
                                        formik.touched.email && formik.errors.email ? (
                                            <div className='text-black text-sm mt-1'>
                                                {formik.errors.email}
                                            </div>
                                        ) : null
                                    }
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Senha</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                        <Input type="password"
                                        id="login-password" 
                                        className="pl-10"
                                        required placeholder="••••••••"
                                        {...formik.getFieldProps('senha')}
                                        />
                                    </div>
                                    {
                                        formik.touched.senha && formik.errors.senha ? (
                                            <div className='text-red-500 text-sm mt-1'>
                                                {formik.errors.senha}
                                            </div>
                                        ) : null
                                    }
                                </div>

                                <Button type="submit" className="w-full bg-black text-white" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? 'Entrando...' : 'Entrar'}
                                </Button>
                            </form>
                        </CardContent>
                        <div>
                            <p className="text-sm text-gray-500 mt-1 text-center">
                                Não tem uma conta? <Link href="/register" className="text-blue-600 hover:underline">Registre-se</Link>
                            </p>
                        </div>
                    </Card>
            </div>
        </div>
    )
}