import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchCategories = createAsyncThunk("categoriesSlice/fetchCategories", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              },
        });
        
        return response.data; // Return the data directly
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Reject the thunk with error
      }
})

const categoriesSlice = createSlice({
    initialState : [],
    name : "categoriesSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchCategories.fulfilled , (state , action) => {
            console.log(action.payload.data)
            return state = action.payload.data  
        })
    }
})

const {} = categoriesSlice.actions
export default categoriesSlice.reducer