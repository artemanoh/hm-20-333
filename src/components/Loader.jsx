import { TailSpin } from "react-loader-spinner";
import "./Loader.css"

function Loader() {
    return (
      <div className="loader">
        <TailSpin
          height="50"
          width="50"
          color="#ff7f50"
          ariaLabel="loading"
        />
      </div>
    );
  }

export default Loader;
