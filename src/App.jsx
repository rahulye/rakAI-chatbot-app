import { useState , useEffect } from 'react';
import { ChatInput } from './assets/components/ChatInput'
import { ChatMessages }  from './assets/components/ChatMessages';
import { Chatbot } from 'supersimpledev';

                                                  
function App() {
  // message array - chatMessages
  const [ chatMessages , setChatMessage ] = useState([
    {
      message : "Hey!. How are you?",
      sender : "user",
      id : 'id1',
      time : '21024525582'
    },
    {
      message : "Yeah I am good. How are you?",
      sender : "bot",
      id : 'id2',
      time : '21024525583'
    },
    {
      message : "Great. Its been long just wanted to catch up?. How you have been? whats going on?",
      sender : "user",
      id : 'id3',
      time : '21024525584'
    },
    {
      message : "Doing alright. Just working yk and went on a trip to Alaska",
      sender : "bot",
      id : 'id4',
      time : '21024525585'
    }
  ]);
  //const chatMessages = array[0];
  //const setChatMessage = array[1];

  useEffect( () => {
    Chatbot.addResponses({
      'goodbye' : 'Goodbye. Have a great day Rahul!',
      'give me an id' : () => {
        return `Sure! here --> ${crypto.randomUUID()}`
      }
    });
  }, []);

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