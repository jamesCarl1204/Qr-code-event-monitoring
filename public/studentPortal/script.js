



async function onScanSuccess(decodedText, decodedResult) {
    console.log(decodedText)

     const response = await fetch('/api/attendance/scan', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({qrData: decodedText})
    })

    const data = response.json()
}


const html5QrcodeScanner = new Html5QrcodeScanner(
    "scan-cam",
    { fps: 10, qrbox: 250},
    false
);



document.querySelector('#scan-btn').addEventListener('click', () => {
html5QrcodeScanner.render(onScanSuccess)
})