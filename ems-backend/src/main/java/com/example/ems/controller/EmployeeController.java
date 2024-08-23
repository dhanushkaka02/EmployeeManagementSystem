package com.example.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ems.dto.Employeedto;
import com.example.ems.service.EmployeeService;

import lombok.AllArgsConstructor;


@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/employees")

public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping
	public ResponseEntity<Employeedto> createEmployee(@RequestBody Employeedto employeedto)
	{
		Employeedto savedEmployee=employeeService.createEmployee(employeedto);
		return new ResponseEntity<>(savedEmployee,HttpStatus.CREATED);
		
	}
	
	//get employee rest api
	@GetMapping("{id}")
	public ResponseEntity<Employeedto> getEmployeeById(@PathVariable("id") Long employeeId)
	{
		Employeedto employeedto=employeeService.getEmployeeById(employeeId); 
		return ResponseEntity.ok(employeedto);
	}
	
	@GetMapping
	public ResponseEntity<List<Employeedto>> getAllEmployees(){
		List<Employeedto> employees=employeeService.getAllEmployees();
		return ResponseEntity.ok(employees);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Employeedto> updateEmployee(@PathVariable("id") Long employeeId,@RequestBody Employeedto updateEmployee)
	{
		Employeedto employeedto=employeeService.updateEmployee(employeeId, updateEmployee);
		return ResponseEntity.ok(employeedto);
	}
	
	//deleting emplloyee rest api for delete
	@DeleteMapping("{id}")
	public ResponseEntity<String>deleteEmployee(@PathVariable("id") Long employeeId)
	{
		employeeService.deleteEmployee(employeeId);
		return ResponseEntity.ok("Employee deleted successfully");
	}

}
