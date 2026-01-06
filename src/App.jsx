import { useState , useRef , useEffect} from 'react';
import { Chatbot } from 'supersimpledev';
import RobotProfileImage from './assets/bot.png';
import UserProfileImage from './assets/bot.png';
import LoadingSpinnerGif from './assets/loading-spinner.gif';

                                                     // <---- Chat Input Head --->
function ChatInput({ chatMessages , setChatMessage }) {
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
                                            // <------ Message Component ----->
function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null); //initial value is 'null' and useRef returns a object

  useEffect( () => {
    const containerElement = chatMessagesRef.current;
    if( containerElement ) {
      containerElement.scrollTop = containerElement.scrollHeight 
    }
  }, [ chatMessages ]);
  //const message = properties.message;
  //const sender = properties.sender;
  //const { message , sender } = properties;
  function ChatMessage({ message , sender }) {
    return (
      <div className={ sender === "user" ? "chatMsg-container-user" : "chatMsg-container-bot" }>
        { sender === "bot" && <img className="chat-image" src={ RobotProfileImage }/>} 
        <div className="chat-message">
          { message }
        </div>
        { sender === "user" && <img className="chat-image" src={ UserProfileImage }/>}
      </div>
    );
  };
  return (
    <section className="hero-chatmssg-container" ref={ chatMessagesRef }>
      {
        chatMessages.map( (chat) => {
          return (
            <ChatMessage
              message = {chat.message}
              sender = {chat.sender}
              key = {chat.id}
            />
          ); 
        })}
    </section>
  );
};
                                              // <--------- App ------->
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