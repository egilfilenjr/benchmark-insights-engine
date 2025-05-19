
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import TeamMemberRow from './TeamMemberRow';
import { TeamMember } from '../types/teamTypes';

export interface TeamMembersTableProps {
  teamMembers: TeamMember[];
  onRemove: (id: string) => void;
  onChangeRole: (userId: string, role: string) => void;
  currentUserName?: string;
  loading?: boolean;
}

const TeamMembersTable = ({ 
  teamMembers, 
  onRemove, 
  onChangeRole, 
  currentUserName,
  loading = false
}: TeamMembersTableProps) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map(i => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell><div className="h-4 bg-gray-200 rounded w-24"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded w-40"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded w-16"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded w-16"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded w-24"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers
              .filter(member => member.status !== "removed")
              .map(member => (
                <TeamMemberRow 
                  key={member.id} 
                  member={member} 
                  onRemove={() => onRemove(member.id)} 
                  onChangeRole={(role: string) => onChangeRole(member.id, role)}
                  isCurrentUser={currentUserName === member.name}
                />
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TeamMembersTable;
