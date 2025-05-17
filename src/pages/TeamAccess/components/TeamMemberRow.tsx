
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Shield, 
  EyeIcon, 
  Pencil,
  Clock,
  Trash
} from "lucide-react";
import { TeamMember } from '../types/teamTypes';

interface TeamMemberRowProps {
  member: TeamMember;
  onRemove: () => void;
  onChangeRole: (role: string) => void;
  isCurrentUser: boolean;
}

const TeamMemberRow = ({ 
  member, 
  onRemove, 
  onChangeRole, 
  isCurrentUser 
}: TeamMemberRowProps) => {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium flex items-center">
            {member.name} 
            {isCurrentUser && <span className="text-xs text-muted-foreground ml-2">(You)</span>}
          </div>
          <div className="text-sm text-muted-foreground">{member.email}</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {member.status === "pending" ? (
          <CustomBadge variant="outline" className="flex items-center gap-1 text-amber-500 border-amber-200 bg-amber-50">
            <Clock size={12} />
            Pending
          </CustomBadge>
        ) : (
          <CustomBadge 
            variant={member.role === "admin" ? "secondary" : "success"} 
            className="flex items-center gap-1"
          >
            {member.role === "admin" ? (
              <Shield size={12} />
            ) : member.role === "editor" ? (
              <Pencil size={12} />
            ) : (
              <EyeIcon size={12} />
            )}
            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
          </CustomBadge>
        )}
        
        {!isCurrentUser && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="sr-only">Change role</span>
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change user role</DialogTitle>
                  <DialogDescription>
                    Select a new role for {member.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      variant={member.role === "admin" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => onChangeRole("admin")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin
                      <span className="ml-auto text-xs text-muted-foreground">Full access</span>
                    </Button>
                    <Button 
                      variant={member.role === "editor" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => onChangeRole("editor")}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Editor
                      <span className="ml-auto text-xs text-muted-foreground">Can edit data</span>
                    </Button>
                    <Button 
                      variant={member.role === "viewer" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => onChangeRole("viewer")}
                    >
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Viewer
                      <span className="ml-auto text-xs text-muted-foreground">Read-only</span>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                  <span className="sr-only">Remove user</span>
                  <Trash className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Remove team member</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to remove {member.name} from your team?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive" onClick={onRemove}>Remove</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamMemberRow;
