package com.example.ems.service;

import java.util.List;

import com.example.ems.dto.Employeedto;

public interface EmployeeService {
	Employeedto createEmployee(Employeedto employeedto);
	
	Employeedto getEmployeeById(Long employeeId);
	
	List<Employeedto> getAllEmployees();
	
	Employeedto updateEmployee(Long employeeId,Employeedto updateEmployee);
	
	void deleteEmployee(Long employeeId);

}
