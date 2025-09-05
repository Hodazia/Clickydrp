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
  onSubmit: (data: { username: string; email: string; profileImage: string , description:string}) => void;
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
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profileImage: "",
    description:""
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
          profileImage: e.target?.result as string
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
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20 ring-2 ring-accent/30">
                <AvatarImage 
                  src={formData.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"} 
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl">
                  {formData.username.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 p-1 rounded-full bg-primary hover:bg-primary/90 cursor-pointer glow-shadow">
                <Upload className="h-3 w-3 text-primary-foreground" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
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
              className="glass-card border-accent/20 focus:border-accent"
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
              className="glass-card border-accent/20 focus:border-accent"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-2.5 font-semibold"
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}