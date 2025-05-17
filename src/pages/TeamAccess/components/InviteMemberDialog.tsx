
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { Invitation } from '../types/teamTypes';

interface InviteMemberDialogProps {
  invitation: Invitation;
  onInvitationChange: (field: keyof Invitation, value: string) => void;
  onInviteMember: () => void;
}

const InviteMemberDialog = ({ 
  invitation, 
  onInvitationChange, 
  onInviteMember 
}: InviteMemberDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to a new team member. They'll receive an email with a link to join.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email"
              value={invitation.email}
              onChange={(e) => onInvitationChange('email', e.target.value)}
              placeholder="colleague@example.com"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={invitation.role}
              onValueChange={(value) => onInvitationChange('role', value)}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin (Full access)</SelectItem>
                <SelectItem value="editor">Editor (Can edit, but not manage team)</SelectItem>
                <SelectItem value="viewer">Viewer (View only)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {invitation.role === "admin" 
                ? "Admins can manage team members and have full access to all features." 
                : invitation.role === "editor" 
                  ? "Editors can create and modify content, but cannot manage team access." 
                  : "Viewers can only view dashboards and reports, but cannot make changes."}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => {}}>Cancel</Button>
          <Button onClick={onInviteMember}>Send Invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;
