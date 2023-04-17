function createImage(element, file){
    const image = document.createElement('img');
    image.src = `./assets/img/${file}`;
    element.appendChild(image);
    return image;
}

export default createImage;
