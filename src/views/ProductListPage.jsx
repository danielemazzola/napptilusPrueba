import useClient from '../hooks/useClient'
import Products from '../components/Products'
import Search from '../components/Search'
import Charging from '../components/Charging'
const ProductListPage = () => {
  const { charging, result, msgError, notExist } = useClient()
  return (
    <div className="w-full">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between mr-4 items-center">
        <div className="mx-5 font-bold uppercase text-2xl text-gray-500 mt-5 sm:mt-0">
          Productos<hr className="border-2 bg-gray-200" />
        </div>
        <div className="w-full flex justify-end">
          <Search />
        </div>
      </div>
      {charging
        ? (
        <div className="flex justify-center mt-20">
          <Charging />
        </div>
          )
        : (
        <>
        { notExist
          ? <p className="font-bold text-center text-xl text-gray-500 transition-all my-10">{msgError}</p>
          : <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {result?.map((products) => (
                <Products key={products.id} products={products} />
            ))}
          </div>
        }
        </>
          )}
    </div>
  )
}

export default ProductListPage
