import React from "react";
import { auth } from "../../../utils/configs/firebase";
import { MessageView } from "@/primary/chat/MessageView";

type MessageBubbleProps = {
  message: MessageView;
};
const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isCurrentUser = message.senderId === auth.currentUser?.uid;

  const ReadStatus = () => {
    if (!isCurrentUser) return null;

    return (
      <div className="text-xs mt-1">
        {message.read ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline text-blue-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    );
  };

  const date = new Date(message.timestamp);

  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isCurrentUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {message.text}
        {/* {message.isImage && (
          <img
            src={message.imageLink}
            alt="Atteched File"
            className="w-10 h-10 rounded-full object-cover"
          />
        )} */}
        {/* <div className="text-xs mt-1 opacity-70 flex justify-between items-center"> */}
          {/* <span>{`${date.toLocaleString()} ${date.toLocaleTimeString()}`}</span> */}
          {/* <ReadStatus /> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default MessageBubble;
