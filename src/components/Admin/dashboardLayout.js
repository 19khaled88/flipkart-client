import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import '../../App.css'
import '../../css/dashboard.css'
const DashboardLayout = (props) => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <ul>
            <li>
              <NavLink to={`/`}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={`/products`}>Products</NavLink>
            </li>
            <li>
              <NavLink to={`/orders`}>Orders</NavLink>
            </li>
            <li>
              <NavLink to={`/category`}>Category</NavLink>
            </li>
          </ul>
        </Col>
        <Col
          md={10}
          style={{ marginLeft: 'auto', paddingTop: '30px', marginTop: '20px' }}
        >
          {props.children}
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardLayout
