"use client";


import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface usernamelink {
    username : string
    isOpen:boolean,
    onClose: ()=>void
}

// declare a variable which will store frontend url


export default function ShareLinkModal({username,isOpen,onClose}: usernamelink) { // modal opens directly for demo
  const link = `http://localhost:3000/${username}`; // replace with dynamic link

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-indigo-100">
        <DialogHeader>
          <DialogTitle>Share your Link with others so they can follow you!</DialogTitle>
        </DialogHeader>

        <Card className="p-4">
          <CardContent className="w-full flex items-center justify-between bg-muted rounded-lg px-3 py-2">
            <span className="text-sm truncate">{link}</span>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={copyToClipboard}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
