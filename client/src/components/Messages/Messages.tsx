import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import userAvatar from "../../assets/userAvatar.png";
import "./messages.scss";
import chatStore from "../../stores/chatStore";

const Messages: React.FC = observer(() => {
  let classNameUser: string = "user__current";
  let classNameRecipient: string = "user__recipient";

  return (
    <div className="users">
      {chatStore.messages.map((message) => (
        <div key={message.id} className={`${chatStore.currentNickname === message.userName ? classNameUser : classNameRecipient} message`}>
          <div className="about__user">
            <img className="userAvatar" src={userAvatar} alt="userAvatar" />
            <p className="userName">{message.userName}</p>
          </div>
          <div className="about__message">
            <p className="text">{message.text}</p>
            <p className="date">{message.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Messages;
