import Axios, {AxiosInstance} from "axios";

//Caminho Inicial da URL da API
export const httpClient: AxiosInstance = Axios.create({baseURL: "http://localhost:8080/"})