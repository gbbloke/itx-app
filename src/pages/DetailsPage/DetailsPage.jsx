import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Image from '../../components/Image/Image'
import Description from '../../components/Description/Description'
import Actions from '../../components/Actions/Actions'
import { getProductDetails } from '../../services/apiService'
import './DetailsPage.css'

function DetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getProductDetails(id)
        setProduct(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [id])

  if (loading) {
    return (
      <div className="loading-message">Cargando detalles del producto...</div>
    )
  }

  if (error) {
    return (
      <div className="error-message">
        Error al cargar detalles: {error.message}
      </div>
    )
  }

  if (!product) {
    return <div className="error-message">Producto no encontrado</div>
  }

  return (
    <div className="details-page">
      <div className="details-page__image-container">
        <Image src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
      </div>
      <div className="details-page__content">
        <div className="details-page__description-wrapper">
          <Description product={product} />
        </div>
        <Actions product={product} />
        <Link to="/" className="details-page__back-link">
          Volver a la lista
        </Link>
      </div>
    </div>
  )
}

export default DetailsPage
