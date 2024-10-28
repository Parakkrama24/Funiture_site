import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Upload3DModel}from '../../firebase/Upload3DModel.jsx'; // Import Firebase upload component

const Add = ({ url }) => {
  const [image, setImage] = useState(false); // Item image state
  const [modelImageUrl, setModelImageUrl] = useState(""); // 3D model image URL
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Table"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const itemData = {
      name: data.name,
      description: data.description,
      price: Number(data.price), // Ensure price is sent as a number
      category: data.category,
      image:data.image,
      modelimage:modelImageUrl}; // 3D model image from Firebase

    //const response = await axios.post(`${url}/api/`, formData); // Endpoint to upload product 
    const response = await axios.post('http://localhost:3001/admin/addItem',itemData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Table"
      });
      setImage(false); // Reset item image
      setModelImageUrl(""); // Reset model image URL
      toast.success(response.data.message); // Display success message
    } else {
      toast.error(response.data.message); // Display error message
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        {/* Item Image Upload */}
        <div className='add-img-upload flex-col'>
          <p>Upload Item Image :</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload} alt='upload' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>

        {/* 3D Model Image Upload */}
        <div className='add-img-upload flex-col'>
          <p>Upload 3D Model :</p>
          {/* Integrate the Upload3DModel component */}
          <Upload3DModel setModelImageUrl={setModelImageUrl} />
        </div>

        <div className='add-product-name flex-col'>
          <p>Product Name :</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            placeholder='Type your item name here'
            required
          />
        </div>

        <div className='add-product-description flex-col'>
          <p>Product Description :</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Type your item description here"
            required
          ></textarea>
        </div>

        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category :</p>
            <select onChange={onChangeHandler} name='category'>
              <option value="Table">Table</option>
              <option value="Chair">Chair</option>
              <option value="Vas">Vas</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product Price :</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type='number'
              name='price'
              placeholder='Amount'
            />
            <span className="currency-label">LKR</span>
          </div>
        </div>

        <button type='submit' className='add-btn'>Add Item</button>
      </form>
    </div>
  );
};

export default Add;


//OLD CODE(sprint 2)
/*import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import Upload3DModel from '../../firebase/Upload3DModel'; // Import Firebase upload component

const Add = ({ url }) => {
  const [image, setImage] = useState(false); // Item image state
  const [modelImageUrl, setModelImageUrl] = useState(""); // 3D model image URL
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Table"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", data.image); // Item image
    formData.append("modelimage", modelImageUrl); // 3D model image from Firebase

    const response = await axios.post(`${url}/api/`, formData); // Endpoint to upload product
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Table"
      });
      setImage(false); // Reset item image
      setModelImageUrl(""); // Reset model image URL
      toast.success(response.data.message); // Display success message
    } else {
      toast.error(response.data.message); // Display error message
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Item Image :</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload} alt='upload' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>

     
        <div className='add-img-upload flex-col'>
          <p>Upload 3D Model :</p>
          <Upload3DModel setModelImageUrl={setModelImageUrl} />
        </div>

        <div className='add-product-name flex-col'>
          <p>Product Name :</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            placeholder='Type your item name here'
            required
          />
        </div>

        <div className='add-product-description flex-col'>
          <p>Product Description :</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Type your item description here"
            required
          ></textarea>
        </div>

        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category :</p>
            <select onChange={onChangeHandler} name='category'>
              <option value="Table">Table</option>
              <option value="Chair">Chair</option>
              <option value="Vas">Vas</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product Price :</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type='number'
              name='price'
              placeholder='Amount'
            />
            <span className="currency-label">LKR</span>
          </div>
        </div>

        <button type='submit' className='add-btn'>Add Item</button>
      </form>
    </div>
  );
};

export default Add;*/
