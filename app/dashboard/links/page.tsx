'use client'

import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { LucidePlus, LucideX } from 'lucide-react';
import { useProtectedRoute } from '@/lib/hooks/useprotected';
import { useRouter } from 'next/navigation';


// Define the type for a Link object
interface Link {
    id: string;
    linkUrl: string;
    linkThumbnail: string | null;
    description: string | null;
  }


interface FormDataProps {
    linkUrl: string;
    description: string;
    file: File | null;
}

// Main application component for the links dashboard
export default function App() {
    const { session,status} = useProtectedRoute();
    console.log("Session is " , session);
    console.log("Status is ", status)
    const router = useRouter();

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return null; 
  const [links, setLinks] = useState<Link []>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataProps>({
    linkUrl: '',
    description: '',
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch links from the API
  const fetchLinks = async () => {
    try {
        // get the links
      const response = await fetch('http://localhost:3000/api/links',{
        method:'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }
      const data = await response.json();
      console.log("Data is ", data);
      setLinks(data);
    } catch (error) {
      toast.error('Could not load links. Please try again.');
    }
  };

  // Fetch links on component mount
  useEffect(() => {
    fetchLinks();
  }, []);

  // Handle input changes for the form
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e:any) => {
    setFormData((prevData) => ({ ...prevData, file: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading('Adding your link...');

    const data = new FormData();
    data.append('linkUrl', formData.linkUrl);
    data.append('description', formData.description);
    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      const response = await fetch('http://localhost:3000/api/links', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add link');
      }

      const newLink = await response.json();
      console.log("The link to be addede is ", newLink);
      setLinks((prevLinks) => [...prevLinks, newLink]);
    //   setLinks((prev) => [...prev,newLink]);
      toast.success('Link added successfully!', { id: toastId });
      setIsModalOpen(false);
      setFormData({ linkUrl: '', description: '', file: null }); // Reset form
    } catch (error:any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="p-6 sm:p-8 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">Your Links</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg transform transition-all hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LucidePlus size={20} />
            <span className="font-medium">Add Link</span>
          </button>
        </div>

        {/* Links Display Section */}
        <div className="p-6 sm:p-8 space-y-4">
          {links.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p>No links added yet. Click "Add Link" to get started!</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                  {link.linkThumbnail && (
                    <img
                      src={link.linkThumbnail}
                      alt="Link Thumbnail"
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                  )}
                  <div className="flex-1 text-center min-w-0">
                    <a
                      href={link.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate font-semibold text-indigo-600 hover:underline"
                    >

                    {link.description && (
                      <p className="mt-1 text-sm text-gray-600 truncate">{link.description}</p>
                    )}

                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Add Link Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Add New Link</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                <LucideX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="linkUrl">Link URL</label>
                <input
                  type="url"
                  id="linkUrl"
                  name="linkUrl"
                  value={formData.linkUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="file">Thumbnail (Optional)</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  className="w-full block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                >
                  {isLoading ? 'Adding...' : 'Add Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
