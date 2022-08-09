import useClient from '../hooks/useClient'
import mas from '../img/mas.png'
import menos from '../img/menos.png'

const DetailsProducts = ({ details }) => {
  const {
    imgUrl,
    brand,
    chipset,
    price,
    cpu,
    ram,
    os,
    displayResolution,
    battery,
    primaryCamera,
    secondaryCmera,
    weight,
    colors,
    id,
    internalMemory
  } = details

  const {
    viewDetails,
    handleDescription,
    color,
    setColor,
    memory,
    setMemory
  } = useClient()

  const x = price * 0.10
  const firstPrice = parseInt(price) + x

  return (
    <div>
      <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-center my-10">
      <div className="w-1/2 flex justify-center items-center">
        <img src={ imgUrl } alt={ chipset } className="object-cover w-56 sm:w-72" />
      </div>
      <div className="w-2/2 my-5 sm:mx-10 border-2 py-3 px-3 sm:px-10 rounded-xl">
        <div className="w-96">
          <h5 className="uppercase text-xl text-gray-600 my-2 font-bold">Descripción</h5>
          <div className="flex flex-col mx-5">
            <p className="text-gray-600">Marca: <span className="font-bold">{ brand }</span></p>
            <p className="text-gray-600">Modelo: <span className="font-bold">{ chipset }</span></p>
            <p className="text-gray-600">Antes: <span className="font-bold"><del>€{ firstPrice }</del></span></p>
            <p className="text-gray-600 mt-2 font-bold uppercase flex items-center px-2">Ahora: <span className="font-bold text-xl border-l-8 bg-green-500 p-1 text-white ml-2">€{ price }</span></p>
            <p className="text-rose-600 font-bold text-xs">10% Menos</p>
          </div>
          <div className="flex justify-around items-center my-3">
            <p className="font-bold uppercase text-sky-600">Más información</p>
            <div className="text-2xl font-bold w-6">
              { !viewDetails
                ? <img src={mas} alt="ver descripción" onClick={handleDescription} />
                : <img src={menos} alt="cerrar descripción" onClick={handleDescription} />
              }
                </div>
          </div>
          { viewDetails && (
            <div className="">
                <section className="bg-gray-50 rounded-lg p-2 ">
                  <p className="text-gray-600 my-1"><em>CPU: </em><span className="font-bold">{ cpu }</span></p>
                  <p className="text-gray-600 my-1"><em>RAM: </em><span className="font-bold">{ ram }</span></p>
                  <p className="text-gray-600 my-1"><em>Sistema Operatvo: </em><span className="font-bold">{ os }</span></p>
                  <p className="text-gray-600 my-1"><em>Resolución de pantálla: </em><span className="font-bold">{ displayResolution }</span></p>
                  <p className="text-gray-600 my-1"><em>Bateria: </em><span className="font-bold">{ battery }</span></p>
                  <p className="text-gray-600 my-1"><em>Camara Principal: </em><span className="font-bold">{ primaryCamera }</span></p>
                  <p className="text-gray-600 my-1"><em>Camara Secundaria: </em><span className="font-bold">{ secondaryCmera }</span></p>
                  <p className="text-gray-600 my-1"><em>Peso: </em><span className="font-bold">{ weight }gr</span></p>
                </section>
            </div>
          )}
        </div>
      </div>
      </div>
      <div className="w-full my-5">
        <section>
          <form>
            <div>
            <label>Capacidad: </label>
              <select
                  className="bg-slate-50 my-2 border mx-2 px-2 py-1 border-black rounded"
                  value={ memory }
                  onChange={ (e) => setMemory(e.target.value) }
              >
              { internalMemory?.map((mem) => (
                <>
                  <option
                      className=""
                      value={mem}
                      key={id}
                  >
                  {mem}
                  </option>
                </>
              )) }
              </select>
            </div>
            <div>
            <label>Color: </label>
              <select
                  className="bg-slate-50 my-2 border mx-2 px-2 py-1 border-black rounded"
                  value={ color }
                  onChange={ (e) => setColor(e.target.value) }
              >
              { colors?.map((col) => (
                <>
                  <option
                      className=""
                      value={col}
                      key={id}
                  >
                  {col}
                  </option>
                </>
              )) }
              </select>
            </div>
            <div>
              <input
                type="submit"
                value="Añadir a la cesta"
                className="bg-green-500 cursor-pointer text-white px-2 py-1 hover:bg-green-700 transition-colors"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default DetailsProducts
