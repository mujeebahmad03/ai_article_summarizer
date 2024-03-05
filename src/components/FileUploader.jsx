import PropTypes from "prop-types";

const FileUploader = ({
  handleDragEnter,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  dragging,
  loading,
  handleFileUpload,
}) => {
  return (
    <>
      <div
        className={`text-gray-900 border-box w-full ${
          dragging ? "border-dashed border-2 border-gray-400" : ""
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex justify-center w-full mx-auto sm:max-w-lg">
          <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
            <div className="mt-10 mb-10 text-center">
              <h2 className="text-2xl font-semibold mb-2">Upload your image</h2>
              <p className="text-xs text-gray-500">
                Image should be of format .jpg, .png, .webp, .pbm, .bmp
              </p>
            </div>
            <div
              className={`relative w-4/5 h-32 max-w-xs mb-10 bg-gray-100 rounded-lg shadow-inner ${
                dragging ? "bg-gray-200" : ""
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
              <label
                htmlFor="file-upload"
                className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
              >
                <p className="z-10 text-xs font-light text-center text-gray-500">
                  {loading ? "Loading..." : "Drag & Drop your files here"}
                </p>
                <svg
                  className="z-10 w-8 h-8 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

FileUploader.propTypes = {
  handleDragEnter: PropTypes.func,
  handleDragOver: PropTypes.func,
  handleDragLeave: PropTypes.func,
  handleDrop: PropTypes.func,
  dragging: PropTypes.bool,
  loading: PropTypes.bool,
  handleFileUpload: PropTypes.func,
};

export default FileUploader;
