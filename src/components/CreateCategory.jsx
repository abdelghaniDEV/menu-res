import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../Redux/slices/categories.slice";

const CreateCategory = ({ setOpenCreate }) => {
  const [name, setName] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubCategoryChange = (index, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = value;
    setSubCategories(updatedSubCategories);
  };

  const addSubCategoryField = () => {
    setSubCategories([...subCategories, ""]);
  };

  const removeSubCategoryField = (index) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/categories`,
        {
          name,
          subCategories: subCategories
            .filter((sub) => sub.trim() !== "") // إزالة الحقول الفارغة
            .map((sub) => ({ name: sub })), // تحويل النصوص إلى كائنات
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      setMessage("Category added successfully!");
      setOpenCreate(false);
      dispatch(fetchCategories());
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "An error occurred while adding the category."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:max-w-lg mx-auto mt-8 ">
      
      {message && (
        <div
          className={`p-2 mb-4 text-sm rounded ${
            message.includes("successfully")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Subcategories
          </label>
          {subCategories.map((subCategory, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={subCategory}
                onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder={`Subcategory ${index + 1}`}
              />
              {subCategories.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSubCategoryField(index)}
                  className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSubCategoryField}
            className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded"
          >
            Add Subcategory
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
