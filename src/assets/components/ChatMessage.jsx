import dayjs from 'dayjs';
import RobotProfileImage from '../icon.png';
import UserProfileImage from '../user.png';
import './ChatMessage.css'

export function ChatMessage({ message , sender , time }) {
  return (
    <div className={ sender === "user" ? "chatMsg-container-user" : "chatMsg-container-bot" }>
      { sender === "bot" && <img className="chat-image" src={ RobotProfileImage }/>} 
      <div className={ `chat-message-${sender}` }>
        <div>
          { message }
        </div>
        { time && (
          <div className={ `mssg-time-${sender}` }>
            { dayjs(time).format('HH:mm') }
          </div>
        )}
      </div>
      { sender === "user" && <img className="chat-image" src={ UserProfileImage }/>}
    </div>
  );
};