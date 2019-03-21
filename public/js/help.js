const helpArea = document.querySelector('#helpForm')
const help = document.querySelector('#text')
//const messageThree = document.querySelector('#msg3')
const helpMsg =help.value
function myFunction(){
    document.getElementById("msg3").innerHTML = '  can be sorted out by checking following options: \n check your searched item.'+" \n" + 'Is it the correct one???'
}
helpArea.addEventListener('submit',(e) => {
   
    e.preventDefault()
    const helpMsg =help.value
    console.log(helpMsg)
    
    setTimeout(myFunction,1000)
    
    
    document.getElementById("msg3").innerHTML="Checking possible options!"
})