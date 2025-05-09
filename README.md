# ITX App de Móviles

Este es un proyecto de una aplicación web de móviles desarrollada con React y Vite para la prueba técnica de ITX.

## Funcionalidades Principales

- Listado de productos de móviles con información detallada (marca, modelo, precio, imagen).
- Navegación entre la lista de productos y la página de detalles de cada producto.
- Filtrado de productos por marca y modelo.
- Implementación de un carrito de compras (con contador).

## Cómo ejecutar la aplicación

1.  **Clona el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO_REMOTO>
    cd itx-app
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Ejecuta la aplicación en modo desarrollo:**
    ```bash
    npm start
    # o
    yarn start
    ```
    Esto abrirá la aplicación en tu navegador en `http://localhost:5173` (o el puerto que Vite configure).

## Scripts disponibles

En el `package.json` encontrarás los siguientes scripts:

- `npm start` / `yarn start`: Inicia la aplicación en modo desarrollo con Vite.
- `npm run build` / `yarn build`: Compila la aplicación para producción en la carpeta `dist`.
- `npm test` / `yarn test`: Ejecuta las pruebas unitarias con Jest.
- `npm run lint` / `yarn lint`: Ejecuta ESLint para analizar el código en busca de problemas de estilo y posibles errores.

## Tecnologías utilizadas

- React
- Vite
- React Router DOM (para la navegación)
- ESLint (para el linting de código)

## Autor

David Fernández
Tu GitHub (opcional)
