
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dropzone } from '@/components/ui/dropzone';
import { CheckCircle, RefreshCw, XCircle, AlertTriangle, Upload, Info, PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function MyData() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  
  // Mock data for OAuth connections
  const [connections, setConnections] = useState([
    {
      id: "1",
      platform: "Google",
      accountName: "Main Google Ads Account",
      accountId: "123-456-7890",
      lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      status: "active",
      error: null
    },
    {
      id: "2",
      platform: "Meta",
      accountName: "Facebook Business Manager",
      accountId: "987654321",
      lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      status: "active",
      error: null
    },
    {
      id: "3",
      platform: "LinkedIn",
      accountName: "LinkedIn Campaign Manager",
      accountId: "li-12345",
      lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      status: "error",
      error: "Token expired. Please reconnect."
    },
    {
      id: "4",
      platform: "TikTok",
      accountName: "TikTok Ads Manager",
      accountId: "tt-67890",
      lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 18), // 18 hours ago
      status: "active",
      error: null
    },
  ]);
  
  // Mock data for manual uploads
  const [uploads, setUploads] = useState([
    {
      id: "1",
      filename: "google_campaigns_apr.csv",
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      platform: "Google",
      rowCount: 156,
      mappingQuality: "high"
    },
    {
      id: "2",
      filename: "facebook_adsets_q1.csv",
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
      platform: "Meta",
      rowCount: 87,
      mappingQuality: "medium"
    }
  ]);
  
  const [file, setFile] = useState<File | null>(null);
  const [uploadPlatform, setUploadPlatform] = useState("");
  
  useEffect(() => {
    // Simulating API loading
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);
  
  const handleRefreshConnection = (id: string) => {
    const updatedConnections = connections.map(conn => {
      if (conn.id === id) {
        return {
          ...conn,
          lastSynced: new Date(),
          status: "active",
          error: null
        };
      }
      return conn;
    });
    
    setConnections(updatedConnections);
    
    toast({
      title: "Sync initiated",
      description: "Your account data is being synced.",
    });
  };
  
  const handleReconnect = (id: string) => {
    toast({
      title: "Reconnect required",
      description: "Please complete the OAuth flow in the popup window.",
    });
  };
  
  const handleDisconnect = (id: string) => {
    const updatedConnections = connections.filter(conn => conn.id !== id);
    setConnections(updatedConnections);
    
    toast({
      title: "Account disconnected",
      description: "Your account has been disconnected.",
      variant: "destructive",
    });
  };
  
  const handleFileUpload = () => {
    if (!file || !uploadPlatform) {
      toast({
        title: "Missing information",
        description: "Please select a file and platform.",
        variant: "destructive",
      });
      return;
    }
    
    // Add the new upload to the list
    const newUpload = {
      id: Math.random().toString(36).substring(7),
      filename: file.name,
      uploadedAt: new Date(),
      platform: uploadPlatform,
      rowCount: Math.floor(Math.random() * 100) + 50,
      mappingQuality: Math.random() > 0.7 ? "high" : "medium"
    };
    
    setUploads([newUpload, ...uploads]);
    setFile(null);
    setUploadPlatform("");
    
    toast({
      title: "File uploaded",
      description: "Your CSV file has been processed.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">My Data</h1>
            <p className="text-muted-foreground">
              Manage your platform connections and data sources.
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Connect Platform
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect a new platform</DialogTitle>
                <DialogDescription>
                  Select a platform to connect via OAuth. You'll be redirected to authorize access to your advertising account.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/120px-Google_%22G%22_Logo.svg.png" 
                    alt="Google" className="w-8 h-8" />
                  Google Ads
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/120px-Facebook_Logo_%282019%29.png" 
                    alt="Meta" className="w-8 h-8" />
                  Meta Ads
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/120px-LinkedIn_logo_initials.png" 
                    alt="LinkedIn" className="w-8 h-8" />
                  LinkedIn Ads
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/120px-TikTok_logo.svg.png" 
                    alt="TikTok" className="w-8 h-8" />
                  TikTok Ads
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="connected">
          <TabsList>
            <TabsTrigger value="connected">Connected Platforms</TabsTrigger>
            <TabsTrigger value="uploaded">Uploaded Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connected" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="bg-gray-100 h-20"></CardHeader>
                    <CardContent className="py-6">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 h-16"></CardFooter>
                  </Card>
                ))
              ) : (
                connections.map(connection => (
                  <Card key={connection.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline">{connection.platform} Ads</Badge>
                        <Badge 
                          variant={connection.status === "active" ? "default" : "destructive"}
                          className="capitalize"
                        >
                          {connection.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{connection.accountName}</CardTitle>
                      <CardDescription>ID: {connection.accountId}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-muted-foreground">Last synced:</span>
                        <span>{format(connection.lastSynced, "MMM d, yyyy h:mm a")}</span>
                      </div>
                      
                      {connection.error && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>{connection.error}</AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                      {connection.status === "active" ? (
                        <Button variant="outline" size="sm" onClick={() => handleRefreshConnection(connection.id)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sync Now
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => handleReconnect(connection.id)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Reconnect
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive/90" 
                        onClick={() => handleDisconnect(connection.id)}
                      >
                        Disconnect
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
            
            {!loading && connections.length === 0 && (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">No platforms connected yet.</p>
                  <Button>Connect Your First Platform</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="uploaded" className="mt-4">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Performance Data</CardTitle>
                  <CardDescription>
                    Upload CSV files with campaign performance data for platforms you can't connect via OAuth.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="platform">Select Platform</Label>
                      <select 
                        id="platform"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={uploadPlatform}
                        onChange={(e) => setUploadPlatform(e.target.value)}
                      >
                        <option value="">Select a platform</option>
                        <option value="Google">Google Ads</option>
                        <option value="Meta">Meta Ads</option>
                        <option value="LinkedIn">LinkedIn Ads</option>
                        <option value="TikTok">TikTok Ads</option>
                        <option value="Twitter">Twitter Ads</option>
                        <option value="Snapchat">Snapchat Ads</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Upload CSV File</Label>
                      <Dropzone 
                        value={file ? [file] : []}
                        onAddFiles={(files) => setFile(files[0])}
                        onRemoveFile={() => setFile(null)}
                        accept={{ 'text/csv': ['.csv'] }}
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      disabled={!file || !uploadPlatform}
                      onClick={handleFileUpload}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload File
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Previous Uploads</h3>
                
                {uploads.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">No files uploaded yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {uploads.map(upload => (
                      <Card key={upload.id}>
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <Upload className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">{upload.filename}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {upload.platform} • {format(upload.uploadedAt, "MMM d, yyyy")} • {upload.rowCount} rows
                                </p>
                              </div>
                            </div>
                            <Badge variant={upload.mappingQuality === "high" ? "default" : "secondary"}>
                              {upload.mappingQuality === "high" ? (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              ) : (
                                <Info className="mr-1 h-3 w-3" />
                              )}
                              {upload.mappingQuality === "high" ? "High quality mapping" : "Medium quality mapping"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>CSV Requirements</AlertTitle>
                <AlertDescription>
                  For best results, include these columns: Campaign Name, Date, Spend, Conversions, Clicks, Impressions, and Channel.
                  <a href="#" className="block text-primary hover:underline mt-1">
                    Download template
                  </a>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
