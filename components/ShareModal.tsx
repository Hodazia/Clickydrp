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
  const link = `https://clickydrp.vercel.app/${username}`; // replace with dynamic link

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md bg-white rounded-2xl shadow-lg p-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-800">
            Share your Link with others so they can follow you!</DialogTitle>
        </DialogHeader>

        <Card className="mt-4 border-none ">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center 
          justify-between gap-3 bg-indigo-50 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-700 w-full break-words">{link}</span>
            <Button 
              size="icon" 
              variant="ghost" 
              className="flex-shrink-0 rounded-full hover:bg-indigo-100 transition"
              onClick={copyToClipboard}
            >
              <Copy className="w-4 h-4 text-indigo-400" />
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
