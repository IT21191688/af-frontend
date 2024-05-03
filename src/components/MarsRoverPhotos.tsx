import { useState, useEffect } from "react";
import axios from "axios";

const MarsRoverPhotos = () => {
  const [roverPhotos, setRoverPhotos] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(8);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRover, setSelectedRover] = useState("curiosity");

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos`,
          {
            params: {
              earth_date: selectedDate || "2023-04-23",
              api_key: "LNFCt0b3t2h2CxPZW5jAdYP4xUTZ82or2P6dczRD",
            },
          }
        );

        setRoverPhotos(response.data.photos);
      } catch (err) {
        //setError("Error fetching rover photos");
      } finally {
        setLoading(false);
      }
    };

    fetchRoverPhotos();
  }, [selectedDate, selectedRover]);

  // Get current photos
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = roverPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate start and end of pagination range
  const totalPages = Math.ceil(roverPhotos.length / photosPerPage);
  const paginationRange = 5; // Number of page numbers to show
  const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
  const endPage = Math.min(startPage + paginationRange - 1, totalPages);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-50 mb-6">
          Mars Rover Photos
        </h2>
        <div className="mb-6 flex justify-between">
          <div>
            <label
              htmlFor="date-input"
              className="block text-gray-50 font-bold mb-2"
            >
              Select Date:
            </label>
            <input
              type="date"
              id="date-input"
              className="border border-gray-300 rounded-md px-3 py-2"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="rover-select"
              className="block text-gray-50 font-bold mb-2"
            >
              Select Rover:
            </label>
            <select
              id="rover-select"
              className="border border-gray-300 rounded-md px-3 py-2"
              value={selectedRover}
              onChange={(e) => setSelectedRover(e.target.value)}
            >
              <option value="curiosity">Curiosity</option>
              <option value="opportunity">Opportunity</option>
              <option value="spirit">Spirit</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentPhotos.map((photo: any) => (
            <div
              key={photo.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={photo.img_src}
                alt={photo.rover.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-800 font-bold">
                  Rover: {photo.rover.name}
                </p>
                <p className="text-gray-600">
                  Camera: {photo.camera.full_name}
                </p>
                <p className="text-gray-600">Earth Date: {photo.earth_date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <nav aria-label="Pagination">
            <ul className="flex">
              {startPage > 1 && (
                <li>
                  <button
                    onClick={() => paginate(1)}
                    className="mx-1 px-3 py-2 rounded-md bg-gray-200 text-gray-700"
                  >
                    1
                  </button>
                </li>
              )}
              {startPage > 2 && <li>...</li>}
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(startPage + i)}
                    className={`mx-1 px-3 py-2 rounded-md ${
                      currentPage === startPage + i
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {startPage + i}
                  </button>
                </li>
              ))}
              {endPage < totalPages - 1 && <li>...</li>}
              {endPage < totalPages && (
                <li>
                  <button
                    onClick={() => paginate(totalPages)}
                    className="mx-1 px-3 py-2 rounded-md bg-gray-200 text-gray-700"
                  >
                    {totalPages}
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MarsRoverPhotos;
