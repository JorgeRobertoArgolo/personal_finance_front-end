import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Transacao } from "@/feautures/transaction/types/transacao";
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ChartsProps {
  transactions: Transacao[];
}

const COLORS = ["#10b981", "#ef4444", "#3b82f6", "#facc15", "#8b5cf6"];


export const Charts: React.FC<ChartsProps> = ({
  transactions
}) => {

    const pieChartData = transactions
    .filter(t => t.tipo === "DESPESA")
    .reduce((acc: { name: string; value: number }[], t) => {
      const existing = acc.find(item => item.name === t.categoria?.nome);
      if (existing) {
        existing.value += t.valor;
      } else {
        acc.push({ name: t.categoria?.nome || "Outros", value: t.valor });
      }
      return acc;
    }, []);


    const lineChartData = transactions.reduce((acc: any[], t) => {
      const month = new Date(t.data).toLocaleString("pt-BR", { month: "short", year: "numeric" });
      let monthData = acc.find(m => m.monthName === month);
      if (!monthData) {
        monthData = { monthName: month, income: 0, expenses: 0, balance: 0 };
        acc.push(monthData);
      }
      if (t.tipo === "RECEITA") monthData.income += t.valor;
      else monthData.expenses += t.valor;
      monthData.balance = monthData.income - monthData.expenses;
      return acc;
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PieChart */}
            <Card>
              <CardHeader>
                <CardTitle>Despesas por Categoria</CardTitle>
                <CardDescription>Distribuição das despesas por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* LineChart */}
            <Card>
              <CardHeader>
                <CardTitle>Evolução do Saldo</CardTitle>
                <CardDescription>Evolução mensal do saldo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthName" />
                    <YAxis tickFormatter={(value) => `R$ ${value}`} />
                    <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Receitas" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Despesas" />
                    <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} name="Saldo" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
        </div>
    )
}