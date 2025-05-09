const BASE_URL = 'https://itx-frontend-test.onrender.com/api'

const getFromStorage = (key) => {
  const data = localStorage.getItem(key)
  if (data) {
    const { value, expiry } = JSON.parse(data)
    if (!expiry || new Date().getTime() < expiry) {
      return value
    } else {
      localStorage.removeItem(key)
    }
  }
  return null
}

const setWithExpiry = (key, value, ttl) => {
  const expiry = new Date().getTime() + ttl
  localStorage.setItem(key, JSON.stringify({ value, expiry }))
}

async function getProducts() {
  const cacheKey = 'products'
  const cachedProducts = getFromStorage(cacheKey)

  if (cachedProducts) {
    return cachedProducts
  }

  try {
    const response = await fetch(`${BASE_URL}/product`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    setWithExpiry(cacheKey, data, 60 * 60 * 1000)
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

async function getProductDetails(id) {
  const cacheKey = `product_${id}`
  const cachedDetails = getFromStorage(cacheKey)

  if (cachedDetails) {
    return cachedDetails
  }

  try {
    const response = await fetch(`${BASE_URL}/product/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    setWithExpiry(cacheKey, data, 60 * 60 * 1000)
    return data
  } catch (error) {
    console.error('Error fetching product details:', error)
    throw error
  }
}

async function addToCart(productId, colorCode, storageCode) {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: productId,
        colorCode: colorCode,
        storageCode: storageCode,
      }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    console.log('Respuesta de la API para addToCart:', data)
    return data.count
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

export { getProducts, getProductDetails, addToCart }
