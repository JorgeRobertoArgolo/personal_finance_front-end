import { AxiosResponse } from "axios"
import { httpClient } from "@/common/http"
import { UsuarioLogin } from "@/feautures/auth/types/usuario-login"
import { Usuario } from "@/feautures/auth/types/usuario"
import { UsuarioRegister } from "../../types/usuario-register"

const resourceURL: string = "/api/auth"

//Funções que fazem requisição a API, nesse caso ao controller de autenticação
export const useAutenticacaoService = () => {
    const authenticate = async (loginData: UsuarioLogin) : Promise<Usuario> => {
        const response: AxiosResponse<Usuario> = 
        await httpClient.post<Usuario>(resourceURL, loginData)
        return response.data;
    }
    
    return {
        authenticate
    }
}