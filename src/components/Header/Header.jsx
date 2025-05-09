import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import { CartContext } from '../../context/CartContext'

function Header() {
  const location = useLocation()
  const { cartCount } = useContext(CartContext)
  console.log('Valor de cartCount en Header:', cartCount)
  const generateBreadcrumb = () => {
    const pathSegments = location.pathname
      .split('/')
      .filter((segment) => segment)
    const breadcrumb = [{ path: '/', label: 'Inicio' }]

    for (let i = 0; i < pathSegments.length; i++) {
      const currentPathSegment = pathSegments[i]
      let pathValue = `/${pathSegments.slice(0, i + 1).join('/')}`
      let label =
        currentPathSegment.charAt(0).toUpperCase() + currentPathSegment.slice(1)

      if (
        (currentPathSegment.toLowerCase() === 'product' ||
          currentPathSegment.toLowerCase() === 'products') &&
        i < pathSegments.length - 1
      ) {
        pathValue = '/'
      }

      if (
        i > 0 &&
        (pathSegments[i - 1].toLowerCase() === 'product' ||
          pathSegments[i - 1].toLowerCase() === 'products') &&
        location.state &&
        location.state.productName
      ) {
        label = location.state.productName
      }
      breadcrumb.push({ path: pathValue, label })
    }
    return breadcrumb
  }

  const breadcrumb = generateBreadcrumb()

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <svg
          width="300"
          height="80"
          viewBox="0 0 300 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text x="10" y="50" className="svg-logo-text">
            Mi App de Móviles
          </text>{' '}
        </svg>
      </Link>
      <nav className="header__nav">
        <ul className="breadcrumb">
          {breadcrumb.map((item, index) => (
            <li className="breadcrumb__item" key={index}>
              {index === breadcrumb.length - 1 ? (
                <span className="breadcrumb__link breadcrumb__link--active">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="breadcrumb__link">
                  {item.label}
                </Link>
              )}
              {index < breadcrumb.length - 1 && (
                <span className="breadcrumb__separator">/</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="header__cart">
        Carrito: <span className="cart-count">{cartCount}</span>{' '}
      </div>
    </header>
  )
}

export default Header
