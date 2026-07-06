// AULA 07: instância do Axios usada por todos os services do frontend.
import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api/v1',
})
