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



createBtn.addEventListener('click', (e) => {
         eventCreateCard.style.display = 'flex'
})

document.querySelector('#create-sub').addEventListener('click', (e) => {

      const eventName = document.getElementById('event-name').value;
      const eventVenue = document.getElementById('event-venue').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value

      eventBox.innerHTML = `
      <ul>
      <li>${eventName}</li>
      <li>${date + ' ' + time}</li>
      <li>${eventVenue}</li>
      </ul>
      <div class="event-btns">
      <a>view records</a>
      <a>view qr</a>
      </div>`

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