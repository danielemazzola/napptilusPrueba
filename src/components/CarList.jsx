import useClient from '../hooks/useClient'

const CarList = ({ pro }) => {
  const { result } = useClient()

  return (
    <div className=" my-5 sm:border-0 rounded-lg">
    { result?.filter(product => product.id === pro.values.id).map((pro) => pro &&
        <div className="flex flex-col sm:flex-row justify-center pt-2" key={pro.id}>
            <div className="flex justify-center items-center">
                <img src={pro.imgUrl} />
            </div>
            <div className="flex flex-col sm:flex-row px-2 sm:px-5 bg-gray-100 mt-2 rounded-b-xl sm:ml-3 sm:rounded-b-none sm:rounded-r-xl">
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
                <button className="bg-white text-sm rounded-lg my-1 w-full capitalize font-bold text-rose-400 border-2 border-rose-400 hover:bg-rose-400 hover:text-white transition-all py-1">Limpiar</button>
            </div>
            </div>
        </div>
    ) }

    </div>
  )
}

export default CarList
