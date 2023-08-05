import { Box } from "@mui/material";
import DataGrid from "../../components/DataGrid";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import '../../css/Table.css';
import React, { useState, useEffect } from 'react'; // Importing necessary modules from the react library
import axios from 'axios'; // Importing axios module for making HTTP requests
import { BsCurrencyBitcoin } from "react-icons/bs";


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

    const handleSubmit = (newRow) => { // newRow is the input, which is the formState from the modal
        rowToEdit === null
            ? setRows([...rows, newRow]) // if the rowToEdit is still null, create a new row with the form information from the modal
            : setRows( // else change the row
                rows.map((currRow, idx) => {
                    if (idx !== rowToEdit) return currRow;

                    console.log(newRow); // this is the row after the changes are made
                    console.log(" ")
                    console.log(currRow); // this is the row before the changes are made

                    if (newRow.id === currRow.id && newRow.username === currRow.username && newRow.firstName === currRow.firstName && newRow.lastName === currRow.lastName && newRow.email === currRow.email && newRow.address1 === currRow.address1 && newRow.phone === currRow.phone && newRow.status === currRow.status) {
                        console.log("Matches");
                    } else {
                        console.log("Changes have been made");
                        axios.post('http://10.43.76.36:5001/updateUser', {
                            id: newRow.id,
                            firstName: newRow.firstName,
                            lastName: newRow.lastName,
                            username: newRow.username,
                            email: newRow.email,
                            phone: newRow.phone,
                            address1: newRow.address1,
                            status: newRow.status,
                        });
                    }

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