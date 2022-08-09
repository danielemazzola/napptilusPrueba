import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axiosClient'
import { useLocation } from 'react-router-dom'

const ClientContext = createContext()

const ClientProvider = ({ children }) => {
  // Spinner
  const [charging, setCharging] = useState(false)

  // breadcrumbs
  const [home, setHome] = useState(true)
  const [product, setProduct] = useState(false)

  // Buscador
  const [search, setSearch] = useState('')

  // Almacenar información de la API en State
  const [apiProducts, setApiProducts] = useState([])

  // Almacenar un producto en el State
  const [details, setDetails] = useState({})

  // State para mostrar detalles de Productos
  const [viewDetails, setViewDetails] = useState(false)

  // Ubicación URL
  const location = useLocation()
  const actual = location.pathname

  // Carrito
  const [contentCar, setContentCar] = useState([])

  useEffect(() => {
    if (actual === '/') {
      setHome(true)
      setProduct(false)
    }
    if (actual === `/product/${details.id}`) {
      setHome(false)
      setProduct(true)
    }
  }, [actual, details])

  useEffect(() => {
    // Busqueda de productos en tiempo real
    // console.log(search);
  }, [search])

  // Consumiendo API - despliegue de productos
  useEffect(() => {
    const fetchData = async () => {
      setCharging(true)
      const { data } = await axiosClient('product')
      setApiProducts(data)
      setCharging(false)
    }
    fetchData()
  }, [])

  // Filtrando el producto por ID
  const productDetail = async (id) => {
    setCharging(true)
    const { data } = await axiosClient(`product/${id}`)
    setDetails(data)
    setCharging(false)
  }

  const handleDescription = () => {
    setViewDetails(!viewDetails)
  }

  return (
    <ClientContext.Provider
      value={{
        charging,
        setCharging,
        viewDetails,

        home,
        setHome,
        product,
        setProduct,
        details,

        search,
        setSearch,

        apiProducts,

        productDetail,
        handleDescription
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export { ClientProvider }
export default ClientContext
