import { useMemo } from "react";
import "./ImageGallery.css";
function ImageGallery({ images, onClick }) {
    const memoizedGalleryItems = useMemo(() => {
            return images.map((item) => (
          <li
            key={item.id}
            className="galleryItem"
            onClick={() => onClick(item.largeImageURL, item.tags)}>
            <img className="galleryImage" src={item.webformatURL} alt={item.tags} />
          </li>
        ))
        }, [images,onClick]);
  return (
    <div>
      <ul className="galleryList">
        {memoizedGalleryItems}
      </ul>
    </div>
  );
}

export default ImageGallery;
