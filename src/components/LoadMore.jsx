import "./LoadMore.css"

function Button({onClick}) {
    return (
      <button className="loadMoreButton" onClick={onClick}>
        Load More
      </button>
    );
  }

export default Button;
