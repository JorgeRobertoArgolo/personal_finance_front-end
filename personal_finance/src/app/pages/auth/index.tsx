import { Button } from "@/app/features/auth/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/features/auth/components/card"
import { Input } from "@/app/features/auth/components/input"
import { Label } from "@/app/features/auth/components/label"
import { TabsList, Tabs, TabsContent, TabsTrigger } from "@/app/features/auth/components/tabs"
//Para icons
import { Mail, Lock, Wallet, User } from "lucide-react"

export const AuthForm: React.FC = () => {
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
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login" text="Entrar" />
                        <TabsTrigger value="register" text="Cadastrar" />
                    </TabsList>

                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle text="Fazer Login" />
                                <CardDescription text="Entre com suas credenciais para acessar a conta" />
                            </CardHeader>
                            <CardContent>
                                {/*TODO: Implementar conexão com o back-end -onSubmit */}
                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <Label text="Email" htmlFor="login-email"/>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                            <Input type="email" id="login-email" placeholder="seu@email.com" className="pl-10"
                                            required/>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label text="Senha" htmlFor="login-password"/>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                            <Input type="password"
                                            id="login-password" 
                                            className="pl-10"
                                            required placeholder="••••••••"
                                            />
                                        </div>

                                    </div>

                                    <Button text="Entrar" className="w-full">
                                        Entrar
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="register">
                        <Card>
                            <CardHeader>
                                <CardTitle text="Criar Conta" />
                                <CardDescription text="Crie sua conta para começar a  gerenciar suas fianças" />                                    
                            </CardHeader>
                            <CardContent>
                                <form action="#" method="post" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="register-name" text="Nome Completo" />
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input id="register-name" type="text" placeholder="Seu nome completo" className="pl-10" required/>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="register-email" text="Email"/>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input id="register-email" type="email" placeholder="seu@email.com" className="pl-10" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="register-password" text="Senha"/>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input id="register-password" type="password" placeholder="••••••••" className="pl-10" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="register-confirm-password" text="Confirmar Senha"/>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input id="register-confirm-password" type="password" placeholder="••••••••" className="pl-10" required />
                                        </div>
                                    </div>

                                    <Button text="Entrar" className="w-full">
                                        Criar Conta
                                    </Button>
                                </form>

                                

                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}