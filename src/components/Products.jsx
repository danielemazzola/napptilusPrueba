import { Link } from 'react-router-dom'

const Products = ({ products }) => {
  const { id, imgUrl, model, price, brand } = products

  return (
      <div className="flex justify-center shadow-lg m-2 p-5 items-center">
        <div className="flex flex-col w-full">
          <div className="flex justify-center px-2 py-3 rounded-lg">
            <img src={imgUrl} alt={model} className="w-32 bg-cover" />
          </div>
          <div className="mx- rounded-lg">
            <div className="mx-5 sm:mx-0 mt-5 flex justify-between">
            <div className="border-l-8 p-2">
              <p className="font-bold uppercase">{brand}</p>
              <p className="font-bold uppercase text-sm mt-2">Modelo</p>
              <p className="text-xs capitalize">{model}</p>
            </div>
              <div className="bg-gray-100 p-2 rounded-l-lg flex flex-col justify-center items-center">
                <p className="capitalize font-normal underline">precio</p>
                <span className="bg-green-500 rounded w-full font-bold text-white">{ price }€</span>
              </div>
            </div>
            <div className="my-3 flex justify-center">
              <Link
                to={`/product/${id}`}
                className="uppercase text-lg bg-sky-400 py-2 w-full mx-5 sm:mx-0 rounded text-white font-bold text-center hover:bg-sky-600"
              >
                más detalles
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Products
