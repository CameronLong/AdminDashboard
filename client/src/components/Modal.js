import React, { useState } from 'react';
import '../css/Modal.css'

const Modal = ({ closeModal, onSubmit, defaultValue }) => {

    const [formState, setFormState] = useState(defaultValue || {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        name: "",
        status: "user"
    });

    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if(formState.id && formState.firstName && formState.lastName && formState.username && formState.email && formState.status){
            setErrors("");
            return true;
        } else {
            let errorFields = [];
            for(const [key, value] of Object.entries(formState)){
                if(!value){
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(", "));
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) return;

        onSubmit(formState);

        closeModal();
    };

    return (
        <div className='modal-container'
            onClick={(e) => {
                if (e.target.className === "modal-container") {
                    closeModal();
                }
            }}>
            <div className='modal'>
                <form>
                    <div className='form-group'>
                        <label htmlFor='id'>ID</label>
                        <input name='id' value={formState.id}/>
                        <label htmlFor='username'>Username</label>
                        <input name='username' value={formState.username} onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='fName'>First Name</label>
                        <input name='fName' value={formState.firstName} onChange={handleChange}/>
                        <label htmlFor='lName'>Last Name</label>
                        <input name='lName' value={formState.lastName} onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Status</label>
                        <select name='status' value={formState.status} onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    {errors && <div className='error'>{`Please include: ${errors}`}</div>}
                    <button type='submit' className='btn' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;