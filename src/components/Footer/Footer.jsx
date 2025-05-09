import './Footer.css'

function Footer() {
  return (
    <footer className="app-footer">
      <p>
        &copy; {new Date().getFullYear()} Mi App de Móviles. Todos los derechos
        reservados.
      </p>
    </footer>
  )
}

export default Footer
