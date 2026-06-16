



//all global  varriable declaration

let allUserInfo=[];
let regForm=document.querySelector(".reg-form");
let loginForm=document.querySelector(".login-form");
let allInput=regForm.querySelectorAll("input");
let allLogingInput=loginForm.querySelectorAll("input");
let regBtn=regForm.querySelector("button");
let loginBtn=loginForm.querySelector("button");


//getting data.form.localstorage
if(localStorage.getItem("allUserInfo")!=null){
    allUserInfo=JSON.parse(localStorage.getItem("allUserInfo"));

}
console.log(allUserInfo);
//registration.coding
regForm.onsubmit=(e)=>{
e.preventDefault();

// email check 
let checkEmail=allUserInfo.find((data)=>{
    return data.email == allInput[4].value
})
if(checkEmail==undefined){
    let data={};
for(let el of allInput){
    let key=el.name;
    data[key]=el.value;
}
regBtn.innerText="Processing...";
setTimeout(()=>{
    regForm.innerText="Register"
    allUserInfo.push(data);
    localStorage.setItem("allUserInfo",JSON.stringify(allUserInfo));
    swal("Good job!",'Registration Success!','success');
},2000)
}
else{
    swal("Failed!",'Email already registered','warning');
}
}


// login coding
loginForm.onsubmit=(e)=>{
    e.preventDefault();
    if(allLogingInput[0].value!=0){
   if(allLogingInput[1].value!=""){

// check email in your data base
let checkEmail=allUserInfo.find((data)=>{
    return data.email==allLogingInput[0].value
});
if(checkEmail!=undefined){
    //password match
    if(checkEmail.password==allLogingInput[1].value){
        loginBtn.innerHTML="Please wait...";
        setTimeout(()=>{
            loginBtn.innerHTML="Login.."
            sessionStorage.setItem("user",JSON.stringify(checkEmail));
            window.location="profile/profile.html"
            checkEmail.password=null;
         
        },2000);


    }else{
       swal("Warnig","wrong password","warning");  
    }

}else{
    swal("Warnig","wrong email ","warning");
}

   }else{
     swal("Warnig","passwaord is empty","warning");
   }

    }else{
        swal("Warning","Email is empty","warning");
    }
}