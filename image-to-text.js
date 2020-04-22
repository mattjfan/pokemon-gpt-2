const fs = require('fs');
const {createCanvas, loadImage} = require('canvas');
const canvas = createCanvas(56, 56);
const context = canvas.getContext('2d');

let lines = [];
let n = 0;

function next() {
    n ++;

    if (n > 151) {
    //if (n > 1) {
        console.log(lines.join('\n'));
        return;
    }

    let filename = n + '.png';

    loadImage('gray/' + filename).then(image => {
    //loadImage('1text.png').then(image => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, 56, 56);

        let xo = Math.floor((56-image.width)/2);
        let yo = Math.floor((56-image.height)/2);
        context.drawImage(image, xo, yo);

        let imageData = context.getImageData(0, 0, 64, 64);
        let data = imageData.data;

        for (let y = 0; y < 56; y ++) {
            let split = ['<'+('00'+y).substr(-2)+'>'];

            for (let x = 0; x < 56; x ++) {
                let i = ((y*56) + x) * 4;

                let r = data[i+0];
                let g = data[i+1];
                let b = data[i+2];

                let a = (r+g+b) / 3;

                let c = Math.floor((a/255)*9);

                split.push(c);
            }

            lines.push(split.join(' '));
        }

        next();
    });
}

next();
