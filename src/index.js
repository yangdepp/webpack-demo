const add = require('./add');
add(3, 10);

const test = require('./test.jpg');
const img = new Image();
img.src = test;
const root = document.getElementById('root');
root.append(img);
