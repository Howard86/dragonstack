import useSWR from 'swr'

type AccountData = {
  info: API.AccountInfo
  isLoading: boolean
  isError: boolean
}

const useAccount = (): AccountData => {
  const { data, error } = useSWR<API.AccountInfo, boolean>('accounts/info')

  return {
    info: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useAccount
