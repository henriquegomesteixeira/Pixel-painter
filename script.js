const buttonRandonColors = document.querySelector('#button-random-color');
const colors = document.querySelectorAll('.color');
const sectionPixel = document.querySelector('#pixel-board');
let colorSelected = 'black';

// Ao reiniciar a página, as cores da paleta de cores são mantidas através do localStorage
const localStorageColorRandom = JSON.parse(localStorage.getItem('colorPalette'));
if (localStorageColorRandom !== null) {
  const [color2, color3, color4] = localStorageColorRandom;
  colors[1].style.backgroundColor = color2;
  colors[2].style.backgroundColor = color3;
  colors[3].style.backgroundColor = color4;
}

// Muda a cor da paleta de escola de cores e armazena no localStorage
buttonRandonColors.addEventListener('click', () => {
  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const color2 = getRandomColor();
  const color3 = getRandomColor();
  const color4 = getRandomColor();

  colors[1].style.backgroundColor = color2;
  colors[2].style.backgroundColor = color3;
  colors[3].style.backgroundColor = color4;

  const palette = [color2, color3, color4];
  localStorage.setItem('colorPalette', JSON.stringify(palette));
});

// Define a largura do quadro de pixels
function widthPixelBoard(number) {
  const widths = {
    1: '210px',
    2: '210px',
    3: '210px',
    4: '210px',
    5: '210px',
    6: '252px',
    7: '294px',
    8: '336px',
    9: '378px',
    10: '420px',
    11: '462px',
    12: '504px',
  };

  sectionPixel.style.width = widths[number] || '';
}

// Cria os pixels do quadro de pixels e armazena no localStorage
const createBoard = (numberCreatePixels) => {
  let numberPixels = numberCreatePixels;

  if (!numberCreatePixels) { numberPixels = 81; }
  if (localStorage.getItem('boardSize') !== null) {
    const boardSize = localStorage.getItem('boardSize');
    numberPixels = boardSize * boardSize;
    widthPixelBoard(boardSize);

    const inputBoardSize = document.querySelector('#board-size');
    inputBoardSize.value = boardSize;
  }

  for (let index = 0; index < numberPixels; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    sectionPixel.appendChild(pixel);
  }
};
createBoard();

// Muda a cor do pixel ao clicar e armazena no localStorage
function setPixelEventListeners() {
  document.querySelectorAll('.pixel').forEach((pixel, index) => {
    pixel.addEventListener('click', (event) => {
      const clickedPixel = event.target;
      clickedPixel.style.backgroundColor = colorSelected;

      // Salva o estado do quadro de pixels no localStorage
      const pixelBoardState = JSON.parse(localStorage.getItem('pixelBoard')) || {};
      pixelBoardState[index] = colorSelected;
      localStorage.setItem('pixelBoard', JSON.stringify(pixelBoardState));
    });

    // Verifica se há cor salva no localStorage para esse pixel
    const pixelBoardState = JSON.parse(localStorage.getItem('pixelBoard')) || {};
    const savedColor = pixelBoardState[index];
    const clickedPixel = pixel;
    clickedPixel.style.backgroundColor = savedColor;
  });
}
setPixelEventListeners();

// Adiciona a classe 'selected' a cor selecionada
document.querySelectorAll('.color').forEach((cor) => {
  cor.addEventListener('click', (event) => {
    const selectedColor = document.querySelector('.selected');
    selectedColor.classList.remove('selected');
    event.target.classList.add('selected');
    colorSelected = event.target.style.backgroundColor;
  });
});

// Limpa o quadro de pixels e o localStorage
function clearPixelBoard() {
  document.querySelectorAll('.pixel').forEach((pixel) => {
    const clickedPixel = pixel;
    clickedPixel.style.backgroundColor = 'white';
  });

  localStorage.removeItem('pixelBoard');
}
document.querySelector('#clear-board').addEventListener('click', () => {
  clearPixelBoard();
});

// Cria um novo quadro de pixels e limpa o quadro anterior
document.querySelector('#generate-board').addEventListener('click', () => {
  const inputBoardSize = document.querySelector('#board-size');
  let boardSize = inputBoardSize.value;

  if (!boardSize) { alert('Valor inválido!'); }
  if (boardSize < 5) { boardSize = 5; alert('Valor mínimo é 5!'); }
  if (boardSize > 12) { boardSize = 12; alert('Valor máximo é 12!'); }

  document.querySelectorAll('.pixel').forEach((pixel) => (pixel.remove()));

  const numberCreatePixels = boardSize * boardSize;
  widthPixelBoard(boardSize);
  createBoard(numberCreatePixels);
  setPixelEventListeners();
  clearPixelBoard();
  localStorage.setItem('boardSize', boardSize);
});
