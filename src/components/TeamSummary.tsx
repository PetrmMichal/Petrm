
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { EditableField } from "./EditableField";

interface TeamSummaryProps {
  selectedDate: Date;
  teamTotal: number;
  teamGoal: number;
  setTeamGoal: (goal: number) => void;
  editingField: string | null;
  setEditingField: (key: string | null) => void;
}

export const TeamSummary = ({
  selectedDate,
  teamTotal,
  teamGoal,
  setTeamGoal,
  editingField,
  setEditingField
}: TeamSummaryProps) => {
  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Výkonnost týmu {isToday ? "dnes" : format(selectedDate, 'd. M.', { locale: cs })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-blue-100">Celkem</p>
            <p className="text-2xl font-bold">{teamTotal.toLocaleString()} Kč</p>
          </div>
          <div>
            <p className="text-blue-100">Cíl týmu</p>
            <div className="flex items-center gap-2">
              <EditableField
                value={teamGoal}
                onSave={(value) => setTeamGoal(Number(value))}
                fieldKey="team-goal"
                type="number"
                className="text-2xl font-bold text-white hover:bg-blue-800"
                editingField={editingField}
                setEditingField={setEditingField}
              />
            </div>
          </div>
          <div>
            <p className="text-blue-100">Plnění</p>
            <p className="text-2xl font-bold">{((teamTotal / teamGoal) * 100).toFixed(1)}%</p>
          </div>
        </div>
        <Progress value={(teamTotal / teamGoal) * 100} className="mt-4 bg-blue-800" />
      </CardContent>
    </Card>
  );
};
