// let btn = document.querySelector('#generate');
// let qrcode = document.querySelector('.qrcode');

// btn.addEventListener('click', (e) => {
//     e.preventDefault();

//     let text = document.getElementById('text').value;

//     if (text === '') {
//         alert('Enter a URL bruh');
//     } else {
//         let qr = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(text);
//         qrcode.classList.add('active');
//         qrcode.src = qr;
//     }
// });


let btn = document.querySelector('#generate');
let qrcode = document.querySelector('.qrcode');
let downloadBtn = document.querySelector('#download');

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    let text = document.getElementById('text').value;

    if (text === '') {
        alert('Enter a URL, mate!');
    } else {
        let qr = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(text);
        qrcode.src = qr;
        qrcode.dataset.downloadUrl = qr;

        
        let response = await fetch(qr);
        let blob = await response.blob();
        let blobUrl = URL.createObjectURL(blob);
        qrcode.dataset.blobUrl = blobUrl; 
    }
});

downloadBtn.addEventListener('click', (e) => {
    let blobUrl = qrcode.dataset.blobUrl;
    if (blobUrl) {
        let downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'qr_code.png'; 
        downloadLink.click(); 
    } else {
        alert('Generate the QR code first!');
    }
});
