import { Box } from "@mui/material";
import DataGrid from "../../components/DataGrid";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import '../../css/Table.css';
import React, {useState, useEffect} from 'react'; // Importing necessary modules from the react library
import axios from 'axios'; // Importing axios module for making HTTP requests


const Team = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const [rows, setRows] = useState([]); // Declaring a state variable teamArray and setting its initial value as an empty array
    useEffect(() => {
        const getTeam = async () => { // Defining an asynchronous function that fetches data from the server
            await axios.get('http://localhost:5001/getTeam') // Making a GET request to 'http://localhost:5001/getTeam'
                .then((response) => setRows(response.data.team)) // Updating the state variable teamArray with the response data
        }
        getTeam(); // Calling the asynchronous function getTeam inside the useEffect hook
        
    }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

    const [rowToEdit, setRowToEdit] = useState(null);

    const handleDeleteRow = (targetIndex) => {
        setRows(rows.filter((_, idx) => idx != targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);

        setModalOpen(true);
    }

    const handleSubmit = (newRow) => {
        rowToEdit === null
            ? setRows([...rows, newRow])
            : setRows(
                rows.map((currRow, idx) => {
                    if (idx !== rowToEdit) return currRow;

                return newRow;
            })
        );
    };

    return (
        <Box className='' m='20px'>
            <Header title={'TEAM'} subtitle={'Managing the Team Members'} />
            <div className='table-container'>
                <DataGrid rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
                {modalOpen && (
                    <Modal
                        closeModal={() => {
                            setModalOpen(false);
                            setRowToEdit(null);
                        }}
                        onSubmit={handleSubmit}
                        defaultValue={rowToEdit !== null && rows[rowToEdit]}
                    />
                )}
            </div>
        </Box>
    )
}

export default Team;