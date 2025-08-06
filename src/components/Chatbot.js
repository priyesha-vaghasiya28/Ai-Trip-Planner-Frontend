import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am an AI assistant for EasyTrip.ai. I can help you with your travel plans and answer questions about our services.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '' || loading) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(currentMessages => [...currentMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chatbot/ask', { message: input }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const botResponse = res.data.response;
      const newBotMessage = { text: botResponse, sender: 'bot' };
      setMessages(currentMessages => [...currentMessages, newBotMessage]);
    } catch (err) {
      console.error('Error fetching chatbot response:', err);
      const errorMessage = { text: "Sorry, I am unable to connect right now. Please try again later.", sender: 'bot' };
      setMessages(currentMessages => [...currentMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container card shadow-lg mt-5">
      <h2 className="card-title text-center p-3 mb-0 bg-primary text-white">EasyTrip.ai Assistant</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message-container ${msg.sender}`}>
            <div className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message-container bot">
            <div className="message-bubble bot">
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Thinking...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="input-group chatbot-input-container">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
};

export default Chatbot;