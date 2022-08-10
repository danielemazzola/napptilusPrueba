import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axiosClient'
import { useLocation } from 'react-router-dom'

const ClientContext = createContext()

const ClientProvider = ({ children }) => {
  // Spinner
  const [charging, setCharging] = useState(false)

  // Spinner Car
  const [chargingCar, setChargingCar] = useState(false)

  // breadcrumbs
  const [home, setHome] = useState(true)
  const [product, setProduct] = useState(false)

  // Buscador
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])

  // Almacenar información de la API en State
  const [apiProducts, setApiProducts] = useState([])

  // Almacenar un producto en el State
  const [details, setDetails] = useState({})

  // State para mostrar detalles de Productos
  const [viewDetails, setViewDetails] = useState(false)

  // State de selectores Colores y Capacidad
  const [colorCode, setColorCode] = useState('')
  const [storageCode, setStorageCode] = useState('')

  // pendiente llenar valores desde details
  const [colDefault, setColDefault] = useState('')
  const [memoDefault, setMemoDefault] = useState('')

  // Carrito
  const [contCar, setContCar] = useState([])

  // Ubicación URL
  const location = useLocation()
  const actual = location.pathname

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

  // Busqueda de productos en tiempo real
  useEffect(() => {
    // condiciones de busqueda
    if (!search) {
      setResult(apiProducts)
    } else {
      const searching = apiProducts.filter((data) => data.brand.includes(search) || data.model.includes(search))
      setResult(searching)
    }
  }, [search, apiProducts])

  // Filtrando el producto por ID para mostrar sus detalles
  const productDetail = async (id) => {
    setCharging(true)
    const { data } = await axiosClient(`product/${id}`)
    setDetails(data)
    setCharging(false)
  }

  // Mostrando y ocultando menú de mas informacion en DetailsProduct
  const handleDescription = () => {
    setViewDetails(!viewDetails)
  }

  // Enviamos los productos al carrito y esperamos la respuesta para sumarla al contador
  const addCart = async (values) => {
    setChargingCar(true)
    const { data } = await axiosClient.post('cart', values)
    if (contCar > 0) {
      setContCar(contCar + data.count)
    } else {
      setContCar(data.count)
    }
    setChargingCar(false)
    setColorCode('')
    setStorageCode('')
  }

  return (
    <ClientContext.Provider
      value={{
        charging,
        setCharging,
        chargingCar,
        viewDetails,
        result,

        home,
        setHome,
        product,
        setProduct,
        details,
        contCar,

        search,
        setSearch,

        apiProducts,

        productDetail,
        handleDescription,
        addCart,
        colorCode,
        setColorCode,
        storageCode,
        setStorageCode,
        colDefault,
        setColDefault,
        memoDefault,
        setMemoDefault
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export { ClientProvider }
export default ClientContext
