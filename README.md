# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Style
Tailwindcss

### LINT
Revisión de codigo

### SweetAlert
npm install --save sweetalert

### Almacenaje en LocalStorage
### ListProducts
A tener en cuenta que el State [exp, setExp] almacena la caducidad mencionada por el cliente y la const now devuelve la data actual.
Cuando el usuario refresca o inicializa nuevamente la URL del cliente, la funcion fetchData() revisa la fecha y la hora almacenada, mediante la key Now, en el storage.
Si la key está dentro del plazo estipulado por el cliente, este permite continuar la condicion, en caso contrario validará nuevamente la información con la API y la almacenará nuevamente en el Storage.
### DetailsProduct
La primera validación es revisar si ya el producto existe, en caso que no exista, lo consume de la API y lo almacena en el Storage y a su vez actualiza la key Now con la fecha y hora actual, en caso de que exista, lo consume del Storage.
Si el producto existe, consultamos si está dentro del tiempo de expiración de la key Now.
Si está dentro del tiempo, realizamos nueva consulta con el fin de comprobar que existe el producto en el Storage para evitar consumir la API, en caso de no existir, consumimos de la API, actualizamos el arreglo en el storage y actualizamos el valor de la key Now a la fecha y hora actual.
No esta dentro del tiempo, mediante bucle for consumimos la API con el arreglo de los productos del Storage y actualizamos la key Now a la fecha y hora actual.

### breadcrumbs
Lo gestionamos mediante useEffect, el State details y useLocation de react-router-dom
El State details: si el state está vacio, no mostrará esta nueva ruta de detalles, sino hasta que el usuario visité un nuevo hipervinculo y consulte los detalles de un producto y a su vez podrá desplazarse por las views listProducts y viewDetailsProducts.

### Barra de Busqueda (SEARCH)
Mediante filter() extraemos la información almacenada en el state result el cual se llenará con el response de la API al consultar el listado de productos o con los nuevos caracteres introducidos por el usuario en el input con state search.

### Cart
Mediante la funcion addCart, enviamos el post a la API con un try catch para detectar un posible problema de comunicación.
Conforme se recibe una respuesta del end point, la almacenamos en LocalStorage con el fin de persistir el dato y realizar un conteo de los productos almacenados.
