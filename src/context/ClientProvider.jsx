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
  const [car, setCar] = useState(false)

  // Buscador
  const [search, setSearch] = useState('')

  // Almacenar información de la API en State
  const [apiProducts, setApiProducts] = useState([])

  // Almacenar un producto en el State
  const [details, setDetails] = useState({})

  // Ubicación URL
  const location = useLocation()
  const actual = location.pathname
  // console.log(actual)

  // Carrito
  const [contentCar, setContentCar] = useState([])

  useEffect(() => {
    if (actual === '/') {
      setHome(true)
      setProduct(false)
      setCar(false)
    }
    if (actual === '/product/') {
      setHome(false)
      setProduct(true)
      setCar(false)
    }
    if (actual === '/cesta-de-compra') {
      setHome(false)
      setProduct(false)
      setCar(true)
    }
  }, [location])

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

  return (
    <ClientContext.Provider
      value={{
        charging,
        setCharging,

        home,
        setHome,
        product,
        setProduct,
        car,
        setCar,
        details,

        search,
        setSearch,

        apiProducts,

        productDetail
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export { ClientProvider }
export default ClientContext
