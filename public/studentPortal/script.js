const eventTable = document.querySelector('.event-table-body')

window.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/me')
    const data = await response.json()

    document.querySelector('#user-name').textContent = data.user.fullname

})
async function fetchAttendanceCount() {
    try {
        const response = await fetch('/api/attendance/count')
        const data = await response.json()

        if(data.success) {
            document.querySelector('#attend-count').textContent = data.count
        }
    } catch(err) {
        console.log(err)
    }
}


function formatDate(date) {
    return new Date(date).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}

function formatTime(time) {
    const [hour, minute] = time.split(':')

    const date = new Date()
    date.setHours(hour, minute, 0);

    return date.toLocaleString('in-us', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })
}

async function fetchEvents() {
    
    try {
        const response =  await fetch('/api/student/events')
        const data = await response.json()

        data.events.forEach(event => {
            eventTable.innerHTML += `
            <tr>
            <td>${event.event_name}</td>
            <td>${formatDate(event.event_date)}</td>
            <td>${formatTime(event.event_time)}</td>
            <td>${event.venue}</td>
            <td>${event.status}</td>
            </tr>
            `
        })
    } catch(err) {
        console.log(err)
    }
}

fetchEvents()
fetchAttendanceCount()

async function onScanSuccess(decodedText, decodedResult) {
    console.log(decodedText)
    try {
     const response = await fetch('/api/attendance/scan', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({qrData: decodedText})
    })

    const data = await response.json()

    if(data.success) {
        console.log(data.msg)
        
        fetchAttendanceCount()
        fetchEvents()
    }
    else {
        console.log(data.msg)
    }

} catch (err) {
    console.log(err)
}
}

const html5QrcodeScanner = new Html5QrcodeScanner(
    "scan-cam",
    { fps: 10, qrbox: 250},
    false
);

const views = document.querySelectorAll('.view')
const sidebarItem = document.querySelectorAll('.sidebar-item')

sidebarItem.forEach(item => {
    item.addEventListener('click', async () => {
        sidebarItem.forEach(i => i.classList.remove('active'))
        item.classList.add('active')
        views.forEach(v => v.style.display = 'none')
        document.getElementById(`view-${item.dataset.target}`).style.display = 'flex'
        if(item.dataset.target === 'scan') {
            html5QrcodeScanner.render(onScanSuccess)
        } else {
           await html5QrcodeScanner.clear()
        }
    })

})

//document.querySelector('#scan-btn').addEventListener('click', () => {