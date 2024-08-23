import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';


const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const {id}=useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const navigate = useNavigate();

    useEffect(()=>{
            if(id){
                    getEmployee(id).then((response)=>{
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                    }).catch(error=>{
                                    console.log(error);
                    })
                    }},{id});

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const saveOrUpdateEmployee = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
        const employee = { firstName, lastName, email };
            console.log(employee);

                    if(id){
                        updateEmployee(id,employee).then((response)=>{
                            console.log(response.data);
                            navigator('/employees');
                            }).catch(error=>{console.log(error);
                })}                
                else{
                try {
                const response = await createEmployee(employee);
                console.log(response.data);
                navigate('/employees');
            } catch (error) {
                console.error('Error creating employee:', error);
                // Handle errors from createEmployee here
            }
}
            
            
        }
    };

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors };
        
        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }
        
        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }
        
        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
        return <h2 className='text-center'>update Employee</h2>
                }
        else{
                return <h2 className='text-center'>Add Employee</h2>
            }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center'></h2>
                    {pageTitle()}
                    <div className='card-body'>
                        <form onSubmit={saveOrUpdateEmployee}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter first name'
                                    name='firstName'
                                    required
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={handleFirstName}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter last name'
                                    name='lastName'
                                    required
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={handleLastName}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    required
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={handleEmail}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <button type='submit' className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
