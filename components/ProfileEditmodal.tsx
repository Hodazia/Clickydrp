import { useState } from "react";
import { X, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { username: string; email: string; profileimg: string , description:string}) => void;
  username:string,
  email:string,
  profileimg:string,
  description:string
}

// the intial data shall be from the api fetching from the be, 
/*

isOpen -> false,
function onClose()=>{
  setisOpen((prev) => !prev)
}
interface formData {
  username:string,
  email:string,
  description:string,
  profileImage:string
}
  
function onSubmit(data : formData) {
// submit the modal and close it, submit it to the Db,


}
ProfileEditModal, isOpen -> true,
onClose => a functon to close the modal


*/
export function ProfileEditModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  username,
  email,
  profileimg,
  description
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState({
    username: username,
    email: email,
    profileimg: profileimg,
    description:description
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profileimg: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-accent/20 max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-center gradient-text">
            Edit Profile
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 hover:bg-accent/20"
            onClick={onClose}
          >
            {/* <X className="h-4 w-4" /> */}
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20 ring-2 ring-accent/30">
                <AvatarImage 
                  src={formData.profileimg} 
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent
                 text-primary-foreground text-xl">
                  {formData.username.split('')[0]}
                </AvatarFallback>
              </Avatar>
              <label htmlFor="profileimage" className="absolute bottom-0 right-0 p-1 
              rounded-full bg-primary hover:bg-primary/90 cursor-pointer glow-shadow">
                <Upload className="h-3 w-3 text-primary-foreground" />
              </label>
              <input
                id="profileimage"
                type="file"
                accept="image/*"
                className="hidden border-indigo-600 "
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="glass-card border-indigo-200 "
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="glass-card border-indigo-200 "
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="glass-card border-indigo-200"
              placeholder="Write something about yourself"
              required
            />
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-2.5 font-semibold
            bg-indigo-600 text-white  hover:bg-gray-100
          hover:ring-2 hover:ring-indigo-600 hover:text-black
            "
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}