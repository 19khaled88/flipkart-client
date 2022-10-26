import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
const NewModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <form encType="multipart/form-data" onSubmit={props.handleCreate}>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            {props.button}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default NewModal
