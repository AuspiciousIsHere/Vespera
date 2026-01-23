import { IoAttach, IoSend } from "react-icons/io5";
import { UserRound } from "lucide-react";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatMain() {
  const messages = [
    {
      userID: 1,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 2,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 1,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 2,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 1,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 2,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 1,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 2,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 1,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 2,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 1,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
    {
      userID: 2,
      message:
        "Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message",
    },
  ];

  return (
    <div className="bg-linear-240 from-10% from-accent-foreground/5">
      <div className="w-3/5 h-full mx-auto py-5">
        <div className="flex flex-col shrink h-10/11 overflow-auto">
          {messages.map((message) => (
            <Item className={`flex gap-4 items-start max-w-3/5 ${message.userID === 1 ? "flex-row" : "flex-row-reverse ml-auto"}`}>
              <ItemMedia variant="icon" className="rounded-full size-12">
                <UserRound className="size-7" />
              </ItemMedia>
              <ItemContent>
                <Card
                  className={`py-3 ${message.userID === 2 ? "bg-linear-to-tr from-70% from-accent/20 to-accent-foreground/30 backdrop-blur-md" : ""}`}
                >
                  <CardContent>
                    <CardDescription>{message.message}</CardDescription>
                  </CardContent>
                </Card>
              </ItemContent>
            </Item>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full">
          <div className="relative w-full">
            <Input placeholder="Message" className="p-2 rounded-full" />
            <Button className="absolute top-1/2 -translate-1/2 -right-2 rounded-full transition">
              <IoSend />
            </Button>
          </div>

          <Button className="rounded-full h-full" size="icon-lg">
            <IoAttach className="rotate-45 size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
