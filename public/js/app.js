console.log('server side js is loaded and running')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

//first fetch fetches the data then "then"'s callback function run with only one arguement


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = "Helllo js"

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    
    //location encoded to URI in geocode so no need to do again 
    fetch('http://localhost:3000/weather?search=' + location).then((response) => {
        //parsing the data to json
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.Forecast
            }
        })
    })

})