import { httpClient } from "@/common/http"
import { Transacao } from "../types/transacao"
import { AxiosResponse } from "axios"

const resourceURL: string = "/api/transacao"

//Funções que fazem requisição a API, nesse caso ao controller de transação
export const useTransacaoService = () => {
    const save = async (transacao: Transacao) : Promise<Transacao> => {
        const response: AxiosResponse<Transacao> = await httpClient.post<Transacao>(`${resourceURL}/save`)
        return response.data
    }

    const update = async (id: string, transacao: Transacao): Promise<Transacao> => {
        const response: AxiosResponse<Transacao> = await httpClient.put<Transacao>(
            `${resourceURL}/update/${id}`,
            transacao
        )
        return response.data
    }

    const remove = async (id: string): Promise<void> => {
        await httpClient.delete(`${resourceURL}/delete/${id}`)
    }

    const getTransactionsByAuthenticated = async (userId: string): Promise<Transacao[]> => {
        const response: AxiosResponse<Transacao[]> = await httpClient.get<Transacao[]>(
            `${resourceURL}/getTransactionsByAuthenticated/${userId}`
        )
        return response.data
    }

    return {
        save,
        getTransactionsByAuthenticated,
        remove,
        update
    }
} 