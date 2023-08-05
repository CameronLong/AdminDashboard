import React, { useState } from 'react';
import '../css/Modal.css'

const Modal = ({ closeModal, onSubmit, defaultValue }) => {

    const [formState, setFormState] = useState(defaultValue || {
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        address1: "",
        username: "",
        email: "",
        status: "user"
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    };

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
                        <input name='id' value={formState.id} onChange={handleChange}/>
                        <label htmlFor='username'>Username</label>
                        <input name='username' value={formState.username} onChange={handleChange}/>
                        <label htmlFor='email'>Email</label>
                        <input name='email' value={formState.email} onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='fName'>First Name</label>
                        <input name='firstName' value={formState.firstName} onChange={handleChange}/>
                        <label htmlFor='lName'>Last Name</label>
                        <input name='lastName' value={formState.lastName} onChange={handleChange}/>
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input name='phoneNumber' value={formState.phone} onChange={handleChange}/>
                        <label htmlFor='address'>Address</label>
                        <input name='address' value={formState.address1} onChange={handleChange}/>
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