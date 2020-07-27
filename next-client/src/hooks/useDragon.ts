import useSWR from 'swr'

type DragonData = {
  dragons: API.Dragon[]
  isLoading: boolean
  isError: boolean
}

const useDragons = (endpoint: string): DragonData => {
  const { data, error } = useSWR<API.Dragon[], boolean>(endpoint)

  return {
    dragons: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useDragons
