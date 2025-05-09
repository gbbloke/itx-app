import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import ProductList from '../../components/ProductList/ProductList'
import { getProducts } from '../../services/apiService'
import './HomePage.css'

function HomePage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showScrollTopButton, setShowScrollTopButton] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTopButton(true)
      } else {
        setShowScrollTopButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase()
    return (
      product.brand.toLowerCase().includes(search) ||
      product.model.toLowerCase().includes(search)
    )
  })

  if (loading) {
    return <div>Cargando productos...</div>
  }

  if (error) {
    return <div>Error al cargar los productos: {error.message}</div>
  }

  return (
    <div className="home-page">
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      <ProductList products={filteredProducts} />
      {showScrollTopButton && (
        <button onClick={scrollToTop} className="scroll-top-button">
          ↑
        </button>
      )}
    </div>
  )
}

export default HomePage
