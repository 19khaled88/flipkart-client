import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../actions/category.actions'
import {
  addProduct,
  getProduct,
  showProductDetails,
} from '../../actions/product.actions'
import '../../css/product.css'
import NewModal from '../Modal'
import DetailsModal from '../Modal/DetailsModal'
import DashboardLayout from './dashboardLayout'
const Product = (props) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [detailsShow, setDetailsShow] = useState(false)
  const handleDetailsClose = () => setDetailsShow(false)
  const handleDetailsShow = () => setDetailsShow(true)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productPicture, setProductImage] = useState([])
  const [productOffer, setProductOffer] = useState('')
  const [details, setDetails] = useState('')
  const [detailsId, setDetailId] = useState('')
  const dispatch = useDispatch()
  const category = useSelector((state) => state.category.data.categoryList)
  const productList = useSelector((state) => state.product.product.getProduct)
  const token = useSelector((state) => state.auth.token)
  const productDetails = useSelector((state) => state.productDetails)

  const productImageSelect = (e) => {
    setProductImage([...productPicture, e.target.files[0]])
  }

  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  useEffect(() => {
    dispatch(getProduct())
  }, [])

  useEffect(() => {
    dispatch(showProductDetails())
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

    productPicture.forEach((file) => {
      formData.append('productPicture', file)
    })

    // for(let i =0; i < productPicture.length; i++) {
    //   formData.append("productPicture", productPicture[i]);
    // }

    const headers = {
      // 'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    dispatch(addProduct(formData, headers))
    setShow(false)
  }

  const list = (productList) => {
    let pd = []
    for (let product in productList) {
      pd.push(
        <tr key={productList[product]._id}>
          <th scope="row">{allProducts(productList)}</th>
          {/* <th scope="row">1</th> */}
          {/* <td>{imgHandler(productList[product].productPicture)}</td> */}
          <td>{productList[product].name}</td>
          <td>{productList[product].price}</td>
          <td>{productList[product].quantity}</td>
          {/* <td>{productList[product].offer}</td>
          <td>{productList[product].category}</td> */}
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

  const showDetails = (id) => {
    setDetailId(id)
    handleDetailsShow()
  }

  const allProducts = (productList) => {
    let array = []
    if (productList !== undefined) {
      productList.forEach((element, index) => {
        array.push(
          <tr key={index} onClick={() => showDetails(element._id)}>
            <td>{parseInt(index) + 1}</td>
            <td>{element.name}</td>
            <td>{element.price}</td>
            <td>{element.quantity}</td>
          </tr>,
        )
      })
      // console.log(Object.keys(productList).length)
    }
    return array
  }

  const detailsOfProduct = (details) => {
    for (let data of details) {
      let id = data._id

      if (id === detailsId) {
        return (
          <>
            <Row>
              <Col md="6">
                <label className="key">Name</label>
                <p className="value" key={data._id}>
                  {data.name}
                </p>
              </Col>
              <Col md="6">
                <label className="key">Price</label>
                <p className="value" key={data._id}>
                  {data.price}
                </p>
              </Col>
              <Col md="6">
                <label className="key">Quantity</label>
                <p className="value" key={data._id}>
                  {data.quantity}
                </p>
              </Col>
              <Col md="6">
                <label className="key">Category</label>
                <p className="value" key={data._id}>
                  {data.category.name}
                </p>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <label className="key">Description</label>
                <p className="value" key={data._id}>
                  {data.description}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="key">Product Image</label>
                <div style={{ display: 'flex' }}>
                  {data.productPicture.map((picture) => (
                    <div className="productImgContainer">
                      <img
                        src={`http://localhost:8000/public/${picture.img}`}
                        alt={`http://localhost:8000/public/${picture.img}`}
                      />
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </>
        )
      }
    }
  }

  return (
    <DashboardLayout>
      <Container style={{ width: '98%', paddingTop: '10', marginTop: '10' }}>
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
                <th scope="col">No.</th>

                <th scope="col">Name</th>
                <th scope="col">Price</th>

                <th scope="col">Quantity</th>
              </tr>
            </thead>
            {/* <tbody>{list(productList)}</tbody> */}
            <tbody>{allProducts(productList)}</tbody>
          </table>
        </Row>
      </Container>

      {/* <Modal show={show} onHide={handleClose}>
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
      </Modal> */}

      <NewModal
        title="Add Product"
        show={show}
        handleClose={handleClose}
        handleCreate={handleProductCreate}
        button="Save Product"
      >
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
      </NewModal>

      <DetailsModal
        title="Product Details"
        detailsShow={detailsShow}
        handleDetailsClose={handleDetailsClose}
      >
        {detailsOfProduct(productDetails.data)}
      </DetailsModal>
    </DashboardLayout>
  )
}

export default Product
