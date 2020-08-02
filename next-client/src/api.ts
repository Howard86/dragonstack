import axios from 'axios'
import { destroyCookie, setCookie } from 'nookies'

// TODO: move this to config
const BASE_URL = 'http://localhost:8081'
const ONE_WEEK = 60 * 60 * 24 * 7

const instance = axios.create({ baseURL: BASE_URL })

const updateAuthHeader = (jwt?: string): void => {
  instance.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : ''
}

const fetcher = (url: string): Promise<API.Generation> =>
  instance.get(url).then((res) => res.data)

const login = async (account: API.Account): Promise<{ ok: boolean }> => {
  const response = await instance.post<API.LogIn>('accounts/login', account)

  setCookie({}, 'jwt', response.data.jwt, {
    maxAge: ONE_WEEK,
    path: '/',
  })

  return { ok: true }
}

const signUp = async (account: API.Account): Promise<{ ok: boolean }> => {
  await instance.post<API.LogIn>('accounts/sign-up', account)

  return login(account)
}

const logout = (): void => {
  destroyCookie({}, 'jwt')
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

const buyDragon = async (id: number): Promise<API.Dragon> => {
  const response = await instance.post(`dragons/buy/${id}`)

  return response.data
}

export {
  fetcher,
  updateAuthHeader,
  login,
  signUp,
  logout,
  generateNewDragon,
  updateDragon,
  buyDragon,
}
