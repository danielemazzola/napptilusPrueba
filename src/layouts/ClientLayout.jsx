import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const ClientLayout = () => {
  return (
    <div>
      <div className="fixed w-full">
        <Header />
      </div>
      <main className="flex">
        <div className="w-full mt-40">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default ClientLayout
