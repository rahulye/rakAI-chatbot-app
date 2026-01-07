import { useState } from 'react';
import { ChatInput } from './assets/components/ChatInput'
import { ChatMessages }  from './assets/components/ChatMessages';

                                                  
function App() {
  // message array - chatMessages
  const [ chatMessages , setChatMessage ] = useState([
    {
      message : "Hey!. How are you?",
      sender : "user",
      id : 'id1'
    },
    {
      message : "Yeah I am good. How are you?",
      sender : "bot",
      id : 'id2'
    },
    {
      message : "Great. Its been long just wanted to catch up?. How you have been? whats going on?",
      sender : "user",
      id : 'id3'
    },
    {
      message : "Doing alright. Just working yk and went on a trip to Alaska",
      sender : "bot",
      id : 'id4'
    }
  ]);
  //const chatMessages = array[0];
  //const setChatMessage = array[1];
  return (
    <>
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