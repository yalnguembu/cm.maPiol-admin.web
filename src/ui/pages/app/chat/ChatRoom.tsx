import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "@/utils/configs/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import MessageBubble from "@/ui/components/chat/MessageBubble";
import FileUpload from "@/ui/components/chat/FileUpload";
import { ServicesContext, DependenciesContext } from "@/utils/useDependencies";
import { MessageView } from "@/primary/chat/MessageView";
import { ConversationToSave } from "@/domains/chat/types";
import { User } from "@/domains/user";
import { ApiMessage } from "@/secondary/chat/ApiChat";
import { PropertyView } from "@/primary/property/PropertyView";

type ChatDetailsProps = {
  otherUser: User;
  onClose: () => void;
  property: PropertyView;
};
const ChatDetails = ({ otherUser, onClose, property }: ChatDetailsProps) => {
  return (
    <div className="w-80 border-l bg-base-100 p-4 absolute top-0 right-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Chat Details</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center">
        {property?.images[0] ? (
          <img
            src={property?.images[0]}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            {/* <span className="text-3xl text-gray-500 uppercase">
              {otherUser?.name?.[0] || "?"}
            </span> */}
          </div>
        )}
        <h4 className="mt-4 font-semibold">{property?.nomPropriete}</h4>
        <h4 className="mt-4 font-semibold">
          {otherUser?.properties.firstname} {otherUser?.properties.firstname}
        </h4>
        <p className="text-gray-500">{property?.address}</p>
      </div>
    </div>
  );
};

const ChatRoom = () => {
  const { notificationServices, chatServices, propertyServices } =
    useContext<ServicesContext>(DependenciesContext);

  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageView[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [conversation, setConversation] = useState<ConversationToSave | null>();
  const messagesEndRef = useRef(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [property, setProperty] = useState<PropertyView | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(true);

  const fetchChatInfo = async () => {
    if (!chatId) return;

    // const data = await chatServices.getAllMessagesByConversationId(chatId);
    // if (data) {
    // setMessages(data);
    const conver = await chatServices.getConversationById(chatId);
    setConversation(conver);
    const propertyFetched = await propertyServices.getById(conver.propertyId);
    setProperty(PropertyView.fromDomain(propertyFetched));
    // setMessages(data);

    // const user = await userServices.getUserByUUID(conver.);
    // setOtherUser(user);
    // }
  };

  useEffect(() => {
    fetchChatInfo();
  }, [chatId]);

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, `Conversations/${chatId}/Messages`),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageFetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(
        messageFetched.map((message) =>
          MessageView.fromDomain(ApiMessage.toDomain(message))
        )
      );
    });

    return () => unsubscribe();
  }, [chatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (e, fileUrl = null) => {
    e?.preventDefault();

    if (!newMessage.trim() && !fileUrl) return;

    try {
      const messageData = {
        text: newMessage.trim(),
        senderId: auth.currentUser.uid,
        isImage: !!fileUrl,
        timestamp: serverTimestamp(),
        ...(fileUrl && { fileUrl }),
      };

      await addDoc(
        collection(db, `Conversations/${chatId}/Messages`),
        messageData
      );

      await updateDoc(doc(db, "Conversations", chatId), {
        lastMessage: fileUrl ? "Sent an attachment" : newMessage.trim(),
        lastUpdated: serverTimestamp(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileUpload = (fileUrl) => {
    sendMessage(null, fileUrl);
  };

  return (
    <>
      {chatId && (
        <div className="flex h-full">
          <div className="flex-1 flex flex-col">
            <div className=" border-b px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={conversation?.propertyPicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-semibold text-xl text-gray-800">
                    {conversation?.propertyName || "Loading..."}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {conversation?.ownerName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="border-t pt-4">
              <div className="flex items-center p-0 m-0 gap-x-2">
                <FileUpload onFileUpload={handleFileUpload} />
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDetails && property && (
        <ChatDetails
          property={property}
          otherUser={otherUser}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default ChatRoom;
