import { Shield, Smartphone, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const SecuritySettings = () => {
  const [twoFactor, setTwoFactor] = useState(false);
  const [biometric, setBiometric] = useState(false);
  const [whitelist, setWhitelist] = useState(false);
  const { toast } = useToast();

  const handleToggle = (setting: string, value: boolean) => {
    toast({
      title: "Security Setting Updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  return (
    <Card className="p-6 mt-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5" />
        Security Settings
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-gaming-400" />
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-400">Add an extra layer of security</p>
            </div>
          </div>
          <Switch
            checked={twoFactor}
            onCheckedChange={(checked) => {
              setTwoFactor(checked);
              handleToggle('2FA', checked);
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCheck className="h-5 w-5 text-gaming-400" />
            <div>
              <p className="font-medium">Withdrawal Whitelist</p>
              <p className="text-sm text-gray-400">Only send to trusted addresses</p>
            </div>
          </div>
          <Switch
            checked={whitelist}
            onCheckedChange={(checked) => {
              setWhitelist(checked);
              handleToggle('Whitelist', checked);
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-gaming-400" />
            <div>
              <p className="font-medium">Biometric Authentication</p>
              <p className="text-sm text-gray-400">Use fingerprint or face ID</p>
            </div>
          </div>
          <Switch
            checked={biometric}
            onCheckedChange={(checked) => {
              setBiometric(checked);
              handleToggle('Biometric', checked);
            }}
          />
        </div>
      </div>
    </Card>
  );
};