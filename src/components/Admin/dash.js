import { Link, Route, Routes } from 'react-router-dom'
import '../../App.css'
import '../../css/dashboard.css'
import Order from './order'
import Product from './product'
import Users from './users'
const Dashboard = () => {
  const routes = [
    {
      path: '/users',
      main: () => <Users />,
      sidebar: () => (
        <p>
          This is your home page. You'll see your feed which is made up of the
          people you follow.
        </p>
      ),
    },
    {
      path: '/products',
      main: () => <Product />,
      sidebar: () => (
        <p>
          This is your profile page. You'll be able to see all your profile
          information as well as the people you follow.
        </p>
      ),
    },
    {
      path: '/orders',
      main: () => <Order />,
      sidebar: () => (
        <p>
          This is your settings page. You can change your name, image, and
          anything else associated with your account.
        </p>
      ),
    },
  ]
  return (
    <>
      <ul className="nav">
        <li>
          <Link to="/users">User</Link>
        </li>
        <li>
          <Link to="/products">Product</Link>
        </li>
        <li>
          <Link to="/orders">Order</Link>
        </li>
      </ul>
      <Routes>
        {routes.map(({ path, sidebar }) => (
          <Route key={path} path={path} element={sidebar()} />
        ))}
      </Routes>
      <Routes>
        {routes.map(({ path, main }) => (
          <Route key={path} path={path} element={main()} />
        ))}
      </Routes>
    </>
  )
}

export default Dashboard
