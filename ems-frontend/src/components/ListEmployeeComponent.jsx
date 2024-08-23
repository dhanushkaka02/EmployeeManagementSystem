import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';


export default function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigator=useNavigate();


function getAllEmployees(){
 const fetchEmployees = async () => {
            try {
                console.log('Calling listEmployees...');
                const response = await listEmployees();
                console.log('API Response:', response);

                if (response && Array.isArray(response)) {
                    setEmployees(response);
                } else {
                    throw new Error('Unexpected response structure');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching employees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }



    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                console.log('Calling listEmployees...');
                const response = await listEmployees();
                console.log('API Response:', response);

                if (response && Array.isArray(response)) {
                    setEmployees(response);
                } else {
                    throw new Error('Unexpected response structure');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching employees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) {
        return <div className='container text-center'>Loading...</div>;
    }

    if (error) {
        return <div className='container text-center'>Error: {error}</div>;
    }

    

    function addNewEmployee(){
navigator('/add-employee')

}
    function updateEmployee(id){
    navigator(`/edit-employee/${id}`);}

    function removeEmployee(id)
    {
      console.log(id);
      deleteEmployee(id).then((response)=>{getAllEmployees()}).catch(error=>{console.log(error);})
}

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <table className='table table-striped table-bordered'>
                <button className='btn btn-primary mb-2 mt-2' onClick={addNewEmployee}>Add Employee</button>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <tr>Actions</tr>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                  <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button></td>
                                  <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)} >Delete</button>
                                           </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className='text-center'>No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
