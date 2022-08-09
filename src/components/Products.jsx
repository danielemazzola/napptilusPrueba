import { Link } from 'react-router-dom'

const Products = ({ products }) => {
  const { id, imgUrl, model, price, brand } = products

  return (
    <div>
      <div className="flex justify-center shadow-lg m-2 p-5 items-center">
        <div className="flex flex-col">
          <div>
            <img src={imgUrl} alt={model} className="w-32 bg-cover" />
          </div>
          <div className="mx-5 sm:mx-0 sm:mt-5">
            <p>{brand}</p>
            <p>{model}</p>
            <p className="bg-rose-500 w-1/2 text-center font-bold text-white">
              {price}€
            </p>
          </div>
          <Link
            to={`/product/${id}`}
            className="uppercase text-sm bg-sky-400 my-2 py-1 rounded text-white font-bold text-center"
          >
            más detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Products
