import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product }) {
  const productNameForBreadcrumb = product.model

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
      state={{ productName: productNameForBreadcrumb }}
    >
      <img
        src={product.imgUrl}
        alt={product.model}
        className="product-card__image"
      />
      <h2 className="product-card__brand">{product.brand}</h2>
      <p className="product-card__model">{product.model}</p>
      <p className="product-card__price">Precio: ${product.price}</p>
    </Link>
  )
}

export default ProductCard
