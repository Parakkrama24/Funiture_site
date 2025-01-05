import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './List.css';
import { assets } from '../../assets/assets'; // Ensure this is the correct path

const List = ({ url }) => {
  const [list, setList] = useState([]); // Initialize state to store the list of items

  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/'); // Replace with your correct endpoint
      if (response.status === 200) {
        setList(response.data); // Update the state with fetched data
      } else {
        //toast.error("Failed to fetch the list");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      //toast.error("An error occurred while fetching the list");
    }
  };

  const removeItem = async (itemId) => {
    console.log(itemId);
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${itemId}`, { withCredentials: true }); // Use DELETE for deletion
      if (response.data.success) {
        //toast.success(response.data.message); // Uncomment to show a success message
        fetchList(); // Refresh the list after successful deletion
      } else {
        //toast.error(response.data.message); // Uncomment to show an error message from the server
      }
    } catch (error) {
      console.error("Error removing item:", error);
      //toast.error("An error occurred while removing the item"); // Uncomment to show a generic error message
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Items List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Description</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div className="list-table-format" key={index}>
              <img src={`${url}assets/items/${item.image}`} alt="item" className="item-image" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.description}</p>
              <p>${item.price}</p>
              {/* Use an image for delete action */}
              <img src={assets.delete1} alt="delete" className="delete-icon"
                onClick={() => removeItem(item._id)} />
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default List;
