import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { ChatStoreContext } from "../../stores/chatStore";
import userAvatar from "../../assets/userAvatar.png";
import "./users.scss";

const Users: React.FC = observer(() => {
  const store = useContext(ChatStoreContext);

  if (!store.messagesIsReverse) {
    store.currentMessages = store.messages;
  } else {
    store.currentMessages = store.messagesReverse;
  }

  let className: string | null = "user__current";

  return (
    <div>
      <div className="users">
        {store.currentMessages.map((message, index) => (
          <div key={index} className={`${store.currentNickname === message.userName && className} message`}>
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

export default Users;
