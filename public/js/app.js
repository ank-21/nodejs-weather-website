fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



const weatherForm = document.querySelector('#form1')
const searched = document.querySelector('#locationInput')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')



weatherForm.addEventListener('submit',(e) => {

    e.preventDefault()

    const location = searched.value
   
    messageOne.textContent ='Loading data...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
    response.json().then((data) => {          //the data is from this api
        if(data.error){
            messageOne.textContent =data.error
            messageTwo.textContent = ''
        }else{
            messageOne.textContent ='Location: '+data.location
            messageTwo.textContent ='Forecast: ' +data.forecast
        }
        //console.log(data)
    })
})
})

