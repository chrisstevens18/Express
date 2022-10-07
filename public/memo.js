console.log('hi')
$.get("http://localhost:8000/api/memo",(data)=>{
    for (let i = 0; i < data.length; i++) {
    $('#display').prepend(data[i].description)
    }
})

const formSub = document.querySelector('.form');
 //selects the form and puts it in a variable

 // post from submit form
formSub.addEventListener('submit', event => { //adds event listener
    event.preventDefault(); 
    const formData = new FormData(formSub); //takes all data from form
    const formInput = Object.fromEntries(formData); //puts that dat into a 

    fetch('http://localhost:8000/api/memo', {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formInput)}) //turns the form data into a string
    .then(response => {
    $('#display').append(formInput.description) //appends stringified form data to display div

    console.log(formInput)
    // location.reload()



})


})