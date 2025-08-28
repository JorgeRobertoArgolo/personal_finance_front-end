interface Perfil {
    acesso: "ADMIN" | "COMUM"
    descricao: string
}

interface Pessoa {
    nome: string
}

export interface Usuario {
    id?: string
    nome: string
    email: string
    perfil?: Perfil
    pessoa?: Pessoa
}