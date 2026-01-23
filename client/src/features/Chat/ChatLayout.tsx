import { useState } from "react";

import ChatEmptyPage from "./ChatEmptyPage";
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<number | string | undefined>(undefined);

  return (
    <div className="flex h-[calc(100svh-56px)]">
      <ChatSidebar selectedChat={selectedChat} setSelectedChat={setSelectedChat} />

      {/* Show chat messages if any chat is selected */}
      {true ? <ChatMain /> : <ChatEmptyPage />}
    </div>
  );
}
