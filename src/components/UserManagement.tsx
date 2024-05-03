import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "./services/AlertService";
import { FaTrash, FaEdit } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // alert(headers);

      const response = await axios.get(
        "https://af-backend-t3kh.onrender.com/api/v1/users/getAllUser",
        {
          headers,
        }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showErrorToast("Error fetching users");
    }
  };

  const handleDelete = async (userId: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(
        `http://localhost:8001/api/v1/users/deleteUser/${userId}`,
        {
          headers,
        }
      );
      setUsers(users.filter((user: any) => user._id !== userId));
      showSuccessToast("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      showErrorToast("Error deleting user");
    }
  };

  // const handleEdit = (userId: any) => {};

  return (
    <div className="min-h-screen py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-50">User Management</h1>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">First Name</th>
                <th className="py-3 px-6 text-left">Last Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Telephone</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map((user: any) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {user.firstname}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {user.lastname}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {user.telephone}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {user.address}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {user.role}
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    <button
                      // onClick={() => handleEdit(user._id)}
                      className="text-blue-500 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
