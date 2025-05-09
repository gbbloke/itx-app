const CART_COUNT_KEY = 'cartCount'
const EXPIRATION_KEY = 'cartCountExpiration'

function getCartCount() {
  const count = localStorage.getItem(CART_COUNT_KEY)
  const expiration = localStorage.getItem(EXPIRATION_KEY)

  if (expiration && Date.now() > parseInt(expiration, 10)) {
    localStorage.removeItem(CART_COUNT_KEY)
    localStorage.removeItem(EXPIRATION_KEY)
    return 0
  }

  return count ? parseInt(count, 10) : 0
}

function setCartCount(count) {
  localStorage.setItem(CART_COUNT_KEY, count)
  localStorage.setItem(EXPIRATION_KEY, Date.now() + 60 * 60 * 1000)
}

function clearCartCount() {
  localStorage.removeItem(CART_COUNT_KEY)
  localStorage.removeItem(EXPIRATION_KEY)
}

export { getCartCount, setCartCount, clearCartCount }
