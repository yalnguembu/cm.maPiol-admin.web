import React, { useEffect, useState } from "react";
import { db, auth } from "../../../utils/configs/firebase";
import { collection, query, where, onSnapshot, orderBy, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

// New Modal Component
const NewChatModal = ({ isOpen, onClose, onCreateChat }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    // Fetch all users except current user
    const q = query(
      collection(db, "users"),
      where("uid", "!=", auth.currentUser?.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, [isOpen]);

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-96">
          <h2 className="text-xl font-bold mb-4">Start New Conversation</h2>
          <div className="max-h-64 overflow-y-auto">
            {users.map(user => (
              <div
                key={user.uid}
                onClick={() => setSelectedUser(user)}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedUser?.uid === user.uid ? 'bg-blue-50' : ''
                }`}
              >
                {user.name || user.email}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedUser) {
                  onCreateChat(selectedUser);
                  onClose();
                }
              }}
              disabled={!selectedUser}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = auth.currentUser;

  // ... existing useEffect for conversations ...

  const createNewChat = async (selectedUser) => {
    try {
      const chatRef = await addDoc(collection(db, "chats"), {
        participants: [currentUser.uid, selectedUser.uid],
        lastMessage: "",
        lastUpdated: new Date()
      });
      
      // Navigate to new chat
      window.location.href = `/chat/${chatRef.id}`;
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 relative min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Conversations</h1>
      <div className="space-y-2">
        {/* ... existing conversations map ... */}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      <NewChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateChat={createNewChat}
      />
    </div>
  );
};

export default ConversationList;