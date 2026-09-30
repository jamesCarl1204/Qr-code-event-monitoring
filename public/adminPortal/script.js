const createBtn = document.querySelector('.create-event-btn')
const eventBox = document.getElementById('event-box')
const eventCreateCard = document.querySelector('.event-input-container')
const qrContainer = document.querySelector('.qr-code-container')
const qrCode = document.querySelector('#qr-code')


window.addEventListener('DOMContentLoaded', async () => {
      const response = await fetch('/api/me')
      const data = await response.json()

      if(data.user) {
            document.querySelector('#user-name').innerHTML += data.user.id
      }
})


const now = new Date()
const formattedDateTime = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
})


async function fetchEvents() {
      try{
      const response = await fetch('/api/events', {
            method:'GET',
            headers: {'Content-Type':'application/json'}
      })

      const data = await response.json()
      
      data.events.forEach(event => {
            eventBox.innerHTML += ` 
      <ul>
      <li>${event.event_name}</li>
      <li>${event.event_date + ' ' + event.event_time}</li>
      <li>${event.venue}</li>
      </ul>
      <div class="event-btns">
      <a>view records</a>
      <a class="view-qr" data-id="${event.id}">view qr</a>
      </div>
      `
      })

       document.querySelectorAll('.view-qr').forEach(button => {
            button.addEventListener('click', async () => {
                  const eventId = button.dataset.id

                  const response = await fetch(`/api/events/${eventId}/qr`)
                  const data = await response.json()

                  qrCode.innerHTML = `
                  <img src="${data.qr}" alt='event qr code'>
                  `
                  qrContainer.style.display = 'flex'
            })
      })
     
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

      const response = fetch('/api/create/events', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({event_name: eventName, event_date:date, event_time:time, venue: eventVenue})
      })

      const data = response

      eventCreateCard.style.display = "none"
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


