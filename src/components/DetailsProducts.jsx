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
    <div className="mt-10 flex justify-center">
      <div className="w-1/2">
        <img src={ imgUrl } />
      </div>
      <div className="w-2/2">
        <p>{ brand }</p>
        <p>{ chipset }</p>
        <p>{ price }</p>
        <p>{ cpu }</p>
        <p>{ ram }</p>
        <p>{ os }</p>
        <p>{ displayResolution }</p>
        <p>{ battery }</p>
        <p>{ primaryCamera }</p>
        <p>{ secondaryCmera }</p>
        <p>{ weight }</p>
      </div>
    </div>
  )
}

export default DetailsProducts
