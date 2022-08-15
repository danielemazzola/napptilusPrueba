import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClientProvider } from './context/ClientProvider'
import ClientLayout from './layouts/ClientLayout'
import ProductListPage from './views/ProductListPage'
import ProductDetailsPage from './views/ProductDetailsPage'
import CarListProducts from './views/CarListProducts'

function App () {
  return (
    <BrowserRouter>
      <ClientProvider>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<ProductListPage />} />
            <Route path="product/:id" element={<ProductDetailsPage />} />
            <Route path="view-car-products" element={<CarListProducts />} />
          </Route>
        </Routes>
      </ClientProvider>
    </BrowserRouter>
  )
}

export default App
