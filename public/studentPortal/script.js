



function onScanSuccess(decodedText, decodedResult) {
    document.getElementById('scan-result').textContent = decodedText;

    fetch('/scan', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({qrData: decodedText})
    })

}


const html5QrcodeScanner = new Html5QrcodeScanner(
    "scan-cam",
    { fps: 10, qrbox: 250},
    false
);

html5QrcodeScanner.render(onScanSuccess())