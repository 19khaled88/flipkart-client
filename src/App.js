import { Route, Routes } from 'react-router-dom'
import Category from './components/Admin/category'
// import Dashboard from './components/Admin/dash'
import Dashboard from './components/Admin/dashboard'
import Order from './components/Admin/order'
import Product from './components/Admin/product'
import SignIn from './components/Form/SignIn'
import SignUp from './components/Form/SignUp'
import Home from './components/Header/home'
import PrivateRoute from './components/HOC/PrivateRoute'
import Layout from './components/layout'
function App() {
  return (
    <div className="">
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute redirectTo="/signin">
                <Dashboard dashboard={'User Dashboard'} />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute redirectTo="/signin">
                {' '}
                <Order order={'Order page'} />{' '}
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute redirectTo="/signin">
                {' '}
                <Product product={'Product Page'} />{' '}
              </PrivateRoute>
            }
          />
          <Route
            path="/category"
            element={
              <PrivateRoute redirectTo="/signin">
                <Category category={'Category page'} />
              </PrivateRoute>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
