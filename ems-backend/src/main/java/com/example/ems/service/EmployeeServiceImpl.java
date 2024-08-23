package com.example.ems.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ems.dto.Employeedto;
import com.example.ems.entity.Employee;
import com.example.ems.exception.ResourceNotFoundException;
import com.example.ems.mapper.EmployeeMapper;
import com.example.ems.repository.EmployeeRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
	private EmployeeRepository employeeRepository;

    @Override
    public Employeedto createEmployee(Employeedto employeedto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeedto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public Employeedto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<Employeedto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                        .map(EmployeeMapper::mapToEmployeeDto)
                        .collect(Collectors.toList());
    }

	@Override
	public Employeedto updateEmployee(Long employeeId, Employeedto updateEmployee) {
		// TODO Auto-generated method stub
		Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("employee not exists for the given id"+employeeId));
		employee.setEmail(updateEmployee.getEmail());
		employee.setFirstName(updateEmployee.getFirstName());
		employee.setLastName(updateEmployee.getLastName());
		Employee updatedEmployeeObj=employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
	}

	@Override
	public void deleteEmployee(Long employeeId) {
		// TODO Auto-generated method stub
		Employee employee=employeeRepository.findById(employeeId).orElseThrow(
				()->new ResourceNotFoundException("Employee not found the id"+employeeId));
		employeeRepository.deleteById(employeeId);
		
	}
}
