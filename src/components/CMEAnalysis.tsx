import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const CMEAnalysis = () => {
  const [cmeData, setCmeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(new Date("2016-09-01"));
  const [endDate, setEndDate] = useState(new Date("2016-09-30"));
  const API_KEY = "LNFCt0b3t2h2CxPZW5jAdYP4xUTZ82or2P6dczRD";

  useEffect(() => {
    const fetchCMEData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://api.nasa.gov/DONKI/CMEAnalysis?startDate=${format(
            startDate,
            "yyyy-MM-dd"
          )}&endDate=${format(
            endDate,
            "yyyy-MM-dd"
          )}&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=${API_KEY}`
        );

        setCmeData(response.data);
      } catch (err) {
        setError("Failed to fetch CME data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCMEData();
  }, [startDate, endDate, API_KEY]);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
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
        <h2 className="text-3xl font-bold text-gray-50 mb-6 text-center">
          CME Analysis
        </h2>
        <div className="mb-6 flex justify-center">
          <div className="mr-4">
            <label
              htmlFor="start-date"
              className="block text-gray-50 font-bold mb-2"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="start-date"
              className="border border-gray-300 rounded-md px-3 py-2"
              value={format(startDate, "yyyy-MM-dd")}
              onChange={(e) => handleStartDateChange(new Date(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className="block text-gray-50 font-bold mb-2"
            >
              End Date:
            </label>
            <input
              type="date"
              id="end-date"
              className="border border-gray-300 rounded-md px-3 py-2"
              value={format(endDate, "yyyy-MM-dd")}
              onChange={(e) => handleEndDateChange(new Date(e.target.value))}
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Latitude</th>
                  <th className="px-4 py-2">Longitude</th>
                  <th className="px-4 py-2">Half Angle</th>
                  <th className="px-4 py-2">Speed</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Associated CME ID</th>
                  <th className="px-4 py-2">Note</th>
                  <th className="px-4 py-2">Catalog</th>
                </tr>
              </thead>
              <tbody>
                {cmeData.map((cme: any, index: any) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-4 py-2 border">{cme.time21_5}</td>
                    <td className="px-4 py-2 border">{cme.latitude}</td>
                    <td className="px-4 py-2 border">{cme.longitude}</td>
                    <td className="px-4 py-2 border">{cme.halfAngle}</td>
                    <td className="px-4 py-2 border">{cme.speed}</td>
                    <td className="px-4 py-2 border">{cme.type}</td>
                    <td className="px-4 py-2 border">{cme.associatedCMEID}</td>
                    <td className="px-4 py-2 border">{cme.note}</td>
                    <td className="px-4 py-2 border">{cme.catalog}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMEAnalysis;
