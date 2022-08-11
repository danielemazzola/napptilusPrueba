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

  // Variable Date global
  const now = new Date().valueOf()
  const exp = 160 * 60 * 1000

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
      // Consultamos si existen productos en LocalStorage
      if (!consultLocalStorage) {
        console.log('Nada en Storage')
        const { data } = await axiosClient('product')
        setApiProducts(data)
        // Almacenamos en LocalStorage lista de productos
        localStorage.setItem('Products', JSON.stringify(data))
        // Almacenamos en LocalStorage hora de almacenaje de los productos
        localStorage.setItem('Now', now)
      } else if (consultLocalStorage) {
        console.log('Storage lleno')
        // Consultamos tiempo transcurrido desde la primera Cookie almacenada
        const timeValidate = localStorage.getItem('Now')
        console.log(now)
        console.log(timeValidate)
        // Validacion de tiempo transcurrido
        if (now - timeValidate < exp) {
          // Consumimos el listado de productos desde LocalStorage
          setApiProducts(consultLocalStorage)
          console.log('Dentro del tiempo estipulado')
        } else {
          // realizamos nueva validación del listado
          const { data } = await axiosClient('product')
          localStorage.removeItem('Now')
          localStorage.setItem('Now', now)
          setApiProducts(data)
          console.log('Nueva Data')
        }
      }
      setCharging(false)
    }
    fetchData()
  }, [])

  // Busqueda de productos en tiempo real
  useEffect(() => {
    // condiciones de busqueda
    if (!search) {
      // Si no existe caracter en input mostrará desde el State de apiProducts
      setResult(apiProducts)
    } else {
      // Caso contrario filtramos y mostramos según criterio
      const searching = apiProducts.filter((data) => data.brand.toLowerCase().includes(search.toLowerCase()) || data.model.toLowerCase().includes(search.toLowerCase()))
      setResult(searching)
    }
  }, [search, apiProducts])

  // Filtrando el producto por ID para mostrar sus detalles
  const productDetail = async (id) => {
    setCharging(true)
    const existDetailsProduct = JSON.parse(localStorage.getItem('DetailsProduct'))
    // Consultamos si existe productos en LocalStorage con la const existDetailsProduct
    if (existDetailsProduct) {
      // Consultamos si existe el 'id' del producto con el 'id' de prop recibido y filtramos
      const detectedProduct = existDetailsProduct?.map((pro) => pro).filter((pro) => pro.id === id && pro)
      if (detectedProduct.length > 0) {
        // Si existe producto, lo consumimos
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
      // En caso de que no exista en localStorage, consumimos la API y lo guardamos en cliente
      const { data } = await axiosClient(`product/${id}`)
      setDetails(data)
      setDetailsStorage([...detailsStorage, data])
      localStorage.setItem('DetailsProduct', JSON.stringify([...detailsStorage, data]))
    }
    setCharging(false)
  }

  // Mostrando y ocultando menú de mas informacion en DetailsProduct
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
