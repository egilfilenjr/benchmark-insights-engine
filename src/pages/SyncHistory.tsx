
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const syncHistory = [
  {
    id: "1",
    platform: "Google Ads",
    status: "completed",
    startTime: "2024-01-15T10:30:00Z",
    endTime: "2024-01-15T10:32:15Z",
    recordsProcessed: 1247,
    type: "scheduled"
  },
  {
    id: "2", 
    platform: "Meta Ads",
    status: "completed",
    startTime: "2024-01-15T10:25:00Z", 
    endTime: "2024-01-15T10:27:30Z",
    recordsProcessed: 892,
    type: "manual"
  },
  {
    id: "3",
    platform: "TikTok Ads", 
    status: "failed",
    startTime: "2024-01-15T09:15:00Z",
    endTime: "2024-01-15T09:16:45Z",
    recordsProcessed: 0,
    error: "API rate limit exceeded",
    type: "scheduled"
  },
  {
    id: "4",
    platform: "LinkedIn Ads",
    status: "running",
    startTime: "2024-01-15T10:35:00Z",
    recordsProcessed: 345,
    type: "manual"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "failed": return <XCircle className="w-4 h-4 text-red-500" />;
    case "running": return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
    default: return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  const variants = {
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800", 
    running: "bg-blue-100 text-blue-800"
  };
  return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
};

export default function SyncHistory() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sync History</h1>
            <p className="text-muted-foreground">
              Monitor your data synchronization status and history
            </p>
          </div>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Syncs Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">2.5k</div>
              <div className="text-sm text-muted-foreground">Records Synced</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-muted-foreground">Active Connections</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sync Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {syncHistory.map((sync) => (
                <div key={sync.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(sync.status)}
                    <div>
                      <div className="font-medium">{sync.platform}</div>
                      <div className="text-sm text-muted-foreground">
                        Started {formatDistanceToNow(new Date(sync.startTime), { addSuffix: true })}
                      </div>
                      {sync.error && (
                        <div className="text-sm text-red-600 mt-1">{sync.error}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-right">
                      <div className="font-medium">{sync.recordsProcessed.toLocaleString()} records</div>
                      <div className="text-muted-foreground">
                        {sync.endTime && `Completed in ${Math.round((new Date(sync.endTime).getTime() - new Date(sync.startTime).getTime()) / 1000)}s`}
                      </div>
                    </div>
                    <Badge className={getStatusBadge(sync.status)} variant="outline">
                      {sync.status}
                    </Badge>
                    <Badge variant="secondary">
                      {sync.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
