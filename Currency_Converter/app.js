const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let amount = document.querySelector(".amount input");
let amtval = amount.value;
const msg = document.querySelector(".msg")



window.addEventListener("load", () => {
    updateExchangeRate();
})

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currCode;
        newoption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newoption.selected = "selected"
        }else if(select.name === "to" && currCode ==="INR"){
            newoption.selected = "selected"
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }
    fetchExchangeRate(); 
    async function fetchExchangeRate() {
        const c1 = fromCurr.value;
        const c2 = toCurr.value;
        const URL = `${BASE_URL}/${c1.toLowerCase()}.json`;
        const response = await fetch(URL);
        const data = await response.json();
        const exrate = data[c1.toLowerCase()][c2.toLowerCase()]; 
        let finalAmt = amount.value * exrate;
        msg.innerText = `${amount.value} ${c1} = ${finalAmt} ${c2}`;  
    }
}




