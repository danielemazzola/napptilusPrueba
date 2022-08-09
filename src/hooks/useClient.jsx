import { useContext } from 'react'
import ClientProvider from '../context/ClientProvider'

const useClient = () => {
  return useContext(ClientProvider)
}

export default useClient
