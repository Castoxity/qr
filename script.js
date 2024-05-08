let btn = document.querySelector('#generate');
let qrcode = document.querySelector('.qrcode');

btn.addEventListener('click', (e) => {
    e.preventDefault();

    let text = document.getElementById('text').value;

    let qr = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(text);

    qrcode.classList.add('active');
    qrcode.src = qr;
});
