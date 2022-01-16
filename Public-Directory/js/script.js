console.log('Javascript initialized...')



//SETTING FORM Functioning

const form = document.querySelector('form')
const search = form.children[1];
const p = document.querySelector('p')

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const city = search.value;

         fetch('http://localhost:3000/weather?location='+city).then(response => {
             response.json().then(data => {
                 console.log(data)
                 let result =''
                 if(data.errorObject){
                     result = data.errorObject
                 } else {
                     result = data.forecast
                 }
                 p.textContent = result
             })
         })
    search.value=''
})

