import { useState, useContext } from 'react'
import './Actions.css'
import { addToCart } from '../../services/apiService'
import { CartContext } from '../../context/CartContext'

function Actions({ product }) {
  const { incrementCartItem } = useContext(CartContext)

  const initialColorCode = product.options?.colors?.[0]?.code
  const initialStorageCode = product.options?.storages?.[0]?.code

  const [selectedColor, setSelectedColor] = useState(
    initialColorCode !== undefined ? String(initialColorCode) : '',
  )
  const [selectedStorage, setSelectedStorage] = useState(
    initialStorageCode !== undefined ? String(initialStorageCode) : '',
  )
  const [cartMessage, setCartMessage] = useState(null)

  const handleAddToCart = async () => {
    try {
      const colorCodeForApi = parseInt(selectedColor, 10)
      const storageCodeForApi = parseInt(selectedStorage, 10)

      if (isNaN(colorCodeForApi) || isNaN(storageCodeForApi)) {
        setCartMessage('Por favor, selecciona color y almacenamiento.')
        setTimeout(() => setCartMessage(null), 3000)
        return
      }

      await addToCart(product.id, colorCodeForApi, storageCodeForApi)

      incrementCartItem()
      setCartMessage('Producto añadido al carrito')
    } catch (error) {
      console.error('Error adding to cart:', error)
      setCartMessage('Error al añadir al carrito')
    } finally {
      setTimeout(() => setCartMessage(null), 3000)
    }
  }

  return (
    <div className="product-actions">
      <div className="color-selector">
        <label htmlFor={`color-select-${product.id}`}>Color:</label>
        <select
          id={`color-select-${product.id}`}
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          disabled={
            !product.options?.colors || product.options.colors.length === 0
          }
        >
          {product.options?.colors?.map((color) => (
            <option key={color.code} value={String(color.code)}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <div className="storage-selector">
        <label htmlFor={`storage-select-${product.id}`}>Almacenamiento:</label>
        <select
          id={`storage-select-${product.id}`}
          value={selectedStorage}
          onChange={(e) => setSelectedStorage(e.target.value)}
          disabled={
            !product.options?.storages || product.options.storages.length === 0
          }
        >
          {product.options?.storages?.map((storage) => (
            <option key={storage.code} value={String(storage.code)}>
              {storage.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={
          !selectedColor ||
          !selectedStorage ||
          !product.options?.colors?.length ||
          !product.options?.storages?.length
        }
      >
        Añadir
      </button>
      {cartMessage && <p className="cart-message">{cartMessage}</p>}
    </div>
  )
}

export default Actions
