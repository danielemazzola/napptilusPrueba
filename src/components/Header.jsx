import { Link } from 'react-router-dom'
import useClient from '../hooks/useClient'
import carrito from '../img/carrito.png'
import carrito2 from '../img/carrito2.png'
import Charging from '../components/Charging'

const Header = () => {
  const { home, product, carResult, details, contCar, charging, handleCart } = useClient()
  if (charging) {
    <Charging />
  }

  return (
    <header className="bg-sky-600 px-6 pt-4 w-full flex flex-col">
      <div className="flex justify-between">
        <div>
          <Link to="./">
            <div>
              <h2 className="font-bold text-xl sm:text-2xl text-white capitalize">
                Mobile Shop
              </h2>
            </div>
          </Link>
        </div>
        <div className="transition-all">

          {contCar <= 0
            ? <img src={carrito} alt='Cesta de compra p-2' className="w-8" />
            : <div className="bg-white p-2 rounded-full">
              <Link to={'view-car-products'}>
                <p className="fixed text-center font-bold mt-5 bg-green-500 px-2 ml-7 rounded-full text-white">{ contCar.length }</p>
                <img src={carrito2} alt='Cesta de compra' className="w-8 cursor-pointer" onClick={ handleCart } />
              </Link>
            </div>
            }

        </div>
      </div>
      <nav className="flex justify-around items-center font-bold mt-5 transition-all text-sm sm:text-lg">
        <div className={`w-1/3 ${home && 'bg-slate-800'} text-center py-1 rounded-lg`}>
          <Link
            to="./"
            className={`${
              home
                ? 'text-white'
                : 'text-white hover:bg-gray-300 hover:text-slate-500 hover:py-2 px-1 rounded-lg'
            } `}
          >
            Home
          </Link>
        </div>
        <div className={`w-1/3 ${carResult && 'bg-slate-800'} text-center py-1 rounded-lg`}>
          <Link
            to="./view-car-products"
            className={`${
              carResult
                ? 'text-white px-1 flex justify-center'
                : 'text-white hover:bg-gray-300 hover:text-slate-500 hover:py-2 px-1 rounded-lg'
            } `}
          >
            Cesta de compras
          </Link>
        </div>
          { details.id && (
              <div className={`w-1/3 ${product && 'bg-slate-800'} text-center py-1 rounded-lg`}>
                <Link
                  to={`/product/${details.id}`}
                  className={`${
                    product ? 'text-white' : 'text-white hover:bg-gray-300 hover:text-slate-500 hover:py-2 px-1 rounded-lg'
                  } `}
                >
                { details && 'Detalles de producto' }
                </Link>
              </div>
          ) }
      </nav>
    </header>
  )
}

export default Header
