// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `)
    .join('');
}

const galleryContainer = document.querySelector('.gallery'); // Select the <ul> with class "gallery"
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.innerHTML = galleryMarkup;

const lightbox = new SimpleLightbox('.gallery__link');