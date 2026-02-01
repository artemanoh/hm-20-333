import"./Modal.css"

function Modal({isOpen,onClose,largeImageURL,tags}) {
    const modalOpen = isOpen ? "overlayOpenModal" : "overlay";
    return (
       <div className={modalOpen} onClick={onClose}>
  <div onClick={(event) => event.stopPropagation()}>
    <button className="modalButtonClose" onClick={onClose}>⨉</button>
    {largeImageURL && (
  <img src={largeImageURL} alt={tags || ""} />
)}
  </div>
</div>
    );
  }

export default Modal;