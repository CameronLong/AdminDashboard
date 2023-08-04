import React from 'react'; // Importing necessary modules from the react library
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs"; // Importing specific icons from react-icons library
import "../css/Table.css"; // Importing custom CSS file

const DataGrid = ({ rows, deleteRow, editRow }) => { 

    return <> {/* Using a React fragment to wrap multiple elements without introducing an additional node */}
        <div className='table-wrapper'> { /* Creating a div element with class name 'table-wrapper' */}
            <table className='table'> { /* Creating a table element with class name 'table' */}
                <thead className='expand'> {/* Creating the table header with class name 'expand' */}
                    <tr className='expand'> {/* Creating a table row with class name 'expand' */}
                        <th>ID</th> {/* Creating a table heading cell with text 'ID' */}
                        <th>First Name</th> {/* Creating a table heading cell with text 'First Name' */}
                        <th>Last Name</th> {/* Creating a table heading cell with text 'Last Name' */}
                        <th>Username</th> {/* Creating a table heading cell with text 'Username' */}
                        <th>Email</th> {/* Creating a table heading cell with text 'Email' */}
                        <th>Status</th> {/* Creating a table heading cell with text 'Status' */}
                        <th>Actions</th> {/* Creating a table heading cell with text 'Actions' */}
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map((row, idx) => { {/* Using the map function to iterate over each element in teamArray and render a table row for each element */}

                            const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1); {/* Capitalizing the first letter of the status string */}
                            return (
                                <tr key={idx} className='table-row'> {/* Creating a table row with a unique key value and class name 'table-row' */}
                                    <td>{row.id}</td> {/* Creating a table data cell with the id value */}
                                    <td className='expand'>{row.firstName}</td> {/* Creating a table data cell with the firstName value */}
                                    <td className='expand'>{row.lastName}</td> {/* Creating a table data cell with the lastName value */}
                                    <td className='expand'>{row.username}</td> {/* Creating a table data cell with the username value */}
                                    <td className='expand'>{row.email}</td> {/* Creating a table data cell with the email value */}
                                    <td>
                                        <span className={`label label-${row.status}`}>{statusText}</span> {/* Creating a span element with dynamic class name and statusText as its content */}
                                    </td>
                                    <td>
                                        <span className='actions'> {/* Creating a span element with class name 'actions' */}
                                            <BsFillTrashFill className='delete-btn' onClick={() => deleteRow(idx)} /> {/* Using the deleteRow function when the trash icon is clicked */}
                                            <BsFillPencilFill onClick={() => editRow(idx)} /> {/* Using the editRow function when the pencil icon is clicked */}
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

export default DataGrid; // Exporting the DataGrid component
