import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClientProvider } from './context/ClientProvider'
import ClientLayout from './layouts/ClientLayout'
import ProductListPage from './views/ProductListPage'
import ProductDetailsPage from './views/ProductDetailsPage'

function App () {
  return (
    <BrowserRouter>
      <ClientProvider>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<ProductListPage />} />
            <Route path="product/:id" element={<ProductDetailsPage />} />
          </Route>
        </Routes>
      </ClientProvider>
    </BrowserRouter>
  )
}

export default App
