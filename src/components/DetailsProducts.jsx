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
    weight
  } = details

  return (
    <div className="mt-10 flex flex-col sm:flex-row sm:justify-center">
      <div className="w-1/2 flex justify-center items-center">
        <img src={ imgUrl } alt={ chipset } className="object-cover w-68 h-96" />
      </div>
      <div className="w-2/2 flex justify-center items-center">
        <div className="w-80">
          <h5 className="uppercase text-xl text-gray-600 my-2">Descripción</h5>
          <p className="text-gray-600">Marca: <span className="font-bold">{ brand }</span></p>
          <p className="text-gray-600">Modelo: <span className="font-bold">{ chipset }</span></p>
          <p className="text-gray-600">Precio: <span className="font-bold text-xl">€{ price }</span></p>
          <div className="flex justify-around items-center my-2">
            <p className="font-bold uppercase text-sky-600">Más información</p>
            <div className="text-2xl font-bold w-8"><img src={mas} /><img src={menos} /></div>
          </div>
          <p className="text-gray-600">CPU: <span className="font-bold">{ cpu }</span></p>
          <p className="text-gray-600">RAM: <span className="font-bold">{ ram }</span></p>
          <p className="text-gray-600">Sistema Operatvo: <span className="font-bold">{ os }</span></p>
          <p className="text-gray-600">Resolución de pantálla: <span className="font-bold">{ displayResolution }</span></p>
          <p className="text-gray-600">Bateria: <span className="font-bold">{ battery }</span></p>
          <p className="text-gray-600">Camara Principal: <span className="font-bold">{ primaryCamera }</span></p>
          <p className="text-gray-600">Camara Secundaria: <span className="font-bold">{ secondaryCmera }</span></p>
          <p className="text-gray-600">Peso: <span className="font-bold">{ weight }gr</span></p>
        </div>
      </div>
    </div>
  )
}

export default DetailsProducts
