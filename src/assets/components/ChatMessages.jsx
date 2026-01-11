import { useRef , useEffect} from 'react';
import { ChatMessage }  from './ChatMessage';
import './ChatMessages.css'

export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null); //initial value is 'null' and useRef returns a object

  useEffect( () => {
    const containerElement = chatMessagesRef.current;
    if( containerElement ) {
      containerElement.scrollTop = containerElement.scrollHeight 
    }
  }, [ chatMessages ]); // chatMessages here, wheneer chatmessages changes then only run thats it  
  
  
  useEffect( () => {
    localStorage.setItem( 'messages' , JSON.stringify( chatMessages ));
  }, [ chatMessages ]);
  
  //const message = properties.message;
  //const sender = properties.sender;
  //const { message , sender } = properties;
  return (
    <section className="hero-chatmssg-container" ref={ chatMessagesRef }>
      {
        chatMessages.map( (chat) => {
          return (
            <ChatMessage
                message = {chat.message}
                sender = {chat.sender}
                time = {chat.time}
                key = {chat.id}
              />
            ); 
          })}
    </section>
  );
};
