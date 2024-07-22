const BASE_URL='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
const dropdowns=document.querySelectorAll('.dropdown select');

const btn=document.querySelector('form button');
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');

const msg=document.querySelector('.msg');

for(let select of dropdowns) {
    for(let country in countryList) {
        let newOption= document.createElement('option');
        newOption.innerText=country;
        newOption.value=country;
        
        if(select.name==='From' && country==='USD') {
            newOption.selected="selected";
        }
        else if(select.name==='To' && country==='INR') {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener('change', (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode=element.value;
    let countryCode=countryList[currCode];
    // console.log(countryCode);
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector('img');
    img.src=newSrc;
}

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener('load', () => {
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount=document.querySelector('.amount input');
    let amtVal=amount.value;
    if(amtVal<1 || amtVal==='') {
        amount.value='1';
        amtVal=1;
    }
    // console.log(fromCurr.value);  
    let response = await fetch(`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`)
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);

    let finalAmt=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}