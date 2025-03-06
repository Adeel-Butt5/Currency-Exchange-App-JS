
var myHeaders = new Headers();
myHeaders.append("apikey", "TBfdkbiEM3aO24a8B4jRhhrRSfpvVxlz");




const Base_url= "https://api.exchangerate-api.com/v4/latest/";


const fromcurr =document.querySelector(".from select");
const tocurr =document.querySelector(".to select");
const msg=document.querySelector(".msg");

/* ---Access of CountryList in other js file */
const dropdowns=document.querySelectorAll(".dropdown select");

for(let select of dropdowns){
for(currcode in countryList){
   let newoption=document.createElement("option");
    newoption.innerText=currcode;
    select.append(newoption);

    if(select.name === "from" && currcode==="USD"){
        newoption.selected ="selected"
    }else if(select.name === "to" && currcode==="PKR"){
        newoption.selected ="selected"
    }
};

/*  ---Flag Change during selection---  */
select.addEventListener("change", (evt)=>{ 
    flagupdate(evt.target);
});
}


const flagupdate = (element) =>{
  let  currcode=element.value;
     let   countrycode= countryList[currcode];

     let newsrc= `https://flagsapi.com/${countrycode}/flat/64.png`;
   let img= element.parentElement.querySelector("img");
   img.src=newsrc;
}

/* --Response after clicking Button    All code will work with this*/

const btn=document.querySelector("form button");

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
/*  --  Input value will be stored in amtvalue ---*/
    let   amount =document.querySelector("input");
  let  amtvalue=amount.value;

  
    if(amtvalue === "" ||  amtvalue< 1){
        amount.value= "1";
    }

/* API fetching  */

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
       const url=`https://api.apilayer.com/exchangerates_data/convert?from=${fromcurr.value}&to=${tocurr.value}&amount=${amtvalue}`;
     let response=await fetch(url , requestOptions);
     let data=await response.json();

     if (data.success) {
        let rate = data.info.rate; 
        let finalamount = (amtvalue*rate).toFixed(2) ;
        msg.value= `${amtvalue}${fromcurr.value} = ${finalamount} ${tocurr.value}`;

      } else {
        console.log("API Response Error: ", data.error);
      }
   
});





