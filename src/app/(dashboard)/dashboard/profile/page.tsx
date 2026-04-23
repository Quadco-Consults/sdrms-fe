"use client";

import { useState, useRef } from "react";
import { User, Mail, Lock, Bell, Save, Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 1500);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload image
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);

    // TODO: Replace with actual API endpoint
    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Replace with actual API call
      // const response = await fetch("/api/user/profile-image", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await response.json();

      alert("Profile picture updated successfully!");
    } catch (error) {
      alert("Failed to upload profile picture");
      setProfileImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile" },
        ]}
      />
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <User className="h-6 w-6 text-[#4CAF50]" />
              Profile Settings
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your account information and preferences
            </p>
          </div>
        </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-[#4CAF50] flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                "AI"
              )}
            </div>
            <button
              onClick={triggerFileInput}
              disabled={isUploading}
              className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
              title="Change profile picture"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-[#4CAF50] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Camera className="h-4 w-4 text-gray-600" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Amina Ibrahim</h2>
            <p className="text-sm text-gray-600">admin@nnpc.com</p>
            <p className="text-xs text-gray-500 mt-1">
              Administrator • NNPC Limited
            </p>
            <button
              onClick={triggerFileInput}
              disabled={isUploading}
              className="text-xs text-[#4CAF50] hover:text-[#45a049] mt-2 font-medium flex items-center gap-1 disabled:opacity-50"
            >
              <Upload className="h-3 w-3" />
              {isUploading ? "Uploading..." : "Upload new picture"}
            </button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Personal Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Amina" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Ibrahim" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="admin@nnpc.com"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Contact admin to change email
                </p>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue="ESG & Sustainability" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="NNPC Towers, Abuja" />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#4CAF50] hover:bg-[#45a049]"
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4 max-w-md">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 text-sm mb-2">
                  Password Requirements:
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains at least one number</li>
                  <li>• Contains at least one special character</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button className="bg-[#4CAF50] hover:bg-[#45a049]">
                <Lock className="h-4 w-4 mr-2" />
                Update Password
              </Button>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Email Notifications
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="workflow" defaultChecked />
                    <Label htmlFor="workflow" className="font-normal">
                      Workflow approvals and task assignments
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="submissions" defaultChecked />
                    <Label htmlFor="submissions" className="font-normal">
                      New data submissions requiring review
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="escalations" defaultChecked />
                    <Label htmlFor="escalations" className="font-normal">
                      Escalated items and overdue approvals
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="reports" />
                    <Label htmlFor="reports" className="font-normal">
                      Report generation completion
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  System Notifications
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="proxy" defaultChecked />
                    <Label htmlFor="proxy" className="font-normal">
                      Proxy data alerts and escalations
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="integration" defaultChecked />
                    <Label htmlFor="integration" className="font-normal">
                      Integration sync status and errors
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="audit" />
                    <Label htmlFor="audit" className="font-normal">
                      Security and audit trail alerts
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Frequency
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="daily" defaultChecked />
                    <Label htmlFor="daily" className="font-normal">
                      Daily digest (summary of pending items)
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="weekly" />
                    <Label htmlFor="weekly" className="font-normal">
                      Weekly summary report
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button className="bg-[#4CAF50] hover:bg-[#45a049]">
                <Bell className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </div>
  );
}
