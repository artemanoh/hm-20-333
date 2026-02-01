import { useCallback, useEffect, useState } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import Button from "./components/LoadMore";
import Loader from "./components/Loader";

function App() {
  // state = {
  //   images: [],
  //   word: "",
  //   page: 1,
  //   isLoading: false,
  //   isOpen: false,
  // largeImageURL: "",
  // tags: ""
  // };

  const [images, setImages] = useState([]);
  const [word, setWord] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");

  const isModalClose = () => {
    setIsOpen(false);
  };

  const handleImageClick = useCallback((largeImageURL, tags) => {
    setIsOpen(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  },[]);

  const handleSearch = useCallback((newWord) => {
    if (newWord === word) return;
    setWord(newWord);
    setImages([]);
    setPage(1)
  },[word]);

  const handleLoadMore = useCallback(() => setPage(prev => prev + 1), []);
  useEffect(() => {
    if (!word) return;
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const fetching = await fetch(
          `https://pixabay.com/api/?key=50834834-38d93ed52f356f352f281d28a&q=${word}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
        )
        const data = await fetching.json()

        setImages((prev) => [...prev, ...data.hits]);
      } catch (err) {
        console.error("Помилка при завантаженні фото:", err);
      } finally { setIsLoading(false) }
    }
    fetchImages()
  }, [word, page]);

  return <div className="App">
    <SearchBar onSubmit={handleSearch} />
    <Modal
      isOpen={isOpen}
      largeImageURL={largeImageURL}
      tags={tags}
      onClose={isModalClose}
    />

    <ImageGallery
      images={images}
      onClick={handleImageClick}
    />
    {images.length > 0 && !isLoading && (
      <Button onClick={handleLoadMore} />
    )}

    {isLoading && <Loader />}
  </div>;
}

export default App;
