import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8090/api/employees';

export const listEmployees = async () => {
    try {
        const response = await axios.get(REST_API_BASE_URL);
        // Ensure that the response data is what you expect
        return response.data; // Adjust based on the actual structure of the response
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error; // Propagate the error to be handled by the component
    }
};

export const createEmployee=(employee)=>axios.post(REST_API_BASE_URL,employee);


export const getEmployee=(employeeId)=>axios.get(REST_API_BASE_URL+'/'+employeeId);

export const updateEmployee=(employeeId,employee)=>axios.put(REST_API_BASE_URL+'/'+employeeId,employee)

export const deleteEmployee=(employeeId)=>axios.delete(REST_API_BASE_URL+'/'+employeeId);
