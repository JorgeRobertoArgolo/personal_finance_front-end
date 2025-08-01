# personal_finance_front-end
Aplicativo de gestão financeira pessoal desenvolvido Typescript, React, Tailwild e NextJS. Permite registrar receitas e despesas, organizá-las por categorias e acompanhar seu fluxo financeiro de forma simples e eficiente.

## Estrutura do projeto
Exemplo de como será a estrutura do projeto
```text
my-app/
│
├── public/                     # Arquivos públicos (imagens, favicon, robots.txt etc.)
│
├── src/                        # Todo o código-fonte da aplicação
│   ├── app/                    # Rotas (App Router) e layout principal
│   │   ├── layout.tsx         # Layout global da aplicação
│   │   ├── page.tsx           # Página inicial ("/")
│   │   ├── about/             # Rota: /about
│   │   │   └── page.tsx
│   │   └── dashboard/         # Rota: /dashboard
│   │       ├── layout.tsx     # Layout da seção dashboard
│   │       └── page.tsx
│   │
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ui/                # Componentes visuais (botões, cards, modais, etc.)
│   │   ├── layout/            # Cabeçalhos, rodapés, barras laterais
│   │   └── shared/            # Outros componentes compartilhados
│   │
│   ├── features/              # Funcionalidades isoladas (como "auth", "tasks", etc.)
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── types.ts
│   │   │   └── utils.ts
│   │   └── tasks/
│   │       ├── components/
│   │       ├── services/
│   │       └── types.ts
│   │
│   ├── lib/                   # Funções utilitárias e bibliotecas auxiliares
│   │   ├── firebase/          # Firebase config e inicialização
│   │   └── supabase/          # Supabase client (se usar)
│   │
│   ├── hooks/                 # React hooks customizados
│   ├── styles/                # Arquivos CSS / Tailwind / variáveis globais
│   ├── constants/             # Constantes globais (URLs, mensagens, tokens)
│   ├── types/                 # Tipagens globais (interfaces, enums, etc.)
│   └── utils/                 # Funções utilitárias genéricas (formatadores, validadores)
│
├── .env.local                 # Variáveis de ambiente (não versionadas)
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```
