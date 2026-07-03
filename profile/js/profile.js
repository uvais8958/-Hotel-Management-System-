

//all global variable declaration
let userInfo;
let user;
let allBookingData=[];
let navBar=document.querySelector(".navbar-brand");
let logOutBtn=document.querySelector(".logout-btn");
let bookingForm=document.querySelector(".booking-form");
let allBInput=bookingForm.querySelectorAll("input");
let bookingTextArea=bookingForm.querySelector("textarea");
let bookingCloseBtn=document.querySelector(".b-model-close-btn");
let bListTBody=document.querySelector(".booking-list");
let bRegBtn=document.querySelector(".b-registration-btn")
//check user is login or not

if(sessionStorage.getItem("user")==null){
    window.location="../index.html";
}
userInfo=JSON.parse(sessionStorage.getItem("user"));
console.log(userInfo);
navBar.innerHTML=userInfo.hotelName
 user=userInfo.email.split("@")[0];

//getting data from storage
const fetchData=(key)=>{
   if(localStorage.getItem(key) !=null){
      const data=JSON.parse(localStorage.getItem(key));
      return data;
   }else{
      return[];
   }
}



//formate date function
const formatDate=(data,isTime)=>{
   
   const date=new Date(data);
   let yy=date.getFullYear();
   let mm=date.getMonth()+1;
   let dd=date.getDate();
   let time=date.toLocaleTimeString();
     dd=dd<10?"0"+dd:dd;
     mm=mm<10?"0"+mm:mm;  
  
   return (`${dd}-${mm}-${yy} ${isTime ? time:''}`);
  
}
allBookingData=fetchData(user+"_allBookingData");//



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


//start booking data
bookingForm.onsubmit=(e)=>{
   e.preventDefault();
   let data={
      notice:bookingTextArea.value,
      createdAt: new Date()

      
}
   for(let el of allBInput){
      let key=el.name;
      let value=el.value;
      data[key]=value;
   }
   allBookingData.push(data);
   localStorage.setItem(user+"_allBookingData",JSON.stringify(allBookingData));
   swal("Good job !","Booking Success",'success');
   bookingForm.reset('');
   bookingCloseBtn.click();
   showBookingData();
}


//booking delete coding

 const deleteBtnDataFunc=()=>{
let allBdelBtn=bListTBody.querySelectorAll(".del-btn");
allBdelBtn.forEach((btn,index)=>{
   btn.onclick=()=>{
   swal({
      tittle:"Are you sure?",
      text:"once deleted,you will not be able to recover this imaginary file!",
      icon:"warning",
      buttons:true,
      dengerMode:true,
   })
   .then((willDeleted)=>{
      if(willDeleted){
         allBookingData.splice(index,1);
         localStorage.setItem(user+"_allBookingData",JSON.stringify(allBookingData));
         showBookingData();
         swal("proof! your imaginary file has been save")({
            icone:"Success",

         });
      }else{
         swal("your imaginary file is safe!");
      }
   });
}
})
 

 }


//  updateBtn coding
const updateDataFunction=()=>{
   let allEditBtn=bListTBody.querySelectorAll(".edit-btn");
      allEditBtn.forEach((btn,index)=>{
      btn.onclick=()=>{
         bRegBtn.click();
         let allBBtn=bookingForm.querySelectorAll("button");
         allBBtn[0].classList.add("d-none");
         allBBtn[1].classList.remove("d-none");
         let tr=btn.parentElement.parentElement;
         let allTd=tr.querySelectorAll("td");
         
         //update data for user
         allBInput[0].value=allTd[3].innerHTML;
         allBInput[1].value=allTd[1].innerHTML;
         allBInput[2].value=allTd[2].innerHTML;
         allBInput[3].value=allTd[6].innerHTML;
         allBInput[4].value=allTd[4].innerHTML;
         allBInput[5].value=allTd[6]

         

      }
      })   
}




//show booking data
const showBookingData=()=>{
   
  allBookingData.forEach((item,index)=>{
   bListTBody.innerHTML +=` <tr>
                               <td>${index+1}</td>
                            <td class="text-nowrap">${item.location}</td>
                            <td class="text-nowrap">${item.roomNo}</td>
                            <td class="text-nowrap">${item.fullName}</td>
                            <td class="text-nowrap">${formatDate(item.checkInDate)}</td>
                            <td class="text-nowrap">${formatDate(item.checkOutDate)}</td>
                            <td class="text-nowrap">${item.totalPerson}</td>
                            <td class="text-nowrap">${item.mobile}</td>
                            <td class="text-nowrap">${item.price}</td>
                            <td class="text-nowrap">${item.notice}</td>
                            <td class="text-nowrap">${formatDate(item.createdAt,true)}</td>
                            <td class="text-nowrap">
                            <button class="btn edit-btn p-1 px-2 btn-primary" >
                             <i class="fa fa-edit"></i>
                            </button>
                            <button class="btn checkin-btn p-1 px-2 text-white btn-info" >
                                <i class="fa  fa-check"></i>
                            </button>
                            <button class="btn del-btn p-1 px-2 btn-danger" >
                                <i class="fa fa-trash"></i>
                            </button>
                            </td>
                         </tr>`
                        
  })
deleteBtnDataFunc();
updateDataFunction();
  
}
showBookingData()




