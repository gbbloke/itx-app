import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Header from './Header'
import { CartContext } from '../../context/CartContext'

// Mock useLocation
const mockUseLocation = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  }
})

const mockCartContextValue = {
  cartCount: 0,
  setCartCount: vi.fn(),
  cartItems: [],
  setCartItems: vi.fn(),
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  clearCart: vi.fn(),
}

const renderHeader = (initialEntries = ['/'], locationState = null) => {
  mockUseLocation.mockReturnValue({
    pathname: initialEntries[0],
    search: '',
    hash: '',
    state: locationState,
  })

  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <CartContext.Provider value={mockCartContextValue}>
        <Header />
      </CartContext.Provider>
    </MemoryRouter>,
  )
}

describe('Header component', () => {
  it('renders the logo text', () => {
    renderHeader()
    expect(screen.getByText('Mi App de Móviles')).toBeInTheDocument()
  })

  it('renders the initial breadcrumb "Inicio"', () => {
    renderHeader(['/'])
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Inicio').closest('span')).toHaveClass(
      'breadcrumb__link--active',
    )
  })

  it('generates correct breadcrumb for a simple path', () => {
    renderHeader(['/products'])
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Products').closest('span')).toHaveClass(
      'breadcrumb__link--active',
    )
    expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/')
  })

  it('generates correct breadcrumb for a product detail path without state', () => {
    renderHeader(['/product/123'])
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument() // Should be "Product" or "123" depending on logic
    // The current logic will show "123" as the label if no productName is in state
    expect(screen.getByText('123').closest('span')).toHaveClass(
      'breadcrumb__link--active',
    )
    // The path for "Product" or "Products" segment should be "/"
    const productLink = screen
      .getAllByRole('listitem')[1]
      .querySelector('a.breadcrumb__link')
    if (productLink) {
      expect(productLink).toHaveAttribute('href', '/')
    }
  })

  it('generates correct breadcrumb for a product detail path with product name in state', () => {
    const productName = 'Awesome Phone'
    renderHeader(['/product/123'], { productName })

    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText(productName)).toBeInTheDocument()
    expect(screen.getByText(productName).closest('span')).toHaveClass(
      'breadcrumb__link--active',
    )
    // Check that the link before the product name (e.g., "Product") points to "/"
    const previousLink = screen.getByText('Inicio').closest('a')
    expect(previousLink).toHaveAttribute('href', '/')

    // The breadcrumb structure should be Inicio / Product / Awesome Phone
    // "Product" itself is not directly rendered as a link text in this case,
    // but its path logic is tested. The label becomes productName.
    // We can check the number of items and their labels.
    const breadcrumbItems = screen.getAllByRole('listitem')
    expect(breadcrumbItems).toHaveLength(3) // Inicio, Product (path only), ProductName
    expect(breadcrumbItems[0]).toHaveTextContent('Inicio')
    // The middle item's link (if it were a link) would point to "/"
    // The last item is the active product name
    expect(breadcrumbItems[2]).toHaveTextContent(productName)
  })

  it('handles "products" segment followed by an ID correctly', () => {
    const productName = 'Another Gadget'
    renderHeader(['/products/456'], { productName })

    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText(productName)).toBeInTheDocument()
    expect(screen.getByText(productName).closest('span')).toHaveClass(
      'breadcrumb__link--active',
    )

    const breadcrumbItems = screen.getAllByRole('listitem')
    expect(breadcrumbItems).toHaveLength(3)
    expect(breadcrumbItems[0]).toHaveTextContent('Inicio')
    expect(breadcrumbItems[2]).toHaveTextContent(productName)
  })

  it('renders breadcrumb separators', () => {
    renderHeader(['/category/items'])
    const separators = screen.getAllByText('/')
    expect(separators.length).toBeGreaterThanOrEqual(1) // At least one separator for 3 items
    separators.forEach((separator) => {
      expect(separator).toHaveClass('breadcrumb__separator')
    })
  })
})
