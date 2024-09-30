
let employeeList = []; // Array to store employee data

// Function to show different sections
function showSection(section) {
    document.querySelectorAll('.content > div').forEach(div => {
        div.style.display = 'none';
    });
    document.getElementById(section).style.display = 'block';
}

// Function to handle form submission and store employee data
function createOrUpdateEmployee(event) {
    event.preventDefault();

    const empId = document.getElementById('employeeId').value || (employeeList.length + 1);
    const empName = document.getElementById('empName').value;
    const empEmail = document.getElementById('empEmail').value;
    const empMobile = document.getElementById('empMobile').value;
    const empDesignation = document.getElementById('empDesignation').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const courses = Array.from(document.querySelectorAll('input[name="course"]:checked')).map(c => c.value);
    const empImage = document.getElementById('empImage').files[0];

    // Check if employee is being updated
    if (empId <= employeeList.length) {
        const existingEmployee = employeeList[empId - 1];
        existingEmployee.name = empName;
        existingEmployee.email = empEmail;
        existingEmployee.mobile = empMobile;
        existingEmployee.designation = empDesignation;
        existingEmployee.gender = gender;
        existingEmployee.courses = courses.join(', ');
        existingEmployee.image = empImage ? URL.createObjectURL(empImage) : existingEmployee.image;
    } else {
        const newEmployee = {
            id: empId,
            name: empName,
            email: empEmail,
            mobile: empMobile,
            designation: empDesignation,
            gender: gender,
            courses: courses.join(', '),
            creationDate: new Date().toLocaleDateString(),
            image: empImage ? URL.createObjectURL(empImage) : 'default.png' // Use a default image if none provided
        };
        employeeList.push(newEmployee);
    }

    // Reset form
    resetForm();
    renderEmployeeTable();
}

// Function to reset the form
function resetForm() {
    document.getElementById('employeeId').value = '';
    document.getElementById('empName').value = '';
    document.getElementById('empEmail').value = '';
    document.getElementById('empMobile').value = '';
    document.getElementById('empDesignation').value = 'Developer';
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.querySelectorAll('input[name="course"]').forEach(course => {
        course.checked = false;
    });
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('empImage').value = '';
    document.getElementById('formTitle').innerText = 'Create Employee';
    document.getElementById('submitBtn').innerText = 'Submit'; 
}

// Function to render employee table
function renderEmployeeTable() {
    const tbody = document.getElementById('employeeTable').querySelector('tbody');
    tbody.innerHTML = '';

    document.getElementById('employee-count').innerText = `Total Employees: ${employeeList.length}`;

    employeeList.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td><img src="${emp.image}" alt="${emp.name}" width="50"></td>
            <td>${emp.name}</td>
            <td><a href="mailto:${emp.email}" class="email-link">${emp.email}</a></td>
            <td>${emp.mobile}</td>
            <td>${emp.designation}</td>
            <td>${emp.gender}</td>
            <td>${emp.courses}</td>
            <td>${emp.creationDate}</td>
            <td>
                <button onclick="editEmployee(${emp.id})">Edit</button>
                <button onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to filter employees
function filterEmployees() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredEmployees = employeeList.filter(emp => emp.name.toLowerCase().includes(searchTerm));
    renderFilteredEmployeeTable(filteredEmployees);
}

// Function to render filtered employee table
function renderFilteredEmployeeTable(filteredEmployees) {
    const tbody = document.getElementById('employeeTable').querySelector('tbody');
    tbody.innerHTML = '';

    document.getElementById('employee-count').innerText = `Total Employees: ${filteredEmployees.length}`;

    filteredEmployees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td><img src="${emp.image}" alt="${emp.name}" width="50"></td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.mobile}</td>
            <td>${emp.designation}</td>
            <td>${emp.gender}</td>
            <td>${emp.courses}</td>
            <td>${emp.creationDate}</td>
            <td>
                <button onclick="editEmployee(${emp.id})">Edit</button>
                <button onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to show image preview
function showImagePreview(event) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    imagePreview.style.display = 'block';


}

// Function to edit employee
function editEmployee(id) {
    const employee = employeeList.find(emp => emp.id === id);

    document.getElementById('employeeId').value = employee.id;
    document.getElementById('empName').value = employee.name;
    document.getElementById('empEmail').value = employee.email;
    document.getElementById('empMobile').value = employee.mobile;
    document.getElementById('empDesignation').value = employee.designation;

    document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = true;

    const selectedCourses = employee.courses.split(', ');
    document.querySelectorAll('input[name="course"]').forEach(course => {
        course.checked = selectedCourses.includes(course.value);
    });

    document.getElementById('imagePreview').src = employee.image;
    document.getElementById('imagePreview').style.display = 'block';

    document.getElementById('formTitle').innerText = 'Edit Employee';
    document.getElementById('submitBtn').innerText = 'Update';
    document.getElementById('empImage').removeAttribute('required');
    showSection('employeeCreate');
}

// Function to delete employee
function deleteEmployee(id) {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
        employeeList = employeeList.filter(emp => emp.id !== id);
        employeeList.forEach((employee, index) => {
employee.id = index + 1; // Reassign the ID starting from 1
});
        renderEmployeeTable();
    }
}

// Function to handle logout (just a placeholder for now)
function logout() {
    alert("You have logged out successfully!");
    // Implement actual logout logic here
    window.location.href = 'login.html';
}

// Show the home section by default
showSection('home');
