import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalView({ handleCloseView, showView, datas }) {
  return (
    <>
      <Modal show={showView} onHide={handleCloseView}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Data #{datas.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped">
            <tbody>
              <tr>
                <td className="fw-bold">Nama</td>
                <td>{datas.nama}</td>
              </tr>
              <tr>
                <td className="fw-bold">Telepon</td>
                <td>{datas.telepon}</td>
              </tr>
              <tr>
                <td className="fw-bold">Email</td>
                <td>{datas.email}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseView}>
            Tutup
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalView;
