
let btn = document.querySelector('#generate');
let qrcode = document.querySelector('.qrcode');
let downloadBtn = document.querySelector('#download');

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    let text = document.getElementById('text').value;

    if (text === '') {
        alert('Enter a URL, mate!');
    } else {
        // Set the background color to transparent (RGBA format)
        let bgColor = 'rgba(0, 0, 0, 0)'; // Fully transparent background

        // Construct the QR code URL with transparent background
        let qr = `https://quickchart.io/qr?text=${encodeURIComponent(text)}&bgcolor=${bgColor}`;

        // Set the QR code source
        qrcode.src = qr;
        qrcode.dataset.downloadUrl = qr;

        // Fetch the QR code blob for download
        let response = await fetch(qr);
        let blob = await response.blob();
        let blobUrl = URL.createObjectURL(blob);
        qrcode.dataset.blobUrl = blobUrl; 
    }
});

downloadBtn.addEventListener('click', (e) => {
    let blobUrl = qrcode.dataset.blobUrl;
    if (blobUrl) {
        // Create a new image element to load the QR code image
        let img = new Image();
        img.onload = () => {
            // Create a canvas element to manipulate the image data
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext('2d');

            // Draw the QR code image on the canvas
            ctx.drawImage(img, 0, 0);

            // Get the image data from the canvas
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let data = imageData.data;

            // Loop through the image data to invert colors (black to white and vice versa)
            for (let i = 0; i < data.length; i += 4) {
                let red = data[i];
                                let green = data[i + 1];
                                let blue = data[i + 2];
                                let alpha = data[i + 3];
                

                // Invert colors: black (0, 0, 0) to white (255, 255, 255) and vice versa
                if (red === 0 && green === 0 && blue === 0) {
                    data[i] = 255; // Set red to 255 (white)
                    data[i + 1] = 255; // Set green to 255 (white)
                    data[i + 2] = 255; // Set blue to 255 (white)
                } else {
                    data[i] = 0; // Set red to 0 (black)
                    data[i + 1] = 0; // Set green to 0 (black)
                    data[i + 2] = 0; // Set blue to 0 (black)
                }
            }
            for (let i = 0; i < data.length; i += 4) {
                                let red = data[i];
                                let green = data[i + 1];
                                let blue = data[i + 2];
                                let alpha = data[i + 3];
                
                                // Check if the pixel is white (255, 255, 255) and set alpha to 0 for transparency
                                if (red === 0 && green === 0 && blue === 0) {
                                    data[i + 3] = 0; // Set alpha to 0 (fully transparent)
                                }
                            }

            // Put the modified image data back on the canvas
            ctx.putImageData(imageData, 0, 0);

            // Convert the canvas content to a downloadable image URL
            let modifiedBlobUrl = canvas.toDataURL('image/png');

            // Create a download link for the modified image and trigger the download
            let downloadLink = document.createElement('a');
            downloadLink.href = modifiedBlobUrl;
            downloadLink.download = 'qr_code_modified.png'; 
            downloadLink.click(); 
        };

        // Set the source of the image element to the QR code URL
        img.src = blobUrl;
    } else {
        alert('Generate the QR code first!');
    }
});
