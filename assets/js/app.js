const cl=console.log;

const studentForm = document.getElementById("studentForm")
const studentList = document.getElementById("studentList")
const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const email = document.getElementById("email")
const contact = document.getElementById("contact")
const AddStudentBtn = document.getElementById("AddStudentBtn")
const UpdateStudentBtn = document.getElementById("UpdateStudentBtn");
const spinner = document.getElementById("spinner");


const BASE_URL = `https://crud-6b7ce-default-rtdb.firebaseio.com`;
const STUDENT_URL = `${BASE_URL}/students.json`;


function toggleSpinner(){
    spinner.classList.toggle("d-none");
}

function  onEdit(ele){
    toggleSpinner();
    const editId = ele.closest("tr").id;
    localStorage.setItem("updateId", editId);
    const editUrl = `${BASE_URL}/students/${editId}.json`;
    //api call to get edit data
    let xhr = new XMLHttpRequest();
    xhr.open("GET", editUrl);
    xhr.send(null);
    xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status < 300){
            let res = JSON.parse(xhr.response);
            //patch value
            fname.value = res.fname;
            lname.value = res.lname;
            email.value = res.email;
            contact.value = res.contact;
            AddStudentBtn.classList.add("d-none");
            UpdateStudentBtn.classList.remove("d-none");
        }
        else{
            console.log("Error while fetching data");
            Swal.fire({
                text : `Error while fetching student data to update`,
                icon : "error", 
                timer : 3000
            })
        }
        toggleSpinner()
    }

    xhr.onerror = () => {
        toggleSpinner()
        Swal.fire({
                text : `Couldnt make api call due to network error`,
                icon : "error", 
                timer : 3000
            });
    }
}

function onStudentUpdate(){
    toggleSpinner();
    const udpateId = localStorage.getItem("updateId");
    const updateUrl = `${BASE_URL}/students${udpateId}.json`
    const updatedObj = {
        fname : fname.value,
        lname : lname.value,
        email : email.value,
        contact : contact.value
    }
    let xhr = new XMLHttpRequest();
    xhr.open("PATCH",  updateUrl);
    xhr.send(JSON.stringify(updatedObj));
    xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status < 300){
            let response = JSON.parse(xhr.response);
            let updateStudent = document.getElementById(udpateId).children;
            updateStudent[1].innerHTML = response.fname;
            updateStudent[2].innerHTML = response.lname;
            updateStudent[3].innerHTML = response.email;
            updateStudent[4].innerHTML = response.contact;
            studentForm.reset();
            AddStudentBtn.classList.remove("d-none");
            UpdateStudentBtn.classList.add("d-none");
            Swal.fire({
                text : `student with id : ${udpateId} is updated successfully...`,
                icon : "success", 
                timer : 3000
            })
        } else {
            Swal.fire({
                text : `Error while updating student`,
                icon : "error", 
                timer : 3000
            })
        }
        toggleSpinner();
    }

    xhr.onerror = () => {
        toggleSpinner();
        Swal.fire({
                text : `Network error while updating the student`,
                icon : "error", 
                timer : 3000
            })
    }

}

UpdateStudentBtn.addEventListener("click", onStudentUpdate);