import React, { useState } from 'react';
import sendMessage from '../service/gptAPI';
import '../css/chat.css';
import {FiSend} from "react-icons/fi";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  function handleInput(e) {
    setInput(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await sendMessage(input);
    setMessages([...messages, `${response}`]);
    setInput('');
  }

  return (
    <>
      <div className="mx-auto p-4 w-full">
        <div className="chat-header">
          <h3 align="center" className="mb-0">
            chat
          </h3>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <p className="typewriter">{message}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <textarea
              label="Type your message here"
              variant="outlined"
              size="small"
              margin="normal"
              value={input}
              onChange={handleInput}
              placeholder="Type your message here"
              className="input-field"
            />
            <div className='items-center'><button variant="contained" color="primary" type="submit" className="input-button p-2 h-20 w-20">
                <FiSend />
            </button></div>
            
          </div>
        </form>
      </div>
    </>
  );
}

export default Chat;
