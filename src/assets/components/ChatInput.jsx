import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import './ChatInput.css'
import LoadingSpinnerGif from '../loading-spinner.gif';

export function ChatInput({ chatMessages , setChatMessage }) {
  // 1.get the Input value and save it in inputText
  const [ inputText , setInputText ] = useState('');
  const [ isLoading , setIsLoading ] = useState(false);      
  function handleKeyDown( event ) {
    if( event.key === 'Enter' ) sendMessage();
    if( event.key === 'Escape' ) setInputText('');
  };
  function saveInputText( event ) {
    setInputText( event.target.value );
  };
  // 2.from the InpuText value --> send it into chatMessages(message array)
  async function sendMessage() {
    if( inputText === '' ) {
      alert('Invalid, maybe type something...');
      return;
    };
    if( isLoading === true ) {
      return;
    };
    setInputText('');
    setIsLoading(true);
    const newChatMessage = [
      ...chatMessages,
      {
        message : inputText,
        sender : 'user',
        time : dayjs().valueOf(),
        id : crypto.randomUUID()
      }
    ] 
    setChatMessage( newChatMessage );
    setChatMessage([
      ...newChatMessage,
      {
        message : <img className="loading-image" src={ LoadingSpinnerGif } />,
        sender : 'bot',
        id : crypto.randomUUID()
      }
    ]);
    const response = await Chatbot.getResponseAsync( inputText );        
    setChatMessage([
      ...newChatMessage,
      {
        message : response,
        sender : 'bot',
        time : dayjs().valueOf(),
        id : crypto.randomUUID()
      }
    ]);
    setIsLoading(false);
  }
  return (
    <section className = "hero-head-container">
      <input 
        onChange = { saveInputText } 
        placeholder="Look up here.." 
        size="40"
        value  = { inputText } // this change the input value after whatever is saved inside the inputText
        onKeyDown = { handleKeyDown }
        className = "chat-input"
      />
      <button
        onClick = { sendMessage }  
        disabled = { isLoading }
      >
        { isLoading ? 'Sending' : 'Send' }
      </button>
    </section>
  );
};