import React, { useState } from 'react'; 
import './Add.css'; 
import { assets } from '../../assets/assets'; 
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Upload3DModel from '../../FireBase/Upload3DModel'; // Import Firebase upload component

const Add = ({ url }) => { 
  const [image, setImage] = useState(null); 
  const [base64Image, setBase64Image] = useState(''); 
  const [data, setData] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    category: '', 
    modelImageUrl: '', // Added field for 3D model URL 
  }); 

  function convertToBase64(e) { 
    var reader = new FileReader(); 
    reader.readAsDataURL(e.target.files[0]); 
    setImage(e.target.files[0]); 
    reader.onload = () => { 
      setBase64Image(reader.result); 
    }; 
    reader.onerror = error => { 
      toast.error("Error uploading image"); 
    }; 
  } 

  const onChangeHandler = (event) => { 
    const name = event.target.name; 
    const value = event.target.value; 
    setData((prevData) => ({ ...prevData, [name]: value })); 
  }; 

  const onSubmitHandler = async (event) => { 
    event.preventDefault(); 

    if (!image) { 
      toast.error("Please select an image"); 
      return; 
    } 
    if (!data.modelImageUrl) { 
      toast.error("Please upload a 3D model"); 
      return; 
    } 

    const itemData = { 
      name: data.name, 
      description: data.description, 
      price: Number(data.price), 
      category: data.category, 
      image: base64Image, 
      modelImageUrl: data.modelImageUrl, // Include the 3D model URL 
    }; 

    try { 
      const response = await axios.post( 
        `https://new-sever.vercel.app/api/products/addProduct`, 
        itemData, 
        { withCredentials: true } 
      ); 

      console.log("Response from server:", response.data);  

      if (response.data.success) { 
        setData({ 
          name: '', 
          description: '', 
          price: '', 
          category: '', 
          modelImageUrl: '', 
        }); 
        setImage(null); 
        setBase64Image(''); 
        toast.success(response.data.message || "Product added successfully"); 
      } else { 
        toast.error(response.data.message || "Failed to add product"); 
      } 
    } catch (error) { 
      console.error('Error submitting product data:', error); 
      toast.error(error.response?.data?.message || 'Failed to add product'); 
    } 
  }; 

  return ( 
    <> 
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
      /> 

      <div className="add"> 
        <form className="flex-col" onSubmit={onSubmitHandler}> 
          <div className="flex-col add-img-upload"> 
            <p>Upload Item Image :</p> 
            <label htmlFor="image"> 
              <img 
                src={image ? URL.createObjectURL(image) : assets.upload} 
                alt="upload" 
              /> 
            </label> 
            <input 
              accept="image/*" 
              type="file" 
              onChange={convertToBase64} 
              id="image" 
              required 
            /> 
          </div> 

          <div className='flex-col add-img-upload'> 
            <p>Upload 3D Model :</p> 
            <Upload3DModel 
              setModelImageUrl={(url) => setData((prevData) => ({ ...prevData, modelImageUrl: url }))} 
            /> 
          </div> 

          <div className="flex-col add-product-name"> 
            <p>Product Name :</p> 
            <input 
              onChange={onChangeHandler} 
              value={data.name} 
              type="text" 
              name="name" 
              placeholder="Type your item name here" 
              required 
            /> 
          </div> 

          <div className="flex-col add-product-description"> 
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

          <div className="add-category-price"> 
            <div className="flex-col add-category"> 
              <p>Product Category :</p> 
              <select 
                onChange={onChangeHandler} 
                name="category" 
                value={data.category} 
                required 
              > 
                <option value="">Select a category</option> 
                <option value="Furnitures">Furnitures</option> 
                <option value="Electronics">Electronics</option> 
                <option value="Kitchen Equipments">Kitchen Equipments</option> 
                <option value="Bathwares">Bathwares</option> 
                <option value="Wall Designs">Wall Designs</option> 
              </select> 
            </div> 
            <div className="flex-col add-price"> 
              <p>Product Price :</p> 
              <input 
                onChange={onChangeHandler} 
                value={data.price} 
                type="number" 
                name="price" 
                placeholder="Amount" 
                required 
              /> 
              <span className="currency-label">LKR</span> 
            </div> 
          </div> 

          <button type="submit" className="add-btn"> 
            Add Item 
          </button> 
        </form> 
      </div> 
    </> 
  ); 
}; 



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
        <div className='flex-col add-img-upload'>
          <p>Upload Item Image :</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload} alt='upload' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>

     
        <div className='flex-col add-img-upload'>
          <p>Upload 3D Model :</p>
          <Upload3DModel setModelImageUrl={setModelImageUrl} />
        </div>

        <div className='flex-col add-product-name'>
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

        <div className='flex-col add-product-description'>
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
          <div className='flex-col add-category'>
            <p>Product Category :</p>
            <select onChange={onChangeHandler} name='category'>
              <option value="Table">Table</option>
              <option value="Chair">Chair</option>
              <option value="Vas">Vas</option>
            </select>
          </div>
          <div className='flex-col add-price'>
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

export default Add;
