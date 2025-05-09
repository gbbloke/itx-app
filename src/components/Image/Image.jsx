import './Image.css'

function Image({ src, alt }) {
  return <img src={src} alt={alt} className="product-image" />
}

export default Image
