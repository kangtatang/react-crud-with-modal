import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validationSchema = Yup.object({
  nama: Yup.string().min(5, 'Nama harus memiliki minimal 5 karakter').required("Nama is required"),
  telepon: Yup.string().matches(/^[0-9]+$/, 'Telepon harus berupa angka').required("Telepon is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

function MyModal({ handleClose, show, onSuccess }) {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ nama: "", telepon: "", email: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const response = await fetch("http://localhost:3009/employee", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Data successfully posted:", data);
                onSuccess();
                resetForm();
                handleClose();
                // Optionally, you can update the state or perform other actions here
              } catch (error) {
                console.error("Error posting data:", error.message);
                handleClose();
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="nama">Nama</label>
                  <Field className="form-control" name="nama" type="text" />
                  <ErrorMessage className="text-danger" name="nama" component="div" />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="telepon">Telepon</label>
                  <Field className="form-control" name="telepon" type="text" />
                  <ErrorMessage className="text-danger" name="telepon" component="div" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <Field className="form-control" name="email" type="email" />
                  <ErrorMessage className="text-danger" name="email" component="div" />
                </div>
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;
