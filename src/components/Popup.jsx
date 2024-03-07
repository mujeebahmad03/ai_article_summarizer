import PropTypes from "prop-types";

const Popup = ({ title, message, onConfirm, isOpen, setIsOpen }) => {
  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black opacity-50 ${
          isOpen ? "" : "hidden"
        }`}
      ></div>

      <div
        className={`z-40 fixed inset-0 flex items-center justify-center ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {title ? title : "Confirm Action"}
          </h2>
          <p className="mb-4">{message ? message : "Are you sure ?"}</p>
          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-4"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Popup.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Popup;
