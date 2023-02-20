/*eslint-env browser*/

// CREATE AN ARRAY OF EMPLOYEES
var employees = [
    [99123456, "Rajan Jha", 1778, "rajjha@gmail.com", "Engineering"],
    [99123457, "Puneet Patil", 1779, "punpatil@gmail.com", "Marketing"],
    [99123458, "Thanuja Pavani Satti", 2105, "thanuja@vectagmail.com", "Sales"],
    [99123459, "Chiranjivi Aulakh", 4115, "caulakh@gmail.com", "Accounting"],
    [99123454, "Sandesh Patel", 1762, "spatel@vgmail.com", "Human Resource"]
]

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY

if (localStorage.getItem('emps') !== null) employees = JSON.parse(localStorage.getItem('emps'))

// GET DOM ELEMENTS
var form = document.getElementById('addForm')
var employeeCount    = document.getElementById('empCount')
var employeeTable = document.getElementById('empTable')

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid()

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();
    // GET THE VALUES FROM THE TEXT BOXES
    var employeeID       = parseInt(document.getElementById('id').value)
    var employeeName     = document.getElementById('name').value
    var employeeExt      = parseInt(document.getElementById('extension').value)
    var employeeEmail    = document.getElementById('email').value
    var employeeDept     = document.getElementById('department').value
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    var newEmployee = [employeeID, employeeName, employeeExt, employeeEmail, employeeDept]
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee)
    // BUILD THE GRID
    buildGrid()
    // RESET THE FORM
    form.reset()
    // SET FOCUS BACK TO THE ID TEXT BOX
    form.id.focus()
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (e.target.classList.contains('delete')) {
        if (confirm('Do you want to delete the employee record?')) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        var targetRow = e.target.parentNode.parentNode.rowIndex
        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(targetRow - 1, 1)
        // BUILD THE GRID
        buildGrid()
    }
}
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH
    var newTbody = document.createElement('tbody')
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    for (var e of employees) {
    // REBUILDING THE ROW STRUCTURE
    newTbody.innerHTML += 
        `<tr>
            <td>${e[0]}</td>
            <td>${e[1]}</td>
            <td>${e[2]}</td>
            <td>${e[3]}</td>
            <td>${e[4]}</td>
            <td><button class="btn btn-sm btn-danger delete">X</button></td>
        </tr>
        `
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    employeeTable.appendChild(newTbody);
    // UPDATE EMPLOYEE COUNT
    employeeCount.value = `(${employees.length})`
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('emps', JSON.stringify(employees))
};