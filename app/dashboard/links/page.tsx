"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2, Save, Plus, Edit, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useProtectedRoute } from "@/lib/hooks/useprotected";
import { AppSidebar } from "@/components/Sidebarapp";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

interface Link {
  id: string;
  linkUrl: string;
  description: string;
  linkThumbnail?: string | null;
}

interface Profile {
  username: string;
  email: string;
  profileimg: string;
  description: string;
}

export default function LinksManager() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [expandedLinks, setExpandedLinks] = useState<Set<string>>(new Set());
  const [editingLinks, setEditingLinks] = useState<Set<string>>(new Set());

  const { session, status } = useProtectedRoute();
  const router = useRouter();

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile");
      if (!response.ok) throw new Error("Failed to fetch profile.");
      const data: Profile = await response.json();
      setProfile(data);
    } catch {
      toast.error("Could not load profile.");
    }
  };

  // Fetch links
  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/links");
        const data = await res.json();
        setLinks(data || []);
      } catch {
        toast.error("Failed to load links");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchLinks();
      fetchProfile();
    }
  }, [session]);

  // Save link (create or update)
  const handleSave = async (link: Link) => {
    try {
      let res;
      if (link.id.startsWith("temp-")) {
        // new link -> POST
        const formData = new FormData();
        formData.append("linkUrl", link.linkUrl || "");
        formData.append("description", link.description || "");
        if (link.linkThumbnail && typeof link.linkThumbnail !== "string") {
          formData.append("file", link.linkThumbnail as any);
        }
        res = await fetch("/api/links", { method: "POST", body: formData });
      } else {
        // existing link -> PUT
        res = await fetch(`/api/links/${link.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            linkUrl: link.linkUrl,
            description: link.description,
          }),
        });
      }

      if (!res.ok) throw new Error("Save failed");
      const updated = await res.json();

      setLinks((prev) =>
        prev.map((l) => (l.id === link.id ? { ...updated } : l))
      );
      toast.success("Link saved");
    } catch {
      toast.error("Failed to save link");
    }
  };

  // Delete link
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setLinks((prev) => prev.filter((l) => l.id !== id));
      toast.success("Link deleted");
    } catch {
      toast.error("Failed to delete link");
    }
  };

  // Add new link
  const handleAdd = () => {
    setLinks((prev) => [
      ...prev,
      {
        id: `temp-${crypto.randomUUID()}`, // temporary ID until saved
        linkUrl: "",
        description: "",
      },
    ]);
  };

  // Handle file upload for thumbnail
  const handleFileChange = (id: string, file: File) => {
    setLinks((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, linkThumbnail: file as any } : l
      )
    );
  };

  // Toggle expanded state
  const toggleExpanded = (id: string) => {
    setExpandedLinks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Toggle editing state
  const toggleEditing = (id: string) => {
    setEditingLinks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Handle save and exit editing
  const handleSaveAndExit = async (link: Link) => {
    await handleSave(link);
    setEditingLinks(prev => {
      const newSet = new Set(prev);
      newSet.delete(link.id);
      return newSet;
    });
  };

  // Handle loading and redirect logic
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    useEffect(() => {
      router.push("/signin");
    }, [router]);
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <AppSidebar 
          username={profile?.username || ""} 
          email={profile?.email || ""} 
          profileimg={profile?.profileimg || ""} 
          description={profile?.description || ""}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold gradient-text">Link Manager</h1>
                <p className="text-muted-foreground mt-1">Create and manage your links</p>
              </div>
              <Button
                onClick={handleAdd}
                className="glass-card border-accent/30 hover:border-accent/50"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Link
              </Button>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <Loader2 className="animate-spin w-6 h-6 text-accent" />
                  <span className="text-muted-foreground">Loading your links...</span>
                </div>
              </div>
            )}

            {/* Links Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {links.map((link) => {
                const isExpanded = expandedLinks.has(link.id);
                const isEditing = editingLinks.has(link.id);
                const isNewLink = link.id.startsWith("temp-");

                return (
                  <Card
                    key={link.id}
                    className={`glass-card border-accent/20 transition-all duration-300 hover:shadow-lg ${
                      isNewLink ? 'ring-2 ring-accent/30' : ''
                    }`}
                  >
                    <CardContent className="p-6">
                      {/* Link Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {link.linkThumbnail && typeof link.linkThumbnail === "string" && (
                            <img
                              src={link.linkThumbnail}
                              alt="Link thumbnail"
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">
                              {link.description || "Untitled Link"}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {link.linkUrl || "No URL set"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {link.linkUrl && !isNewLink && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(link.linkUrl, '_blank')}
                              className="h-8 w-8 p-0"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(link.id)}
                            className="h-8 w-8 p-0"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="space-y-4 border-t pt-4">
                          {isEditing ? (
                            // Edit Mode
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium text-foreground">Title</Label>
                                <Input
                                  placeholder="Follow me on Instagram!"
                                  value={link.description || ""}
                                  onChange={(e) =>
                                    setLinks((prev) =>
                                      prev.map((l) =>
                                        l.id === link.id
                                          ? { ...l, description: e.target.value }
                                          : l
                                      )
                                    )
                                  }
                                  className="mt-1"
                                />
                              </div>

                              <div>
                                <Label className="text-sm font-medium text-foreground">URL</Label>
                                <Input
                                  placeholder="https://yourlink.com"
                                  value={link.linkUrl || ""}
                                  onChange={(e) =>
                                    setLinks((prev) =>
                                      prev.map((l) =>
                                        l.id === link.id
                                          ? { ...l, linkUrl: e.target.value }
                                          : l
                                      )
                                    )
                                  }
                                  className="mt-1"
                                />
                              </div>

                              <div>
                                <Label className="text-sm font-medium text-foreground">Thumbnail</Label>
                                <div className="flex items-center space-x-3 mt-1">
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      e.target.files?.[0] &&
                                      handleFileChange(link.id, e.target.files[0])
                                    }
                                    className="flex-1"
                                  />
                                  {link.linkThumbnail &&
                                    typeof link.linkThumbnail === "string" && (
                                      <img
                                        src={link.linkThumbnail}
                                        alt="Thumbnail"
                                        className="w-12 h-12 rounded-lg object-cover"
                                      />
                                    )}
                                </div>
                              </div>

                              <div className="flex gap-2 pt-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveAndExit(link)}
                                  className="flex-1"
                                >
                                  <Save className="w-4 h-4 mr-2" />
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => toggleEditing(link.id)}
                                  className="flex-1"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            // View Mode
                            <div className="space-y-3">
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                                <p className="text-foreground mt-1">{link.description || "No title set"}</p>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">URL</Label>
                                <p className="text-foreground mt-1 break-all">{link.linkUrl || "No URL set"}</p>
                              </div>

                              <div className="flex gap-2 pt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => toggleEditing(link.id)}
                                  className="flex-1"
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </Button>
                                {!isNewLink && (
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(link.id)}
                                    className="flex-1"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Empty State */}
            {!loading && links.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Plus className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No links yet</h3>
                <p className="text-muted-foreground mb-6">Get started by adding your first link</p>
                <Button
                  onClick={handleAdd}
                  className="glass-card border-accent/30 hover:border-accent/50"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Link
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
