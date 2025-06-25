'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Search, Users as UsersIcon, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllUsers } from '@/app/actions/admin';
import type { User, UserRole } from '@/lib/auth-constants';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

function TableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div>
                                        <Skeleton className="h-4 w-24 mb-1" />
                                        <Skeleton className="h-3 w-32" />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded-md" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default function AdminUsersPage() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');

  const fetchUsers = async () => {
    setIsLoading(true);
    const users = await getAllUsers();
    setAllUsers(users);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => {
      const name = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
      const email = user.email?.toLowerCase() || '';
      const term = searchTerm.toLowerCase();

      const searchMatch = name.includes(term) || email.includes(term);
      const roleMatch = roleFilter === 'all' || user.role === roleFilter;
      
      return searchMatch && roleMatch;
    });
  }, [allUsers, searchTerm, roleFilter]);

  if (isLoading) {
      return (
          <Card>
              <CardHeader><CardTitle>Loading Users...</CardTitle></CardHeader>
              <CardContent><TableSkeleton /></CardContent>
          </Card>
      );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" /> User Management
                </CardTitle>
                <CardDescription>
                View, manage, and filter all users on the platform.
                </CardDescription>
            </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search by name or email..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as UserRole | 'all')}>
                <SelectTrigger><SelectValue placeholder="Filter by role..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="schoolrep">School Rep</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Onboarding</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Image
                            src={user.profilePictureUrl || `https://placehold.co/40x40.png`}
                            alt="User avatar"
                            width={40}
                            height={40}
                            className="rounded-full aspect-square object-cover"
                            data-ai-hint="profile avatar"
                        />
                        <div>
                            <div className="font-medium">{`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                      </Badge>
                  </TableCell>
                  <TableCell>
                    {user.role === 'admin' ? (
                        <span className="text-sm text-muted-foreground">N/A</span>
                    ) : (
                        <Badge variant={user.onboardingComplete ? 'default' : 'outline'} className={user.onboardingComplete ? 'bg-success text-success-foreground' : ''}>
                            <div className="flex items-center gap-1.5">
                                {user.onboardingComplete ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                {user.onboardingComplete ? "Completed" : "Pending"}
                            </div>
                        </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.createdAt ? format(new Date(user.createdAt), 'PPP') : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuItem disabled>
                                  Edit User (coming soon)
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled className="text-destructive focus:text-destructive">
                                  Delete User (coming soon)
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No users match your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
