
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dropzone } from "@/components/ui/dropzone";
import {
  CheckCircle,
  RefreshCw,
  XCircle,
  AlertTriangle,
  Upload,
  Info,
  PlusCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

type OAuthConnection = {
  id: string;
  platform: string;
  accountName: string;
  accountId: string;
  lastSynced: Date;
  status: "active" | "error" | "pending";
  error: string | null;
};

export default function MyData() {
  const userProfile = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<OAuthConnection[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  
  const handleAddFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleRemoveFile = (file: File) => {
    setFiles(prev => prev.filter(f => f !== file));
  };

  useEffect(() => {
    setLoading(true);

    // TODO: Replace with Supabase fetch
    const mockConnections: OAuthConnection[] = [
      {
        id: "1",
        platform: "Google",
        accountName: "Main Google Ads Account",
        accountId: "123-456-7890",
        lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        status: "active",
        error: null,
      },
      {
        id: "2",
        platform: "Meta",
        accountName: "Meta Ads Manager",
        accountId: "meta-789",
        lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 24),
        status: "error",
        error: "OAuth token expired",
      },
    ];

    setConnections(mockConnections);
    setLoading(false);
  }, [userProfile]);

  const getStatusBadge = (status: OAuthConnection["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline">Connected</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "pending":
      default:
        return <Badge variant="default">Pending</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">My Data</h1>
            <p className="text-muted-foreground">Manage your integrations and data syncs</p>
          </div>
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>

        <Tabs defaultValue="connections">
          <TabsList>
            <TabsTrigger value="connections">OAuth Connections</TabsTrigger>
            <TabsTrigger value="uploads">Manual Uploads</TabsTrigger>
          </TabsList>

          <TabsContent value="connections">
            <div className="grid gap-4 md:grid-cols-2">
              {connections.map((conn) => (
                <Card key={conn.id}>
                  <CardHeader>
                    <CardTitle>{conn.platform}</CardTitle>
                    <CardDescription>{conn.accountName}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <Label>Account ID:</Label>
                      <Input value={conn.accountId} readOnly />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Synced: {formatDistanceToNow(conn.lastSynced)} ago</span>
                      {getStatusBadge(conn.status)}
                    </div>
                    {conn.error && (
                      <Alert variant="destructive">
                        <AlertTriangle className="w-4 h-4" />
                        <AlertTitle>Sync Error</AlertTitle>
                        <AlertDescription>{conn.error}</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reconnect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="uploads">
            <Card>
              <CardHeader>
                <CardTitle>Manual Data Upload</CardTitle>
                <CardDescription>Use this to upload campaign CSVs.</CardDescription>
              </CardHeader>
              <CardContent>
                <Dropzone
                  value={files}
                  onAddFiles={handleAddFiles}
                  onRemoveFile={handleRemoveFile}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
