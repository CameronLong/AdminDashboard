import { useState } from 'react';
import { Box } from "@mui/material";
import DataGrid from "../../components/DataGrid";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import '../../css/Table.css';


const Team = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const [rows, setRows] = useState([
        { id: "0", name: "Placeholder", firstName: "placeholder", lastName: "palceholder", username: "placeholder", email: "placeholder@gmail.com", status: "user" }
    ]);
    const [rowToEdit, setRowToEdit] = useState(null);

    const handleDeleteRow = (targetIndex) => {
        setRows(rows.filter((_, idx) => idx != targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);

        setModalOpen(true);
    }

    const handleNewRow = (newRow) => {
        rowToEdit === null ?
            setRows([...rows, newRow]) :
            setRows(rows.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;

                return newRow;
            }))
    }

    return (
        <Box className='' m='20px'>
            <Header title={'TEAM'} subtitle={'Managing the Team Members'} />
            <div className='table-container'>
                <DataGrid rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
                <button className="btn" onClick={() => setModalOpen(true)}>Add</button>
                {modalOpen && (
                    <Modal
                        closeModal={() => {
                            setModalOpen(false);
                            setRowToEdit(null)
                        }}
                        onSubmit={handleNewRow}
                        defaultValue={rowToEdit !== null && rows[rowToEdit]}
                    />
                )}
            </div>
        </Box>
    )
}

export default Team;