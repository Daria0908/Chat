import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ChatStoreContext } from "../../stores/chatStore";
import userAvatar from "../../assets/userAvatar.png";
import "./messages.scss";

const Messages: React.FC = observer(() => {
  const store = useContext(ChatStoreContext);
  let classNameUser: string = "user__current";
  let classNameRecipient: string = "user__recipient";

  return (
    <div>
      <h3 className="users__header">Users</h3>
      <div className="users">
        {store.messages.map((message, index) => (
          <div key={index} className={`${store.currentNickname === message.userName ? classNameUser : classNameRecipient} message`}>
            <div className="about__user">
              <img className="userAvatar" src={userAvatar} alt="userAvatar" />
              <h2 className="userName">{message.userName}</h2>
            </div>
            <div className="about__message">
              <p className="text">{message.text}</p>
              <p className="date">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Messages;
