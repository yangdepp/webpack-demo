import testImg from './test.jpg';

function createTest() {
  const img = new Image();
  img.src = testImg;
  img.classList.add('img-test');

  const root = document.getElementById('root');
  root.append(img);
}

export default createTest;
