import axios, { AxiosResponse } from 'axios'
import { ApiResponse, IPeople } from './IStarWars'
import { API_BASE_URl } from '../config'

export const fetchCharacterList = async (currentPage: number) => {
  const response: AxiosResponse<ApiResponse> = await axios.get(`${API_BASE_URl}/people/?page=${currentPage}`)
  return response.data
}

export const fetchCharacter = async (id: string) => {
  const response: AxiosResponse<IPeople> = await axios.get(`${API_BASE_URl}/people/${id}`)
  return response.data
}
