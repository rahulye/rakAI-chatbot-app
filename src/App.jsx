import { useState , useEffect } from 'react';
import { ChatInput } from './assets/components/ChatInput'
import { ChatMessages }  from './assets/components/ChatMessages';
import { Chatbot } from 'supersimpledev';

                                                  
function App() {
  // message array - chatMessages
  const [ chatMessages , setChatMessage ] = useState( JSON.parse( localStorage.getItem( 'messages' )) || []);
  //const chatMessages = array[0];
  //const setChatMessage = array[1];

  useEffect( () => {
    Chatbot.addResponses({
      'goodbye' : 'Goodbye. Have a great day!',
      'Hi' : 'Hi! How can I help you?',
      'Hello' : 'Hello! How can I help you?',
      'give me a random id' : () => {
        return `Sure! here --> ${crypto.randomUUID()}`
      },
      'Give me a random Id' : () => {
        return `Sure! here --> ${crypto.randomUUID()}`
      }
    });
  }, []);

  return (
    <>
      {chatMessages.length === 0 && (
        <p className="welcome-message">
          Welcome to the rakAI chatbot! <br/>Send a message using the textbox.
        </p>
      )}
      <ChatMessages 
        chatMessages = { chatMessages }
      />
      <ChatInput 
        chatMessages = { chatMessages }
        setChatMessage = { setChatMessage }
      />
    </>
  );
};

export default App;