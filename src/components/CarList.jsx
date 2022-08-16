import useClient from '../hooks/useClient'

const CarList = ({ pro }) => {
  const { result } = useClient()

  return (
    <div className="">
    { result?.filter(product => product.id === pro.values.id).map((pro) => pro &&
        <div className="flex flex-col sm:flex-row justify-center py-2" key={pro.id}>
            <div className="flex justify-center items-center">
                <img src={pro.imgUrl} />
            </div>
            <div className="flex flex-col sm:flex-row px-2 sm:px-5">
            <div className="flex flex-col justify-start px-2 w-96">
                <h2 className="font-bold text-2xl">{pro.brand}</h2>
                <p className="text-lg text-gray-400 font-bold">{pro.model}</p>
                <p className="text-lg text-black font-bold">€<span className="">{pro.price}</span></p>
            <div className="flex justify-start mt-2 items-center">
                <button className="text-sm bg-sky-500 rounded-full uppercase font-bold text-white hover:bg-sky-600 transition-all mx-2 px-2 my-1 py-1">+1</button>
                <button className="text-sm bg-rose-400 rounded-full uppercase font-bold text-white hover:bg-rose-600 transition-all mx-2 px-2 my-1 py-1">-1</button>
            </div>
            </div>
            <div className="flex flex-col items-center sm:justify-center px-4 my-4 sm:mt-0 sm:w-1/2">
                <button className="text-sm bg-rose-400 rounded-lg my-1 w-full capitalize font-bold text-white hover:bg-rose-600 transition-all py-1">Quitar</button>
            </div>
            </div>
        </div>
    ) }

    </div>
  )
}

export default CarList
