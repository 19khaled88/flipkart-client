import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../actions/category.actions'
import { addProduct, getProduct } from '../../actions/product.actions'
import DashboardLayout from './dashboardLayout'
const Product = (props) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productPicture, setProductImage] = useState([])
  const [productOffer, setProductOffer] = useState('')
  const dispatch = useDispatch()
  const category = useSelector((state) => state.category.data.categoryList)
  const productList = useSelector((state) => state.product.product.getProduct)
  const token = useSelector((state) => state.auth.token)
  
  const productImageSelect = (e) => {
    setProductImage([...productPicture, e.target.files[0]])
  }

  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  useEffect(() => {
    dispatch(getProduct())
  }, [])

  const createCategoryList = (categories, options = []) => {
    for (let category in categories) {
      options.push({
        value: categories[category]._id,
        name: categories[category].name,
      })
      if (categories[category].children.length > 0) {
        createCategoryList(categories[category].children, options)
      }
    }
    return options
  }

  const handleProductCreate = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', productName)
    formData.append('price', productPrice)
    formData.append('description', productDescription)
    formData.append('offer', productOffer)
    formData.append('quantity', productQuantity)
    formData.append('category', productCategory)
    // for (let pic of productPicture) {
    //   formData.append('productPicture', pic)
    // }
    // for (let pic in productPicture) {
    //   formData.append('productPicture', productPicture[pic])
    // }

    productPicture.forEach(file=>{
      formData.append("productPicture", file);
    });

    // for(let i =0; i < productPicture.length; i++) {
    //   formData.append("productPicture", productPicture[i]);
    // }


    const headers = {
      // 'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    dispatch(addProduct(formData ,headers))
    setShow(false)
  }

  const list = (productList) => {
    let pd = []
    for (let product in productList) {
      pd.push(
        <tr key={productList[product]._id}>
          <th scope="row">1</th>
          <td>{imgHandler(productList[product].productPicture)}</td>
          <td>{productList[product].name}</td>
          <td>{productList[product].price}</td>
          <td>{productList[product].quantity}</td>
          <td>{productList[product].offer}</td>
          <td>{productList[product].category}</td>
        </tr>,
      )
    }
    return pd
  }

  const imgHandler = (image) => {
    let im = []
    for (let img in image) {
     im.push(image[img].img)
    }
    return im
  }

  return (
    <DashboardLayout>
      <Container style={{ width: '98%' }}>
        <Row className="pt-3">
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products List</h3>

              <Button variant="info" onClick={handleShow}>
                Add Product
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>

                <th scope="col">Quantity</th>
                <th scope="col">Offer</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>{list(productList)}</tbody>
          </table>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <form encType="multipart/form-data" onSubmit={handleProductCreate}>
          <Modal.Body>
            <input
              className="form-control mt-1 mb-1"
              name={productName}
              placeholder={'Product Name'}
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              className="form-control mt-1 mb-1"
              name={productPrice}
              placeholder={'Product Price'}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <input
              className="form-control mt-1 mb-1"
              name={productDescription}
              placeholder={'Product Description'}
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <input
              className="form-control mt-1 mb-1"
              name={productQuantity}
              placeholder={'Product Quantity'}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
            <input
              className="form-control mt-1 mb-1"
              placeholder="Offer"
              name={productOffer}
              onChange={(e) => setProductOffer(e.target.value)}
            />
            <select
              className="form-control mt-1 mb-1"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option>Select category</option>
              {createCategoryList(category).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            {productPicture.length > 0
              ? productPicture.map((pic, index) => (
                  <div key={index}>{JSON.stringify(pic.name)}</div>
                ))
              : null}
            <input
              className="form-control mt-1 mb-1"
              type="file"
              name="productPicture"
              multiple
              onChange={productImageSelect}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save Product
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </DashboardLayout>
  )
}

export default Product
