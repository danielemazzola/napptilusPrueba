import { useEffect } from 'react'
import useClient from '../hooks/useClient'
import { useParams } from 'react-router-dom'
import DetailsProducts from '../components/DetailsProducts'
import Charging from '../components/Charging'

const ProductDetailsPage = () => {
  const { productDetail, details, charging } = useClient()

  const params = useParams()

  useEffect(() => {
    const viewProduct = async () => {
      await productDetail(params.id)
    }
    viewProduct()
  }, [params])

  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between mr-4 items-center">
        <div className="mx-5 font-bold uppercase text-2xl text-gray-500 mt-5 sm:mt-0">
          Detálles del producto
        </div>
      </div>
      {charging
        ? (
        <div className="flex justify-center mt-20">
          <Charging />
        </div>
          )
        : (
        <div>
          <DetailsProducts key={details.id} details={details} />
        </div>
          )}
    </div>
  )
}

export default ProductDetailsPage
