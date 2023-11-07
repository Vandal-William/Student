const choosePanel = document.getElementById('choose-Panel');
const dropArea = document.getElementById('drop-zone');
const itemsArray = [
    "<span>h1</span>", 
    "<span>/h1</span>",
    "<span>p</span>",
    "<span>/p</span>"
];

function createDropZone() {
  for (let x = 0; x < 12; x++) {
    const dropRow = document.createElement('div');
    dropRow.classList.add('drop-row');
    dropArea.appendChild(dropRow);

    for (let y = 0; y < 13; y++) {
      const dropCell = document.createElement('div');
      dropCell.classList.add('drop-cell');
      dropRow.appendChild(dropCell);
    }
  }
}

function dropHandler(dropZone, htmlElement) {
  dropZone.appendChild(htmlElement);
}

function itemsChooseFactory(array) {

    for (let i = 0; i < array.length; i++) {
        const item = array[i]
        const draggableItem = document.createElement('div');
        draggableItem.innerHTML = item;
        draggableItem.classList.add('drag-item');
        draggableItem.setAttribute("draggable", "true");
        choosePanel.appendChild(draggableItem);
    
        draggableItem.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', ''));
        
    }
}

createDropZone();
itemsChooseFactory(itemsArray);

const dropZones = document.querySelectorAll('.drop-cell');
const dragItems = document.querySelectorAll('.drag-item');

dropZones.forEach(dropZone => {
    
  dropZone.addEventListener('dragover', e => e.preventDefault());
  dropZone.addEventListener('drop', e => {
    const item = document.querySelector('.drag-item');
    if (item) {
        dropHandler(dropZone, item);
    }
  });
});

choosePanel.addEventListener('dragover', e => e.preventDefault());
choosePanel.addEventListener('drop', e => {
  const item = document.querySelector('.drag-item');
  if (item) {
    dropHandler(choosePanel, item);
  }
});





