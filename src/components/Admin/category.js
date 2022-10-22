import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, getAllCategory } from '../../actions/category.actions'
import DashboardLayout from './dashboardLayout'

const Category = (props) => {
  const [show, setShow] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [categoryImage, setCategoryImage] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const dispatch = useDispatch()
  const category = useSelector((state) => state.category.data.categoryList)
  const token = useSelector((state) => state.auth.token)

  // const subCategory1 = (subCate) => {
  //   let subCat = []
  //   for (let cat in subCate) {
  //     for (let c in category[cat].children) {
  //       console.log(category[cat].children[c])
  //       subCat.push(category[cat].children[c].name)
  //     }
  //   }
  //   return subCat
  // }
  // subCategory1(category)

  const subCategory = (subCate) => {
    let subCat = []

    for (let c in subCate) {
      subCat.push(
        <li key={c}>
          {subCate[c].name}
          {subCate[c].children.length > 0 ? (
            <ul>{subCategory(subCate[c].children)}</ul>
          ) : null}
        </li>,
      )
    }

    return subCat
  }

  // for (let cat in category) {
  //   for (let c in category[cat].children) {
  //     console.log(category[cat].children[c].name)
  //   }
  // }
  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  const renderCategories = (categories) => {
    let allCategory = []
    for (let cat in categories) {
      allCategory.push(
        <li key={cat}>
          {category[cat].name}
          {category[cat].children.length > 0 ? (
            <ul>{subCategory(category[cat].children)}</ul>
          ) : null}
        </li>,
      )
    }
    return allCategory
  }

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

  const handleCateImage = (e) => {
    setCategoryImage(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    const fileReader = new FileReader()
    const img = categoryImage.name
    formData.append('name', categoryName)
    formData.append('parentId', parentCategoryId)
    formData.append('categoryImage', categoryImage)
    // console.log(categoryImage)
    const data = {
      name: categoryName,
      parentId: parentCategoryId,
      categoryImage: categoryImage,
    }

    const config = {
      headers: {
        // 'content-type': 'multipart/form-data',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }

    if (token) {
      dispatch(createCategory(formData))
    }
    setShow(false)
  }

  return (
    <DashboardLayout>
      <Container style={{ width: '90%' }}>
        <Row className="pt-3">
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>

              <Button variant="info" onClick={handleShow}>
                Add Category
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>
              {renderCategories(category)}
              {/* {JSON.stringify(createCategoryList(category))} */}
            </ul>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              className="form-control mt-1 mb-1"
              value={categoryName}
              placeholder={'Category Name'}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <select
              className="form-control mt-1 mb-1"
              onChange={(e) => setParentCategoryId(e.target.value)}
            >
              <option>Select category</option>
              {createCategoryList(category).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <input
              className="form-control mt-1 mb-1"
              type="file"
              name="categoryImage"
              onChange={handleCateImage}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save Category
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </DashboardLayout>
  )
}

export default Category
