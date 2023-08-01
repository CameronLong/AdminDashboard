import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import "../css/Table.css";

const DataGrid = ({ deleteRow, editRow }) => {
    const [teamArray, setTeamArray] = useState([]);
    useEffect(() => {
        const getTeam = async () => {
            await axios.get('http://localhost:5001/getTeam')
                // .then((response) => {
                //     console.log("Team: " + response.data.team);
                // })
                .then((response) => setTeamArray(response.data.team))
        }
        getTeam();
    }, []);

    return <>
        <div className='table-wrapper'>
            <table className='table'>
                <thead className='expand'>
                    <tr className='expand'>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teamArray.map((row, idx) => {

                            const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);
                            return (
                                <tr key={idx} className='table-row'>
                                    <td>{row.id}</td>
                                    <td className='expand'>{row.firstName}</td>
                                    <td className='expand'>{row.lastName}</td>
                                    <td className='expand'>{row.username}</td>
                                    <td className='expand'>{row.email}</td>
                                    <td>
                                        <span className={`label label-${row.status}`}>{statusText}</span>
                                    </td>
                                    <td>
                                        <span className='actions'>
                                            <BsFillTrashFill className='delete-btn' onClick={() => deleteRow(idx)}/>
                                            <BsFillPencilFill onClick={() => editRow(idx)} />
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
}

export default DataGrid;
