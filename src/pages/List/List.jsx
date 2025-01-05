import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './List.css';
import { assets } from '../../assets/assets';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: ''
  });

  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/');
      if (response.status === 200) {
        setList(response.data);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      //toast.error("An error occurred while fetching the list");
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${itemId}`, { withCredentials: true });
      if (response.data.success) {
        //toast.success("Item deleted successfully");
        fetchList();
      }
    } catch (error) {
      console.error("Error removing item:", error);
      //toast.error("An error occurred while removing the item");
    }
  };

  const startEditing = (item) => {
    setEditingItem(item._id);
    setEditFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setEditFormData({
      name: '',
      category: '',
      description: '',
      price: ''
    });
  };

  const updateItem = async (itemId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${itemId}`,
        editFormData,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        //toast.success("Item updated successfully");
        setEditingItem(null);
        fetchList();
      }
    } catch (error) {
      console.error("Error updating item:", error);
      //toast.error("An error occurred while updating the item");
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
          <b>Actions</b>
        </div>
        {list.length > 0 ? (
          list.map((item) => (
            <div className="list-table-format" key={item._id}>
              <img src={`${url}assets/items/${item.image}`} alt="item" className="item-image" />
              
              {editingItem === item._id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <input
                    type="text"
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <input
                    type="text"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <div className="action-buttons">
                    <button 
                      onClick={() => updateItem(item._id)}
                      className="update-btn"
                    >
                      Update
                    </button>
                    <button 
                      onClick={cancelEditing}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.description}</p>
                  <p>${item.price}</p>
                  <div className="action-buttons">
                    <img 
                      src={assets.edit} 
                      alt="edit" 
                      className="edit-icon"
                      onClick={() => startEditing(item)} 
                    />
                    <img 
                      src={assets.delete1} 
                      alt="delete" 
                      className="delete-icon"
                      onClick={() => removeItem(item._id)} 
                    />
                  </div>
                </>
              )}
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