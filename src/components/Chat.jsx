import React, { useState, useRef } from "react";
import sendMessage from "../service/gptAPI";
import { FiSend } from "react-icons/fi";
import TypeWriterEffect from "react-typewriter-effect";

function Chat() {
  const myAppRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  function handleInput(e) {
    setInput(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await sendMessage(input);
    setMessages([
      ...messages,
      { text: input, user: "you" },
      { text: response, user: "ai" },
    ]);
    setInput("");
  }

  return (
    <>
      <div className='mx-auto p-4 w-1/2 h-screen'>
        <div className='chat-header'>
          <h3 align='center' className='mb-0 text-3xl text-gray-400'>
            Chat with AI
          </h3>
        </div>
        <div className='chat-messages overflow-y-auto h-2/3'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message p-4 rounded-lg m-4 shadow-lg ${
                message.user === "ai"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-indigo-500"
              }`}
            >
              {message.user === "ai" ? (
                <p className='text-lg'>
                  {" "}
                  <TypeWriterEffect
                    startDelay={10}
                    text={message.text}
                    typeSpeed={30}
                    scrollArea={myAppRef.current}
                  />
                </p>
              ) : (
                <p className='text-lg'>{message.text}</p>
              )}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className='absolute left-1/2 w-1/2 transform -translate-x-1/2 px-4 pb-4'
        >
          <div className='input-container bg-white p-4 rounded-lg shadow-md'>
            <textarea
              label='Type your message here'
              variant='outlined'
              size='small'
              margin='normal'
              value={input}
              onChange={handleInput}
              placeholder='Type your message here'
              className='input-field w-full p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-gray-700'
            />
            <div className='items-center'>
              <button
                variant='contained'
                color='primary'
                type='submit'
                className='input-button bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <FiSend />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Chat;
