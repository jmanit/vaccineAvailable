let centers=[]

//let today,d,m,y
const cards=document.querySelector(".cards")
const searchbtn=document.querySelector(".searchBox").querySelector("button")
var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = dd+'-'+mm+'-'+yyyy;
console.log(today);

function  cowinapi(pincode){
    var f=0;
    let url=`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${today}`
    const xhr=new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onload=function(){
        if(this.status=== 200){
            let data=JSON.parse(this.responseText);
          
            if(data.sessions!== []){
              //  alert("data not found")
              
               data.sessions.map((e,i)=>{
                
                      let centerInfo = [
                          e.name,
                          e.address,
                          e.vaccine,
                          e.date,
                          e.min_age_limit,
                          e.available_capacity,
                          e.block_name,
                          e.district_name,
                          e.slots,
                      ];
                      //console.log(centerInfo);
                      centers.push(centerInfo);
                      if(centers[i][4]===18 || centers[i][5]>0 && f===0){
                     setTimeout(function() { alert(`Vaccine available at ${centers[i][0]}`); }, 1000);
                     f=1;
                      }
                      let code = `
                      <div class="card">
                      <h1>
                      <span class="category">Center Name - </span>
                      ${centers[i][0]}
                    </h1>
                    <div class="innerCard">
                    <h3>
                    <span class="category">Center Address - </span>
                    ${centers[i][1]}
                  </h3>
                  <h3>
                    <span class="category">Vaccine Name - </span>
                    ${centers[i][2]}
                  </h3>
                  <h3>
                    <span class="category">Date Of Vaccination - </span>
                    ${centers[i][3]}
                  </h3>
                  <h3>
                    <span class="category">Minimum Age Limit - </span>
                    ${centers[i][4]}
                  </h3>
                  <h3>
                    <span class="category">Available Capacity - </span>
                    ${centers[i][5]}
                  </h3>
                  <h3>
                    <span class="category">Block Name - </span>
                    ${centers[i][6]}
                  </h3>
                  <h3>
                    <span class="category">District Name - </span>
                    ${centers[i][7]}
                  </h3>
                  <h3>
                    <span class="category">Available Slots - </span>
                     ${centers[i][8].join(" | ")}
                  </h3>
                    </div>
                    </div>`;
                       cards.innerHTML+=code;
                      
               });
               if(data.sessions.length === 0){
                alert("No Vaccinations Available")
              }
               centers=[]
            }
          
            //console.log(data);
        }
        else{
            alert("error");
        }
    };
    xhr.send()
}
//cowinapi()
const input=document.querySelector("#input")
/*function my(){
    let pincode=input.value;
    cards.innerHTML="";
    if(pincode==="")
     alert("enter pincode");
     else if(pincode!==""){
        cards.innerHTML="";
         cowinapi(pincode)
     }
}*/
input.addEventListener("keypress",(e)=>{
if(e.which===13){
    //location.reload()
    let pincode=input.value;
    cards.innerHTML="";
    if(pincode==="")
     alert("enter pincode")
     else if(pincode!==""){
         cowinapi(pincode)
        // location.reload()
     }
}
})
searchbtn.addEventListener("click",()=>{
    let pincode=input.value;
    cards.innerHTML="";
    if(pincode==="")
     alert("enter pincode")
     else if(pincode!==""){
         cowinapi(pincode)
        // location.reload()
     }

})