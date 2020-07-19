import axios from 'axios'

// TODO: move this to config
const BASE_URL = 'http://localhost:8081'

const instance = axios.create({ baseURL: BASE_URL })

const fetcher = (url: string): Promise<API.Generation> =>
  instance.get(url).then((res) => res.data)

const login = async (account: API.Account): Promise<void> => {
  const response = await instance.post<API.LogIn>('accounts/login', account)

  instance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${response.data.jwt}`
}

const logout = (): void => {
  instance.defaults.headers.common['Authorization'] = ''
}

const generateNewDragon = async (): Promise<API.Dragon> => {
  const response = await instance.get<API.Dragon>('dragons/new')

  return response.data
}

const updateDragon = async (
  state: API.DragonState & { id: number },
): Promise<API.Dragon> => {
  const body = {
    id: state.id,
    isPublic: state.isPublic,
    nickname: state.name,
    saleValue: state.sellingPrice,
    sireValue: state.matingPrice,
  }

  const response = await instance.put<API.Dragon>('dragons', body)

  return response.data
}

const buyDragon = async (id: number) => {
  const response = await instance.post(`dragons/buy/${id}`)

  return response.data
}

export { fetcher, login, logout, generateNewDragon, updateDragon, buyDragon }
