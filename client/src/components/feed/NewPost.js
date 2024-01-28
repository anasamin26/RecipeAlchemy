import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import EmojiPicker from 'react-emoji-picker';
import { FaCamera } from 'react-icons/fa';
import Picker from 'emoji-picker-react';
import { FiSmile } from "react-icons/fi";

const NewPostForm = ({ onAddPost,user }) => {
  const [newPost, setNewPost] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [image, setImage] = useState('');
  const [file,setFile]=useState(null);
  
  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
    setNewPost(newPost.concat(emojiObject));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleAddPost = () => {
    if (newPost.trim() !== '') {
      onAddPost(newPost, image, file);
      setNewPost('');
      setSelectedEmoji(null);
      setImage(null); // Clear the image after posting
    }
  };

  return (
    <div className="mb-6 bg-white w-[30rem] rounded-lg shadow-md p-4">
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        className="w-full rounded-lg bg-gray-100 p-2"
        rows="3"
        placeholder="Share your tasty recipes"
      ></textarea>
      <div className="mt-2 flex items-center">
        <div className="flex flex-row m-1">
          <label htmlFor="upload" className="cursor-pointer text-purple-500 hover:text-purple-900">
            <FaCamera className="ml-2 w-5 h-5" />
          </label>
          <FiSmile
            onClick={() => {
              setToggleEmoji(!toggleEmoji);
            }}
            className="h-5 w-6 ml-2 hover:text-yellow-500 cursor-pointer"
          />
          {toggleEmoji && (
            <div className='absolute z-10 mt-8'>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div>
          <input
            id="upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
        </div>
        {image && (
          <div className="ml-4">
            <img src={image} alt="Preview" className="w-12 h-12 object-cover rounded-full" />
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button onClick={handleAddPost} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-900">
          Post
        </button>
      </div>
    </div>
  );
};

export default NewPostForm;
