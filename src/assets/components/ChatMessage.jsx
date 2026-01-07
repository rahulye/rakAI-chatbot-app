import RobotProfileImage from '../bot.png';
import UserProfileImage from '../user.png';
import './ChatMessage.css'

export function ChatMessage({ message , sender }) {
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