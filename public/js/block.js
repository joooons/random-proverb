// console.log('block.js at your service.')


const blockWriteVerse = (reference, text, link) => {
    let elems = document.querySelectorAll('#container > div')
    elems[1].innerHTML = `<div><a href="https://www.esv.org/${link}/" target="_blank">${reference} <small>ESV</small></a></div><div>${text}</div>`
}

const blockNextSide = () => {
    blockTurn()
    setTimeout(() => {
        blockShift()
    }, 2000)
}

const blockTurn = () => {
    let elems = document.querySelectorAll('#container > div')
    elems[0].classList.remove('facing-center')
    elems[0].classList.add('facing-left')
    elems[1].classList.remove('facing-right')
    elems[1].classList.add('facing-center')
}

const blockShift = () => {
    let elems = document.querySelectorAll('#container > div')
    elems[0].remove()
    blockAddSide('facing-right');
}


const blockAddSide = (className) => {
    let elem = document.createElement('div')
    elem.classList.add('turnable')
    if (className) elem.classList.add(className)
    elem.innerHTML = '<div></div>'
    $container.appendChild(elem)
}

const blockInitialize = () => {
    blockAddSide('facing-center');
    blockAddSide('facing-right');
}

blockInitialize()

