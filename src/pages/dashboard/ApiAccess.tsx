import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchTable from "@/components/common/SearchTable";
import { useApiKeys, useGenerateApiKey, useRevokeApiKey } from "@/hooks/api/useApiAccess";
import { ApiKey, ApiKeyCreateRequest } from "@/types/apiAccess";
import { Key, Copy, Trash2, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const ApiAccess = () => {
  const { data: apiKeys } = useApiKeys();
  const generateMutation = useGenerateApiKey();
  const revokeMutation = useRevokeApiKey();
  const { toast } = useToast();
  
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['read:verifications']);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const scopes = [
    { id: 'read:verifications', label: 'Read Verifications', description: 'View verification data' },
    { id: 'write:verifications', label: 'Write Verifications', description: 'Create and update verifications' },
    { id: 'read:users', label: 'Read Users', description: 'View user data' },
    { id: 'write:users', label: 'Write Users', description: 'Create and update users' },
    { id: 'admin:all', label: 'Full Admin Access', description: 'Complete system access' },
  ];

  const handleGenerateKey = () => {
    const request: ApiKeyCreateRequest = {
      name: newKeyName,
      scopes: selectedScopes,
    };

    generateMutation.mutate(request, {
      onSuccess: (data) => {
        setGeneratedKey(data.key);
        setNewKeyName("");
        setSelectedScopes(['read:verifications']);
      }
    });
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    });
  };

  const handleRevoke = (keyId: string) => {
    if (confirm("Are you sure you want to revoke this API key? This action cannot be undone.")) {
      revokeMutation.mutate(keyId);
    }
  };

  const columns: Array<{
    key: keyof ApiKey;
    label: string;
    render?: (value: any, apiKey: ApiKey) => React.ReactNode;
  }> = [
    { 
      key: 'name', 
      label: 'Name',
      render: (value: any, apiKey: ApiKey) => (
        <div>
          <p className="font-medium">{apiKey.name}</p>
          <p className="text-sm text-muted-foreground font-mono">
            {apiKey.keyPreview}
          </p>
        </div>
      )
    },
    { 
      key: 'scopes', 
      label: 'Scopes',
      render: (value: any, apiKey: ApiKey) => (
        <div className="flex flex-wrap gap-1">
          {apiKey.scopes.slice(0, 2).map((scope) => (
            <Badge key={scope} variant="outline" className="text-xs">
              {scope}
            </Badge>
          ))}
          {apiKey.scopes.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{apiKey.scopes.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: any, apiKey: ApiKey) => (
        <Badge variant={apiKey.status === 'active' ? 'default' : 'destructive'}>
          {apiKey.status}
        </Badge>
      )
    },
    { 
      key: 'lastUsed', 
      label: 'Last Used',
      render: (value: any, apiKey: ApiKey) => (
        <span className="text-sm">
          {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : 'Never'}
        </span>
      )
    },
    { 
      key: 'requestCount', 
      label: 'Requests',
      render: (value: any, apiKey: ApiKey) => (
        <span className="text-sm font-medium">{apiKey.requestCount.toLocaleString()}</span>
      )
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value: any, apiKey: ApiKey) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleCopyKey(apiKey.keyPreview);
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleRevoke(apiKey.id);
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Access</h1>
          <p className="text-muted-foreground">Manage API keys and access credentials</p>
        </div>
        <Button onClick={() => setShowGenerateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Generate API Key
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {apiKeys?.filter(k => k.status === 'active').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {apiKeys?.reduce((acc, k) => acc + k.requestCount, 0).toLocaleString() || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate Limit</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1000/hr</div>
            <p className="text-xs text-muted-foreground">Per key</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Your active and revoked API keys</CardDescription>
        </CardHeader>
        <CardContent>
          <SearchTable
            data={apiKeys || []}
            columns={columns}
            pageSize={10}
          />
        </CardContent>
      </Card>

      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate API Key</DialogTitle>
            <DialogDescription>
              Create a new API key with specific permissions
            </DialogDescription>
          </DialogHeader>

          {generatedKey ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900 dark:text-green-100">
                      API Key Generated Successfully
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Make sure to copy your API key now. You won't be able to see it again!
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Your API Key</Label>
                <div className="flex gap-2">
                  <Input
                    value={generatedKey}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button onClick={() => handleCopyKey(generatedKey)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Key Name</Label>
                <Input
                  placeholder="e.g., Production API Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="space-y-3">
                  {scopes.map((scope) => (
                    <div key={scope.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={scope.id}
                        checked={selectedScopes.includes(scope.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedScopes([...selectedScopes, scope.id]);
                          } else {
                            setSelectedScopes(selectedScopes.filter(s => s !== scope.id));
                          }
                        }}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={scope.id}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {scope.label}
                        </label>
                        <p className="text-sm text-muted-foreground">{scope.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {generatedKey ? (
              <Button onClick={() => {
                setGeneratedKey(null);
                setShowGenerateDialog(false);
              }}>
                Done
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowGenerateDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleGenerateKey}
                  disabled={!newKeyName || selectedScopes.length === 0}
                >
                  Generate Key
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiAccess;