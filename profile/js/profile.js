//all global variable declaration
let userInfo;

let navBar=document.querySelector(".navbar-brand");
let logOutBtn=document.querySelector(".logout-btn");
//check user is login or not

if(sessionStorage.getItem("user")==null){
    window.location="../index.html";
}
userInfo=JSON.parse(sessionStorage.getItem("user"));
console.log(userInfo);
navBar.innerHTML=userInfo.hotelName

// logout coding

logOutBtn.onclick=()=>{
    alert("Are you sure..")
    setTimeout(()=>{
    swal("Warnig","your profile is completed delet","warning");  
    })
    logOutBtn.innerHTML="Please wait...";
 setTimeout(()=>{
    logOutBtn.innerHTML="Logout..";
       sessionStorage.removeItem("user");
    window.location="../index.html";
 },3000);
}