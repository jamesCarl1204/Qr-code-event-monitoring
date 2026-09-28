const createBtn = document.querySelector('.create-event-btn')
const tableBody = document.getElementById('events-table-body')
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

function addRow (eventName, dateTime, venue, attendance) {
      const row = tableBody.insertRow()

      row.insertCell(0).textContent = eventName;
      row.insertCell(1).textContent= dateTime;
      row.insertCell(2).textContent = venue;
      row.insertCell(3).innerHTML = attendance;

}

createBtn.addEventListener('click', (e) => {
         eventCreateCard.style.display = 'flex'
})

document.querySelector('#create-sub').addEventListener('click', (e) => {

      const eventName = document.getElementById('event-name').value;
      const eventVenue = document.getElementById('event-venue').value;
      const studentRec = '<button>view records</button>'
      addRow(eventName, formattedDateTime, eventVenue, studentRec)
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