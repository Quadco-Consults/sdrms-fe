"use client";

import { useState } from "react";
import { User, Mail, Lock, Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 1500);
  };

  return (
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
          <div className="h-20 w-20 rounded-full bg-[#4CAF50] flex items-center justify-center text-white text-2xl font-bold">
            AI
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Amina Ibrahim</h2>
            <p className="text-sm text-gray-600">admin@nnpc.com</p>
            <p className="text-xs text-gray-500 mt-1">
              Administrator • NNPC Limited
            </p>
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
  );
}
