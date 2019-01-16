import _ from 'lodash';
import './style.css'
import './style.scss'
import Icon from './icon.png'
import  printMe from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  var element1 = document.createElement('div');
  element1.classList.add('test-scss');
  element1.innerHTML = `<p>哈哈哈</p>`

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon)


  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(element1)
  element.appendChild(btn);
  
  return element;
}

document.body.appendChild(component());

console.log('11111')