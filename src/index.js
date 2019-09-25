import testImg from './test.jpg';
import style from './index.scss';
import createTest from './createTest';

createTest();

const img = new Image();
img.src = testImg;
img.classList.add(style['img-test']);

const root = document.getElementById('root');
root.append(img);
