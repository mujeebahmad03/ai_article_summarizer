import { loader } from "../assets";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
    </div>
  );
};

export default Loader;
