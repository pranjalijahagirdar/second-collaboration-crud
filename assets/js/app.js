const cl=console.log;

const studentForm = document.getElementById("studentForm")
const studentList = document.getElementById("studentList")
const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const email = document.getElementById("email")
const contact = document.getElementById("contact")
const AddStudentBtn = document.getElementById("AddStudentBtn")
const UpdateStudentBtn = document.getElementById("UpdateStudentBtn")
const spinner = document.getElementById('spinner')


const BASE_URL = `https://crud-6b7ce-default-rtdb.firebaseio.com`;
const STUDENT_URL = `${BASE_URL}/students.json`;

function showSpinner(){
    spinner.classList.remove('d-none')
}

function hideSpinner(){
    spinner.classList.add('d-none')
}

//create

function setSrNum(){
    let firstTds = [...document.querySelectorAll('#studentList tr td:first-child')];
    firstTds.forEach((td,i)=>{
        td.innerHTML = i+1
    })
}
function onStdAdd(eve){
    eve.preventDefault()
    let StdObj={
        fname:fname.value,
        lname:lname.value,
        email:email.value,
        contact:contact.value,
    }
    showSpinner()
    let xhr = new XMLHttpRequest()
    xhr.open("POST", STUDENT_URL)
    xhr.send(JSON.stringify(StdObj))
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response)
            let tr = document.createElement('tr');
            tr.id = res.name;
            tr.innerHTML = ` <td></td>
            <td>${StdObj.fname}</td>
            <td>${StdObj.lname}</td>
            <td>${StdObj.email}</td>
                            <td>${StdObj.contact}</td>
                            <td class="text-center">
                            <button onclick="onEdit(this)" class="btn text-primary btn-sm">EDIT</button>
                            </td>
                            <td class="text-center">
                            <button onclick="onDelete(this)" class="btn text-danger btn-sm">DELETE</button>
                            </td>`
                            
                            studentList.prepend(tr);
                            setSrNum()
                            studentForm.reset()
                        }else{
                            cl('something went wrong !!!')
                        }
                        hideSpinner()
        
    }
    xhr.onerror = function(){
        hideSpinner()
    }
}

studentForm.addEventListener('submit', onStdAdd)