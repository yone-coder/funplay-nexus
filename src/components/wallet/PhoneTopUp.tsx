import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const PhoneTopUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [country, setCountry] = useState("");
  const { toast } = useToast();

  const handleTopUp = () => {
    toast({
      title: "Top-Up Initiated",
      description: `Processing top-up of ${amount} for ${phoneNumber}`,
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Phone Top-Up</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="gb">United Kingdom</SelectItem>
              <SelectItem value="fr">France</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <Input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Amount</label>
          <Select value={amount} onValueChange={setAmount}>
            <SelectTrigger>
              <SelectValue placeholder="Select amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">$5</SelectItem>
              <SelectItem value="10">$10</SelectItem>
              <SelectItem value="20">$20</SelectItem>
              <SelectItem value="50">$50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full bg-gaming-500 hover:bg-gaming-600"
          onClick={handleTopUp}
        >
          Top-Up Now
        </Button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Top-up will be processed immediately after payment confirmation
        </p>
      </div>
    </Card>
  );
};