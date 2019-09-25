const add = require('./add');
add(3, 10);

import testImg from './test.jpg';
import './index.scss';
const img = new Image();
img.src = testImg;
img.classList.add('img-test');
const root = document.getElementById('root');
root.append(img);
