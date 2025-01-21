import { useState } from "react";
import { uploadImages } from "../api/uploadService";

const UploadImage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading,setLoading]=useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }
    
    const formData = new FormData();

    // Append each file with the same key name ("files") for handling multiple files
    selectedFiles.forEach((file) => {
      formData.append("image", file); // "files" is the key used to handle multiple files
    });

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
   try {
     setLoading(true)
     const res = await uploadImages(formData);
     alert(res.message);
   } catch (error) {
     alert(error.response.data.message);
   }finally{
      setLoading(false)
      setIsOpen(!isOpen);
      window.location.reload();
   }
  };

  return (
    <div className="flex items-center justify-center   bg-gray-100">
      {/* Button to open the popup */}
      <button
        onClick={togglePopup}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Upload more+
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Popup Content */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              {" "}
              Upload image (15mb x 10 max)
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <ul className="mt-4 text-sm text-gray-600">
                {selectedFiles.map((file, index) => (
                  <li key={index}>📄 {file.name}</li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <button
                disabled={loading}
                  type="submit"
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  {!loading ?"Submit":"Uploading..."}
                </button>
                <button
                  type="button"
                  onClick={togglePopup}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
