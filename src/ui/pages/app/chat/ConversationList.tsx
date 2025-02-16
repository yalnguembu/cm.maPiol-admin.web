import React, { useContext, useEffect, useState } from "react";
import { auth } from "@/utils/configs/firebase";
import { Link } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import { useSelector } from "react-redux";
import { ServicesContext, DependenciesContext } from "@/utils/useDependencies";
import { ConversationView } from "@/primary/chat/ConversationView";

const ConversationList = () => {
  const { notificationServices, chatServices } =
    useContext<ServicesContext>(DependenciesContext);
  const { isTenant, isVisitor, isAdmin } = useSelector((state) => state.auth);

  const [conversations, setConversations] = useState<ConversationView[]>([]);
  const currentUser = auth.currentUser;

  const fetchConversations = async () => {
    const data = await chatServices.getMinesConversations(
      currentUser.uid,
      isTenant || isVisitor ? "client" : "owner"
    );
    setConversations(data);
    console.log(data);
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchConversations();
    // return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="grid grid-cols-11 gap-x-4 h-[75dvh] overflow-hidden absolute w-4/5">
      <div className="col-span-3 w-full bg-base-100 rounded-lg p-4 relative h-full overflow-y-auto">
        <div className="space-y-2 divide-y ">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              to={`/chat/${conversation.id}`}
              className="block py-4 rounded-sm hover:bg-gray-50"
            >
              <div className="flex justify-between items-center gap-x-2">
                <div className="w-10 h-10 overflow-hidden block rounded-full">
                  <img
                    src={conversation?.propertyPicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg truncate">
                    {conversation.propertyName}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {conversation.lastMessage}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {/* {conversation.lastUpdated} */}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-8 h-full">
        <ChatRoom />
      </div>
    </div>
  );
};

export default ConversationList;
