import useClient from '../hooks/useClient'
import CarList from '../components/CarList'

const CarListProducts = () => {
  const { contCar } = useClient()

  return (
    <div className="flex flex-col">
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between mr-4 items-center">
            <h3 className="mx-5 font-bold uppercase text-2xl text-gray-500 mt-5 sm:mt-0">
            Tu cesta de compras
            </h3>
        </div>
        <div>
        <div className="mx-8 mt-5 mb-8 text-gray-500">
        <p>A continuación una breve descripción de los productos elegidos.</p>
        </div>
        <div className="mx-8 flex flex-col mt-5 bg-gray-50 p-2 rounded-lg">
        <p className="uppercase font-bold text-center my-2 text-gray-500">resumen</p>
            <div className="flex justify-center">
                <p className="mx-3">
                    Cantidad de productos:
                </p>
                <p className="mx-3 font-bold">
                { contCar.length }
                </p>
            </div>
        </div>
            { contCar.length < 0
              ? <div>
                <p>No hay articulos</p>
            </div>
              : <div className="flex flex-col px-2 my-3">
                { contCar.map((pro, index) => pro && <CarList key={index} pro={pro} />)}
            </div>}
        </div>
    </div>
  )
}

export default CarListProducts
