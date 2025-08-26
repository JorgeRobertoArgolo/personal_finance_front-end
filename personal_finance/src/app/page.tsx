"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, TrendingUp, PieChart, Shield, Smartphone, BarChart3, Target, Clock, Users, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { useRouter } from "next/navigation"

/**
 * Tela inicial, a apresentação do projeto
 */
export default function Home() {
  const router = useRouter()

  /**
   * Constantes com texto para deixar o código mais limpo
   */
  const features = [
    {
      icon: <Wallet className="h-8 w-8 text-blue-600" />,
      title: "Controle Total",
      description: "Gerencie todas suas receitas e despesas em um só lugar com facilidade e precisão.",
    },
    {
      icon: <PieChart className="h-8 w-8 text-green-600" />,
      title: "Gráficos Inteligentes",
      description: "Visualize seus dados financeiros com gráficos interativos de pizza e linha.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Relatórios Detalhados",
      description: "Acompanhe a evolução do seu saldo e identifique padrões de gastos.",
    },
    {
      icon: <Target className="h-8 w-8 text-orange-600" />,
      title: "Filtros Avançados",
      description: "Filtre por mês, categoria e tipo para análises mais precisas.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-indigo-600" />,
      title: "100% Responsivo",
      description: "Acesse de qualquer dispositivo - desktop, tablet ou smartphone.",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Dados Seguros",
      description: "Seus dados financeiros ficam protegidos com criptografia avançada.",
    },
  ]

  /**
   * Constantes com texto para deixar o código mais limpo
   */
  const benefits = [
    "Organize suas finanças em minutos",
    "Tome decisões baseadas em dados reais",
    "Identifique oportunidades de economia",
    "Acompanhe o crescimento do seu patrimônio",
    "Interface intuitiva e fácil de usar",
    "Relatórios automáticos e personalizados",
  ]

  /**
   * Constantes com texto para deixar o código mais limpo
   */
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empresária",
      content: "Revolucionou a forma como controlo minhas finanças. Agora consigo ver exatamente onde gasto meu dinheiro.",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Freelancer",
      content: "Interface limpa e funcionalidades poderosas. Perfeito para quem trabalha por conta própria.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Estudante",
      content: "Simples de usar e me ajuda a manter o orçamento em dia. Recomendo para todos!",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FinanceApp</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/login")}>
              Entrar
            </Button>
            <Button onClick={() => router.push("/register")}>
              Cadastrar
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transforme sua
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Gestão Financeira
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Controle suas receitas, despesas e saldo de forma inteligente. Visualize seus dados com gráficos
            interativos e tome decisões financeiras mais assertivas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/register")} className="text-lg px-8 py-3">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Recursos Poderosos</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tudo que você precisa para ter controle total sobre suas finanças pessoais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Por que escolher o FinanceApp?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nossa plataforma foi desenvolvida pensando na simplicidade e eficiência, oferecendo todas as
                ferramentas necessárias para uma gestão financeira completa.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Saldo Atual</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600">R$ 12.450,00</div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-600 rounded-full w-3/4"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <div className="text-sm text-gray-500">Receitas</div>
                      <div className="text-lg font-semibold text-green-600">R$ 8.500</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Despesas</div>
                      <div className="text-lg font-semibold text-red-600">R$ 3.250</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testemunhos Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">O que nossos usuários dizem</h2>
          <p className="text-xl text-gray-600">Mais de 10.000 pessoas já transformaram suas finanças</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Finalização Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Pronto para transformar suas finanças?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Junte-se a milhares de usuários que já estão no controle total de suas finanças
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => router.push("/register")}
                className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100"
              >
                Começar Agora - É Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">FinanceApp</span>
              </div>
              <p className="text-gray-400">
                A plataforma mais completa para gestão financeira pessoal.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Recursos</li>
                <li>Preços</li>
                <li>Segurança</li>
                <li>Atualizações</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>Status</li>
                <li>Comunidade</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreiras</li>
                <li>Imprensa</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FinanceApp. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}