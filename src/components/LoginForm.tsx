
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

interface LoginFormProps {
  onLogin: (userName: string) => void;
  availableUsers: string[];
}

export const LoginForm = ({ onLogin, availableUsers }: LoginFormProps) => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser.trim()) {
      onLogin(selectedUser);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center">
            <User className="h-6 w-6" />
            Přihlášení do systému provizí
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-2">
                Vyberte své jméno:
              </label>
              <select
                id="user-select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Vyberte uživatele --</option>
                {availableUsers.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={!selectedUser}>
              Přihlásit se
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
