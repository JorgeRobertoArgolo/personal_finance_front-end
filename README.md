# personal_finance_front-end
Aplicativo de gestão financeira pessoal desenvolvido Typescript, React, Tailwild e NextJS. Permite registrar receitas e despesas, organizá-las por categorias e acompanhar seu fluxo financeiro de forma simples e eficiente.

## Estrutura do projeto
Exemplo de como será a estrutura do projeto
```text
my-app/
│
├── public/                    # Arquivos públicos (imagens, favicon, robots.txt etc.)
│
├── src/                       # Todo o código-fonte da aplicação
│   ├── app/                   # Rotas (App Router) e layout principal
│   │   ├── layout.tsx         # Layout global da aplicação
│   │   ├── page.tsx           # Página inicial ("/")
│   │   ├── global.css         # CSS global da aplicação   
│   │   └── feautures/         # Feautures (telas)
|   |
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ui/                # Componentes visuais (botões, cards, modais, etc.)
│   │   └── layout/            # Cabeçalhos, rodapés, barras laterais (layouts de partes da aplicação)
│   │
│   ├── common/                # Funcionalidades comuns
│   │   └── http/              # Caminho da API
│   │
│   ├── components/            # 
│   │   ├── layout/            # Componentes criados por mim
│   │   └── ui                 # Componentes prontos      
│   │   
│   ├── feautures/             # Feautures do projeto
│   │   ├── services/          # Services que fazem a conexão com a API
│   │   └── types              # Equivalente as classes, só que apenas os atributos
│   │
│   ├── lib/                   # Funções utilitárias e bibliotecas auxiliares
│   │
│   ├── styles/                # Arquivos CSS / Tailwind / variáveis globais
│   └── constants/             # Constantes globais 
```
