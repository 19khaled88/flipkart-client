import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { userList } from '../../actions/user.actions'
import '../../App.css'
import '../../css/dashboard.css'
import NewModal from '../Modal'
import DashboardLayout from './dashboardLayout'
const Dashboard = (props) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const dispatch = useDispatch()
  const listUsers = useSelector((state) => state.userList)

  useEffect(() => {
    dispatch(userList())
  }, [])
  console.log(listUsers)
  return (
    <DashboardLayout>
      <Container style={{ width: '98%', paddingTop: '10', marginTop: '10' }}>
        <Row className="pt-3">
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{props.dashboard}</h3>

              <Button variant="info" onClick={handleShow}>
                Add User
              </Button>
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>

      <NewModal
        title="Add User"
        show={show}
        handleClose={handleClose}
        button="Save User"
      ></NewModal>
    </DashboardLayout>
  )
}

export default Dashboard
