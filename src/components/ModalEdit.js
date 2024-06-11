import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validationSchema = Yup.object({
  nama: Yup.string()
    .min(5, "Nama harus memiliki minimal 5 karakter")
    .required("Nama is required"),
  telepon: Yup.string()
    .matches(/^[0-9]+$/, "Telepon harus berupa angka")
    .required("Telepon is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

function ModalEdit({ handleClose, show, onSuccess, datas }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data #{datas.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize
            initialValues={{
              nama: datas.nama || "",
              telepon: datas.telepon || "",
              email: datas.email || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const response = await fetch(
                  `http://localhost:3009/employee/${datas.id}`,
                  {
                    method: "PATCH", // Menggunakan metode PATCH untuk edit
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values), // Mengirim data yang akan diubah
                  }
                );

                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Data successfully updated:", data);
                onSuccess();
                resetForm();
                handleClose();
                // Opsional: Anda dapat memperbarui state atau melakukan tindakan lain di sini
              } catch (error) {
                console.error("Error updating data:", error.message);
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
                  <ErrorMessage
                    className="text-danger"
                    name="nama"
                    component="div"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="telepon">Telepon</label>
                  <Field className="form-control" name="telepon" type="text" />
                  <ErrorMessage
                    className="text-danger"
                    name="telepon"
                    component="div"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <Field className="form-control" name="email" type="email" />
                  <ErrorMessage
                    className="text-danger"
                    name="email"
                    component="div"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
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

export default ModalEdit;
