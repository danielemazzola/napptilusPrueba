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
  const [notExist, setNotExist] = useState(false)
  const [msgError, setMSGError] = useState('')

  // Almacenar información de la API en State
  const [apiProducts, setApiProducts] = useState([])

  // Almacenar un producto en el State
  const [details, setDetails] = useState({})
  // Almacenar productos en el localStora
  const [detailsStorage, setDetailsStorage] = useState([])

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

  // fecha + tiempo de expiracion cookies
  const now = new Date().valueOf()
  const [exp, setExp] = useState(null)

  // breadcrumbs
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
      // Busqueda de LocalStorage de lista de productos
      const consultLocalStorage = await JSON.parse(localStorage.getItem('Products'))
      // Asignamos valor de expiración
      setExp(60 * 60 * 1000)
      // Consultamos si existen productos en LocalStorage
      if (!consultLocalStorage) {
        const { data } = await axiosClient('product')
        setApiProducts(data)
        // Almacenamos en LocalStorage lista de productos
        localStorage.setItem('Products', JSON.stringify(data))
        // Almacenamos en LocalStorage hora de almacenaje de los productos
        localStorage.setItem('Now', now)
      } else if (consultLocalStorage) {
        // Consultamos tiempo transcurrido desde la primera Cookie almacenada
        const timeValidate = localStorage.getItem('Now')
        // Validacion de tiempo transcurrido
        if (now - timeValidate < exp) {
          // Consumimos el listado de productos desde LocalStorage
          setApiProducts(consultLocalStorage)
        } else {
          // realizamos nueva validación del listado
          const { data } = await axiosClient('product')
          localStorage.removeItem('Now')
          localStorage.setItem('Now', now)
          setApiProducts(data)
        }
      }
      setCharging(false)
    }
    fetchData()
  }, [])

  // Filtrando el producto por ID para mostrar sus detalles
  const productDetail = async (id) => {
    setCharging(true)
    // Asignamos valor de validación con la API detalles de productos
    setExp(20000)
    // Consultamos si existe productos en LocalStorage con la const existDetailsProduct
    const existDetailsProduct = JSON.parse(localStorage.getItem('DetailsProduct'))
    // Validamos fecha de expiracion global de las cookies
    const timeValidate = localStorage.getItem('Now')
    if (existDetailsProduct) {
      // Consultamos caducidad de la cookie
      if (now - timeValidate < exp) {
        // Consumimos el listado de productos desde LocalStorage
        const detectedProduct = existDetailsProduct?.map((product) => product).filter((product) => product.id === id && product)
        // Consultamos si existe el 'id' del producto con el 'id' del prop recibido y filtramos desde el Storage
        if (detectedProduct.length > 0) {
          // Si existe producto, lo consumimos desde Storage
          setDetails(detectedProduct[0])
        } else {
          // No existe, lo consumismos desde la API
          const { data } = await axiosClient(`product/${id}`)
          setDetails(data)
          // Lo almacenamos el LocalStorage
          setDetailsStorage([...detailsStorage, data])
          localStorage.setItem('DetailsProduct', JSON.stringify([...detailsStorage, data]))
        }
      } else {
        // time expirado
        const idsProductsStorage = existDetailsProduct.map((prodIds) => prodIds.id)
        // Bucle para nueva validacion de cada id con API
        localStorage.removeItem('Now')
        for (let index = 0; index < idsProductsStorage.length; index++) {
          const consumoApi = async () => {
            const { data } = await axiosClient(`product/${idsProductsStorage[index]}`)
            setDetails(data)
            setDetailsStorage([...detailsStorage, data])
            localStorage.setItem('DetailsProduct', JSON.stringify([...detailsStorage, data]))
          }
          consumoApi()
        }
        localStorage.setItem('Now', now)
      }
    } else {
      const { data } = await axiosClient(`product/${id}`)
      setDetails(data)
      // Lo almacenamos el LocalStorage
      setDetailsStorage([...detailsStorage, data])
      localStorage.setItem('DetailsProduct', JSON.stringify([...detailsStorage, data]))
      localStorage.removeItem('Now')
      localStorage.setItem('Now', now)
    }
    setCharging(false)
  }

  // Busqueda de productos en tiempo real
  useEffect(() => {
    // condiciones de busqueda
    setNotExist(false)
    if (!search) {
      // Si no existe caracter en input mostrará desde el State de apiProducts
      setResult(apiProducts)
    } else {
      // Caso contrario filtramos y mostramos según criterio
      const searching = apiProducts.filter((data) => data.brand.toLowerCase().includes(search.toLowerCase()) || data.model.toLowerCase().includes(search.toLowerCase()))
      if (searching.length > 0) {
        setResult(searching)
      } else {
        setNotExist(true)
        setMSGError('El producto que buscas no existe :(')
      }
    }
  }, [search, apiProducts])

  // Mostrando y ocultando menú de más informacion en DetailsProduct
  const handleDescription = () => {
    setViewDetails(!viewDetails)
  }

  // Consultando Storage de Car
  useEffect(() => {
    setCharging(true)
    const CarStorage = () => {
      // Consultamos si existe en LocalStorage
      const list = JSON.parse(localStorage.getItem('Car'))
      if (list) {
        // En caso de existir, lo recuperamos
        setContCar(list)
      }
    }
    setCharging(false)
    CarStorage()
  }, [])

  // Enviamos los productos al carrito y esperamos la respuesta para sumarla al contador
  const addCart = async (values) => {
    setChargingCar(true)
    const { data } = await axiosClient.post('cart', values)
    try {
      setContCar([...contCar, data])
      localStorage.setItem('Car', JSON.stringify([...contCar, data]))
      setColorCode('')
      setStorageCode('')
    } catch (error) {
      alert(error.message)
    }
    setChargingCar(false)
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
        notExist,
        msgError,

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
