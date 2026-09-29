const createBtn = document.querySelector('.create-event-btn')
const eventBox = document.getElementById('event-box')
const eventCreateCard = document.querySelector('.event-input-container')

const now = new Date()
const formattedDateTime = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
})


function fetchEvents() {
      try{
      const response = fetch('/api/events', {
            method:'GET',
            headers: {'Content-Type':'application/json'}
      })

      const data = response.json()
      
      eventBox.innerHTML += `
      <ul>
      <li>${data.eventName}</li>
      <li>${data.date + ' ' + data.time}</li>
      <li>${data.eventVenue}</li>
      </ul>
      <div class="event-btns">
      <a>view records</a>
      <a>view qr</a>
      </div>`
} catch(err) {
      console.log(err)
}

}

fetchEvents()

createBtn.addEventListener('click', (e) => {
         eventCreateCard.style.display = 'flex'
})

document.querySelector('#create-sub').addEventListener('click', (e) => {

      const eventName = document.getElementById('event-name').value;
      const eventVenue = document.getElementById('event-venue').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value

      const response = fetch('/api/create/event', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({event_name: eventName, event_date:date, event_time:time, venue: eventVenue})
      })

      const data = response
})



const sidebarItem = document.querySelectorAll('.sidebar-item')

sidebarItem.forEach(item => {
      item.addEventListener('click', () => {
            sidebarItem.forEach(i => i.classList.remove('active'))
             item.classList.add('active')
})
})


document.querySelector('#cancel-btn').addEventListener('click', () => {
      eventCreateCard.style.display = "none"
})


