import React, { useState, useEffect } from "react";
import axios from "axios";

interface APODData {
  title: string;
  explanation: string;
  url: string;
  media_type: "image" | "video";
}

const APODViewer = () => {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    const yesterday = new Date(today.getTime());

    yesterday.setTime(today.getTime() - 24 * 60 * 60 * 1000);

    return yesterday.toISOString().slice(0, 10);
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const API_KEY = "LNFCt0b3t2h2CxPZW5jAdYP4xUTZ82or2P6dczRD";

  useEffect(() => {
    const fetchAPOD = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`
        );
        setApodData(response.data);
      } catch (err) {
        setError("Failed to fetch APOD data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAPOD();
  }, [date, API_KEY]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">
          Astronomy Picture of the Day
        </h2>
        <div className="mb-6 flex justify-center">
          <label
            htmlFor="date-input"
            className="block  text-gray-100 font-bold mb-2"
          >
            Select Date:
          </label>
          <input
            type="date"
            id="date-input"
            className="border border-gray-300 rounded-md px-3 py-2 ml-2"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        {apodData && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {apodData.title}
              </h2>
              {apodData.media_type === "image" ? (
                <img
                  src={apodData.url}
                  alt={apodData.title}
                  className="mx-auto my-4 rounded-lg shadow-lg max-w-full h-auto"
                />
              ) : (
                <div className="video-container mx-auto my-4 rounded-lg shadow-lg max-w-full overflow-hidden">
                  <iframe
                    title={apodData.title}
                    src={apodData.url}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-96"
                  />
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-6">
              <p className="text-gray-700 mb-4 italic mt-14">
                {apodData.explanation.split(". ").map((sentence, index) => (
                  <span key={index}>
                    <span className="font-bold">
                      {sentence.slice(0, 1).toUpperCase()}
                    </span>
                    {sentence.slice(1)}
                    {index !== apodData.explanation.split(". ").length - 1 &&
                      ". "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default APODViewer;
