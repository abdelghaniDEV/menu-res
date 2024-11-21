import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchProducts } from "../Redux/slices/products.slice";

const CreateProduct = ({setOpenCreate}) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [image, setImage] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const categoriesRudex = useSelector((state) => state.categories);


  const dispatch = useDispatch()
  // Fetch categories on component mount
  useEffect(() => {
    setCategories(categoriesRudex);
  }, [categoriesRudex]);

  

  // Update subcategories when category changes
  useEffect(() => {
    const selectedCategory = categories.find((cat) => cat._id === categoryId);
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
  }, [categoryId, categories]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("subCategory", subCategory);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        formData,
        {
          headers: {  
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
           },
        }
      );
      setMessage("Product added successfully!");
      dispatch(fetchProducts());
      setOpenCreate(false)
    } catch (error) {
      console.error(error.message);
      setMessage(
        error.response?.data?.error ||
          "An error occurred while adding the product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mt-1">
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
      <form
        onSubmit={handleSubmit}
        className="space-y-4 grid grid-cols-2 gap-[20px] items-start"
      >
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
             
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-1 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select onValueChange={(e) => setCategoryId(e)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((cate) => {
                      return (
                        <SelectItem key={cate._id} value={cate._id}>
                          {cate.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium mb-1">
                Subcategory
              </label>
              <Select onValueChange={(e) => setSubCategory(e)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Subcategory</SelectLabel>
                    {subCategories.map((cate) => {
                      return (
                        <SelectItem key={cate._id} value={cate.name}>
                          {cate.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            {/* <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full px-4 py-2 border rounded"
            /> */}

            <div className="bg-[#F9F9F9] p-5 rounded-[10px] h-[250px] ">
              <h1 className=" text-[20px] font-[600] mb-3">upload images</h1>
              <div className="flex items-center gap-3">
                <div>
                  <label
                    id="input-image"
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-[150px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#EEEEEE]  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <i className="bx bx-cloud-upload text-[#F5CAAB] text-[40px]"></i>
                      <p>Upload</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  {/* <span className="text-[14px] text-red-500" id="err-image">
                    {errorMsg.image}
                  </span> */}
                </div>
                <div>
                  {image && (
                    <div className=" border-2 border-[#F5CAAB] rounded-[10px] p-1 ">
                    <img
                      src={
                        URL.createObjectURL(image)
                      }
                      className="h-[100px] w-full cursor-pointer"
                      onClick={() => setImage(null)}
                    />
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
