import './Description.css'

function Description({ product }) {
  return (
    <div className="product-description">
      <h2>
        {product.brand} {product.model}
      </h2>
      <p className="product-price">Precio: ${product.price}</p>
      <ul>
        <li>CPU: {product.cpu}</li>
        <li>RAM: {product.ram}</li>
        <li>Sistema Operativo: {product.os}</li>
        <li>Resolución de pantalla: {product.displaySize}</li>
        <li>Batería: {product.battery}</li>
        <li>Cámaras: {product.camera}</li>
        <li>Dimensiones: {product.dimentions}</li>
        <li>Peso: {product.weight}</li>
      </ul>
    </div>
  )
}

export default Description
