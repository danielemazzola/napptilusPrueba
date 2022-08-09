import { Link } from 'react-router-dom'
import useClient from '../hooks/useClient'
import carrito from '../img/carrito.png'
import carrito2 from '../img/carrito2.png'

const Header = () => {
  const { home, product, details } = useClient()

  return (
    <header className="bg-slate-500 px-6 pt-4 w-full">
      <div className="flex justify-between items-center">
        <div>
          <Link to="./">
            <div className="flex items-center">
              <h2 className="font-bold text-xl sm:text-2xl text-white capitalize">
                Zara Mobile
              </h2>
            </div>
          </Link>
        </div>
        <div>
          <img src={carrito} className="w-8" />
          {/* <img src={carrito2} className="w-8" /> */}
        </div>
      </div>
      <nav className="flex justify-center font-bold mt-5 transition-all">
        <div className="mx-2">
          <Link
            to="./"
            className={`${
              home
                ? 'bg-slate-800 py-2 px-1 text-white rounded-lg'
                : 'text-white hover:bg-gray-300 hover:text-slate-500 hover:py-2 px-1 rounded-lg'
            } `}
          >
            Home
          </Link>
        </div>
          { details.id && (
            <>
              <div className="text-white">|</div>
              <div className="mx-2">
                <Link
                  to={`/product/${details.id}`}
                  className={`${
                    product ? 'bg-slate-800 py-2 px-1 text-white rounded-lg' : 'text-white hover:bg-gray-300 hover:text-slate-500 hover:py-2 px-1 rounded-lg'
                  } `}
                >
                { details && 'Detalles de producto' }
                </Link>
              </div>
            </>
          ) }
      </nav>
    </header>
  )
}

export default Header
