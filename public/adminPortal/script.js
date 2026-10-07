const addEventBtn = document.querySelector('#event-add-btn');
const dashboardTable = document.querySelector('.dashboard-event-table');
const eventCreateCard = document.querySelector('.event-input-container');
const qrContainer = document.querySelector('.qr-code-container');
const qrCode = document.querySelector('#qr-code');

const tableContainer = document.querySelector('.attendance-container');
const attendanceBody = document.querySelector('#attendance-body');

window.addEventListener('DOMContentLoaded', async () => {
      const response = await fetch('/api/me');
      const data = await response.json();

      if(data.user) {
            document.querySelector('#user-name').innerHTML += data.user.id
      }
})


const now = new Date();
const formattedDateTime = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
});

function formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
      });
}

function formatTime(time) {
      const [hour, minute] = time.split(':');

      const date = new Date();
      date.setHours(hour, minute, 0);

      return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
      });
}
async function fetchEvents() {
      try{
      const response = await fetch('/api/events', {
            method:'GET',
            headers: {'Content-Type':'application/json'}
      });

      const data = await response.json();
      
      const dashboardBody = document.querySelector('.dashboard-event-body');
      const sectionBody = document.querySelector('#section-table-body');

      dashboardBody.innerHTML = ''
      sectionBody.innerHTML = ''

      data.events.forEach((event,index) => {
      dashboardBody.innerHTML += `
      <tr class="event-boxe">
      <td>${event.event_name}</td>
      <td>${formatDate(event.event_date)}</td>
      <td> ${formatTime(event.event_time)}</td>
      <td>${event.venue}</td>
      <td>${event.attendance_count}</td>
      <td>
      <button class="view-records" data-id="${event.id}">view records</button>
      <button class="view-qr" data-id="${event.id}">view qr</button>
      </td>
      </tr>`
      

      sectionBody.innerHTML += `
      <tr>
      <td>${event.event_name}</td>
      <td>${formatDate(event.event_date) + ' ' + formatTime(event.event_time)}</td>
      <td>${event.venue}</td>
      <td><button>delete</button</td>
      </tr>`

      document.querySelector('#total-event').textContent = data.events.length
      });

      document.querySelectorAll('.view-records').forEach(button => {
            button.addEventListener('click', async () => {
                  
                  const eventId = button.dataset.id

                  const response = await fetch(`/api/events/${eventId}/records`)
                  const data = await response.json()
                  attendanceBody.innerHTML = ''

                  data.records.forEach(record => {
                         attendanceBody.innerHTML += `
                  <tr>
                   <td>${record.id}</td>
                   <td>${record.student_id}</td>
                   <td>${record.first_name}</td>
                   <td>${record.scanned_at}</td>
                   </tr>
                   `
                  });
                 tableContainer.style.display = 'flex'
            })
      })

       document.querySelectorAll('.view-qr').forEach(button => {
            button.addEventListener('click', async () => {
                  const eventId = button.dataset.id

                  const response = await fetch(`/api/events/${eventId}/qr`)
                  const data = await response.json();

                  qrCode.innerHTML += `
                  <img width="200px" height="200px" src="${data.qr}" alt='event qr code'>
                  `
                  qrContainer.style.display = 'flex';
      
                 
            })
      })
      
      
} catch(err) {
      console.log(err);
}
}


async function fetchTotalStudent() {
      const response = await fetch('/api/students')
      const data = await response.json()

      document.querySelector('#total-student').textContent = data.students.total_student
}

fetchTotalStudent()
fetchEvents();

addEventBtn.addEventListener('click', (e) => {
         eventCreateCard.style.display = 'flex';
})

document.querySelector('.qrcode-back-btn').addEventListener('click', () => {
                  qrContainer.style.display = "none";
               })

document.querySelector('#create-sub').addEventListener('click', async (e) => {

      const eventName = document.getElementById('event-name').value;
      const eventVenue = document.getElementById('event-venue').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value

      const response = await fetch('/api/create/events', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({event_name: eventName, event_date:date, event_time:time, venue: eventVenue})
      })

      const data = await response.json()

      fetchEvents()
      eventCreateCard.style.display = "none"
})


document.querySelector('#table-back-btn').addEventListener('click', () => {
      tableContainer.style.display = "none"
})


const sidebarItem = document.querySelectorAll('.sidebar-item')
const views = document.querySelectorAll('.view')

sidebarItem.forEach(item => {
      item.addEventListener('click', () => {
            sidebarItem.forEach(i => i.classList.remove('active'))
             item.classList.add('active')
             views.forEach(v => v.style.display = 'none');
 document.getElementById(`view-${item.dataset.target}`).style.display = "flex"

})
})

document.querySelector('#search-input').addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase()

      document.querySelectorAll('#section-table-body tr').forEach(row => {
            const match = row.textContent.toLowerCase().includes(keyword)
            row.style.display = match ? '' : 'none'
      })
})
document.querySelector('#cancel-btn').addEventListener('click', () => {
      eventCreateCard.style.display = "none"
})

document.querySelector('#logout-btn').addEventListener('click', async () => {
     const response = await fetch('/logout', {method: 'POST'})
     const data = await response.json();

     if(data.success) {
      window.location.href = data.redirect
     } 
})