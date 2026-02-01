import { useCallback, useState } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import Button from "./components/LoadMore";
import Loader from "./components/Loader";
import { usePixabay } from "./components/usePixabay";

function App() {
  const [word, setWord] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");

  const { images,reset,handleLoadMore,isLoading } = usePixabay(word)

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
    reset()
  },[word,reset]);

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
