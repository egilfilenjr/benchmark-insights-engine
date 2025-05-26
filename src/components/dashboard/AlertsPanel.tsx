
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, BellRing, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Alert, AlertsPanelProps } from "./types";

export default function AlertsPanel({
  alerts,
  loading = false,
  onClearAll,
}: AlertsPanelProps) {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <BellRing className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Alerts & Insights</CardTitle>
          {alerts.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Loading alerts...
          </div>
        ) : alerts.length === 0 ? (
          <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            <BellRing className="h-10 w-10 mb-2 text-muted-foreground/50" />
            <p className="text-center">No alerts or insights to display</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "p-3 rounded-lg border flex items-start",
                  alert.type === "warning" && "border-red-200 bg-red-50",
                  alert.type === "success" && "border-green-200 bg-green-50",
                  alert.type === "info" && "border-blue-200 bg-blue-50"
                )}
              >
                <div className="mr-3 mt-0.5">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <div className="text-sm">{alert.message}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-muted-foreground">
                      {formatTime(alert.timestamp)}
                    </div>
                    {alert.actionLabel && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={alert.onAction}
                        className="text-xs h-7 px-2"
                      >
                        {alert.actionLabel}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
