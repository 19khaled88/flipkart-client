import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosCheckboxOutline,
} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, getAllCategory } from '../../actions/category.actions'
import NewModal from '../Modal'
import EditCategoryModal from '../Modal/EditCategoryModal'
import DashboardLayout from './dashboardLayout'
const Category = (props) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [categoryName, setCategoryName] = useState('')
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [categoryImage, setCategoryImage] = useState('')
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])
  const [checkedArray, setCheckArray] = useState([])
  const [checkedExpanded, setExpandedArray] = useState([])
  const [editShow, setEditShow] = useState(false)
  const handleEditClose = () => setEditShow(false)

  const dispatch = useDispatch()
  const category = useSelector((state) => state.category.data.categoryList)
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    dispatch(getAllCategory())
  }, [dispatch])

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

  const handleEditSubmit = (e) => {
    e.preventDefault()
  }

  const renderCategories = (categories) => {
    let array = []
    for (let category in categories) {
      array.push(
        {
          label: categories[category].name,
          value: categories[category]._id,
          children:
            categories[category].children.length > 0 &&
            renderCategories(categories[category].children),
        },

        // <li key={categories[category]._id}>
        //   {categories[category].name}
        //   {categories[category].children.length > 0 ? (
        //     <ul> {test3Again(categories[category].children)} </ul>
        //   ) : null}
        // </li>,
      )
    }
    return array
  }

  const handleEditShow = (e) => {
    console.log({ checked, expanded })
    setEditShow(true)
  }

  return (
    <DashboardLayout>
      <Container style={{ width: '98%' }}>
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
              {/* renderCategories(category) */}
              <CheckboxTree
                nodes={renderCategories(category)}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                icons={{
                  check: <ImCheckboxChecked />,
                  uncheck: <ImCheckboxUnchecked />,
                  halfCheck: <IoIosCheckboxOutline />,
                  expandClose: <IoIosArrowForward />,
                  expandOpen: <IoIosArrowDown />,
                }}
              />
            </ul>

            <button style={{ marginRight: '3px' }} onClick={handleEditShow}>
              Edit
            </button>
            <button style={{ marginLeft: '3px' }}>Delete</button>
          </Col>
        </Row>
      </Container>

      {/* <Modal show={show} onHide={handleClose}>
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
      </Modal> */}

      <NewModal
        title="Add Category"
        show={show}
        handleClose={handleClose}
        handleCreate={handleSubmit}
        button="Save Category"
      >
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
      </NewModal>

      <EditCategoryModal
        show={editShow}
        onHide={handleEditClose}
        title="Edit Category"
        button="Edit"
      >
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
      </EditCategoryModal>

      {/* <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <form encType="multipart/form-data" onSubmit={handleEditSubmit}>
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
              </Modal> */}
    </DashboardLayout>
  )
}

export default Category
