import { createContext, useState, useEffect, useCallback } from 'react'
import {
  getCartCount as getCountFromStorage,
  setCartCount as setCountInStorage,
} from '../utils/storageUtils'

export const CartContext = createContext({
  cartCount: 0,
  incrementCartItem: () => {},
  refreshCartCount: () => {},
})

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCountState] = useState(0)

  useEffect(() => {
    setCartCountState(getCountFromStorage())
  }, [])

  const incrementCartItem = useCallback(() => {
    const newCount = cartCount + 1
    setCountInStorage(newCount)
    setCartCountState(newCount)
  }, [cartCount])

  const refreshCartCount = useCallback(() => {
    setCartCountState(getCountFromStorage())
  }, [])

  return (
    <CartContext.Provider
      value={{ cartCount, incrementCartItem, refreshCartCount }}
    >
      {children}
    </CartContext.Provider>
  )
}
