interface Perfil {
    acesso: "ADMIN" | "COMUM"
    descricao: string
}

interface Pessoa {
    nome: string
}

export interface UsuarioLogin {
    email: string
    senha: string
    perfil?: Perfil
    pessoa?: Pessoa
}