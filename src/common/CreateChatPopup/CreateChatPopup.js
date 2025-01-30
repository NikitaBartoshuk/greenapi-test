import React, {useState, useContext} from 'react';
import './createchatpopup.css'
import { IoMdExit } from "react-icons/io";
import { AppContext } from '../../pages/MainPage/MainPage';

const CreateChatPopup = ({ onClick }) => {
    const { addChat } = useContext(AppContext);
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const createChat = () => {
        if (input.trim()) {
            const chatId = input + '@c.us';
            addChat(chatId);
            onClick();
        }
    };

    return (
        <section className='create-chat-popup-container'>
            <IoMdExit className='nav-icon exit-popup-icon' onClick={onClick} />
            <h2>Enter phone number</h2>
            <input type="text" placeholder='Enter phone number' value={input} onChange={handleInputChange} />
            <button onClick={createChat}>Create</button>
        </section>
    );
};

export default CreateChatPopup;