import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './List.css';

const List = ({ url }) => {

  const [list, setList] = useState([]); // Initialize state to store the list of items


  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/showItem'); // Make sure to replace '/endpoint' with the correct path

      if (response.data.success) {
        setList(response.data.data); // Update the state with fetched data
        console.log(response.data.data);    
      } else {
        toast.error("Failed to fetch the list");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("An error occurred while fetching the list");
    }
  };

  const removeItem = async (itemId) => {
    const response = await axios.post(`${url}/api/endpoint`, { id: itemId }) // Replace '/endpoint' with the correct path
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error");
    }
  }
  useEffect(() => {
    fetchList();
  }, [])
  //       ///////////////////////////////////////// REMOVE COMMENTS FOR VISIBLE IMAGE AND STATES OF THE ITEM
  return (
    <div className='list add flex-col'>
      <p>All Items List</p>
      <div className="list-table">
        <div className='list-table-format title'>
          {/* <b>Image</b> */}
          <b>Name</b>
          <b>Category</b>
          <b>Description</b>
          <b>Price</b>
          {/* <b>Action</b> */}
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div className='list-table-format' key={index}>
              {/* <img src={`${url}/images/` + item.image} alt="item" /> */}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.description}</p>
              <p>${item.price}</p>
              {/* <p onClick={() => removeItem(item._id)} className='curser'>X</p> */}
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
