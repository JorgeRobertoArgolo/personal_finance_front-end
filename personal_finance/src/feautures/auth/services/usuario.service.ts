import { AxiosResponse } from "axios"
import { UsuarioRegister } from "../types/usuario-register"
import { Usuario } from "../types/usuario"
import { httpClient } from "@/common/http"

const resourceURL: string = "/api/usuarios"

//Funções que fazem requisição a API, nesse caso ao controller de usuario
export const useUsuarioService = () => {
    const save = async (registerData: UsuarioRegister) : Promise<Usuario> => {
        const response: AxiosResponse<Usuario> = 
        await httpClient.post<Usuario>(`${resourceURL}/save`, registerData)
        return response.data;
    }

    const findall = async (): Promise<Usuario[]> => {
            const response: AxiosResponse<Usuario[]> = await httpClient.get<Usuario[]>(
                `${resourceURL}/findall`
            )
            return response.data
        }

    return {
        save, 
        findall
    }
}