import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/menu";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import CreateChatDialog from "./CreateChatDialog";

import { Menu, Plus, Search, Trash } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatSidebarProps {
  selectedChat: number | string | undefined;
  setSelectedChat: (value: number | string | undefined) => void;
}

export default function ChatSidebar({ selectedChat, setSelectedChat }: ChatSidebarProps) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showDeleteChatDialog, setShowDeleteChatDialog] = useState(false);
  const [showCreateChatDialog, setShowCreateChatDialog] = useState(false);

  return (
    <div className="border-r-2 min-w-72">
      <div className="flex items-center justify-between gap-2 px-2 py-4">
        {showSearchInput ? <Input placeholder="Search Chat" /> : <p>Chats</p>}

        <div className="flex items-center">
          <Button variant={showSearchInput ? "default" : "ghost"} onClick={() => setShowSearchInput((show) => !show)} className="rounded-full size-8">
            <Search />
          </Button>

          <Button onClick={() => setShowCreateChatDialog(true)} variant="ghost" className="rounded-full size-8">
            <Plus className="size-5" />
          </Button>

          <CreateChatDialog showCreateChatDialog={showCreateChatDialog} setShowCreateChatDialog={setShowCreateChatDialog} />
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100svh-120px)] p-2 flex flex-col gap-1">
        {Array.from({ length: 20 }).map((_, index: number) => (
          <Item
            key={index}
            className={`hover:bg-secondary p-2 hover:cursor-pointer ${index === selectedChat ? "bg-secondary" : ""}`}
            onClick={() => setSelectedChat(index)}
          >
            <ItemMedia>
              <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>chat name</ItemTitle>
              <ItemDescription>last message in this chat</ItemDescription>
            </ItemContent>
            <ItemActions>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost">
                    <Menu />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setShowDeleteChatDialog(true)} className="text-red-400">
                      <Trash /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ItemActions>
          </Item>
        ))}
      </div>

      <ConfirmDeleteDialog showConfirmDeleteChatDialog={showDeleteChatDialog} setShowConfirmDeleteChatDialog={setShowDeleteChatDialog} />
    </div>
  );
}
