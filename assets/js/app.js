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