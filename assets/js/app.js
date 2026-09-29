const cl=console.log;

const studentForm = document.getElementById("studentForm")
const studentList = document.getElementById("studentList")
const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const email = document.getElementById("email")
const contact = document.getElementById("contact")
const AddStudentBtn = document.getElementById("AddStudentBtn")
const UpdateStudentBtn = document.getElementById("UpdateStudentBtn")


const BASE_URL = `https://crud-6b7ce-default-rtdb.firebaseio.com`;
const STUDENT_URL = `${BASE_URL}/students.json`;


// templating
function Templating(arr){
    let result=``;
    arr.forEach((ele,i )=>{
        result+=`<tr id="${ele.id}">
                            <td>${i+1}</td>
                            <td>${ele.fname}</td>
                            <td>${ele.lname}</td>
                            <td>${ele.email}</td>
                            <td>${ele.contact}</td>
                            <td class="text-center">
                                <button onclick="onEdit(this)" class="btn text-primary btn-sm">EDIT</button>
                            </td>
                            <td class="text-center">
                                <button onclick="onDelete(this)" class="btn text-danger btn-sm">DELETE</button>
                            </td>
                        </tr>
        `
        
    });
    studentList.innerHTML=result;
}




let StdArr=[];
// read functnality
function OnreadTR(arr){
    let xhr= new XMLHttpRequest();
    xhr.open("GET",STUDENT_URL);
    xhr.send(null);
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <=299){
            let res = JSON.parse(xhr.response)
            for(const key in res){
                res[key].id=key;
                StdArr.unshift(res[key])
            }
            Templating(StdArr);
        }
    }
}
OnreadTR()

//delete
function onDelete(ele){

 Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed){
let DELETE_ID = ele.closest("tr").id;
    cl(DELETE_ID)

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${BASE_URL}/students/${DELETE_ID}.json`);
    xhr.send(null);
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response);
            cl(res)
            ele.closest("tr").remove();
        }else{
            cl("error")
        }
    }
  }
});




    
}












