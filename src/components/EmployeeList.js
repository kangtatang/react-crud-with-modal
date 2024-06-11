import React from "react";
import { useEffect, useState } from "react";
import MyModal from "./ModalAdd";
import ModalView from "./ModalView";
import ModalEdit from "./ModalEdit";

export default function EmployeeList() {
  const [listData, setListData] = useState(null);
  const [show, setShow] = React.useState(false);
  const [showView, setShowView] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const handleClose = () => setShow(false);
  const handleCloseView = () => setShowView(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3009/employee");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setListData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3009/employee/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedEmployee(data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleShowView = (id) => {
    setShowView(true);
    getData(id);
  };

  const handleShowEdit = (id) => {
    setShowEdit(true);
    getData(id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Anda yakin akan menghapus data ini?")) {
      try {
        const response = await fetch(`http://localhost:3009/employee/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log(`Employee ${id} successfully deleted`);
        fetchData(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting employee:", error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="card mt-4 mb-4">
        <div className="card-header">
          <h2>Daftar Karyawan</h2>
        </div>
        <div className="card-body">
          <button className="btn btn-success my-2" onClick={handleShow}>
            Tambah Data (+)
          </button>
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <td>ID</td>
                <td>Nama</td>
                <td>Telepon</td>
                <td>Email</td>
                <td>Aksi</td>
              </tr>
            </thead>
            <tbody>
              {listData &&
                listData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td>{item.telepon}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info mx-1"
                        onClick={() => handleShowView(item.id)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm btn-warning mx-1"
                        onClick={() => handleShowEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <p>Learn by doing - <strong>Digital Karawang</strong></p>
        </div>
      </div>

      <MyModal handleClose={handleClose} show={show} onSuccess={fetchData} />
      <ModalView
        handleCloseView={handleCloseView}
        showView={showView}
        datas={selectedEmployee}
      />
      <ModalEdit
        handleClose={handleCloseEdit}
        show={showEdit}
        onSuccess={fetchData}
        datas={selectedEmployee}
      />
    </div>
  );
}
