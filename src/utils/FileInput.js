import React from 'react'
import './fileInput.css'
import { Form, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'

export default function FileInput({ title, setIpfsImage }) {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    setIpfsImage(selectedFile)
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
  }
  return (
    <div id="fileInput">
      <Row>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>{title}</Form.Label>
          <Form.Control type="file" onChange={onSelectFile} />
        </Form.Group>
      </Row>
      <Row>
        {selectedFile && (
          <img id="imgPrewiew" src={preview} alt="First slide" />
        )}
      </Row>
    </div>
  )
}
