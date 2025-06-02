
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import { CommissionEntry, GoalStatus } from "@/types/commission";
import { EditableField } from "./EditableField";

interface CommissionTableRowProps {
  entry: CommissionEntry;
  updateEntry: (id: string, field: keyof CommissionEntry, value: string | number) => void;
  editingField: string | null;
  setEditingField: (key: string | null) => void;
}

export const CommissionTableRow = ({
  entry,
  updateEntry,
  editingField,
  setEditingField
}: CommissionTableRowProps) => {
  const getTotalCommission = (entry: CommissionEntry) => {
    return entry.postpaid + entry.indTv + entry.zbytek;
  };

  const getProgressPercentage = (entry: CommissionEntry) => {
    const total = getTotalCommission(entry);
    return Math.min((total / entry.dailyGoal) * 100, 100);
  };

  const getGoalStatus = (entry: CommissionEntry): GoalStatus => {
    const total = getTotalCommission(entry);
    const percentage = (total / entry.dailyGoal) * 100;
    
    if (percentage >= 100) return { status: "exceeded", color: "bg-green-500", icon: TrendingUp };
    if (percentage >= 80) return { status: "on-track", color: "bg-blue-500", icon: Target };
    return { status: "behind", color: "bg-red-500", icon: TrendingDown };
  };

  const total = getTotalCommission(entry);
  const progress = getProgressPercentage(entry);
  const goalStatus = getGoalStatus(entry);
  const StatusIcon = goalStatus.icon;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="p-4">
        <EditableField
          value={entry.name}
          onSave={(value) => updateEntry(entry.id, "name", value)}
          fieldKey={`${entry.id}-name`}
          className="font-medium text-gray-900"
          editingField={editingField}
          setEditingField={setEditingField}
        />
      </td>
      
      <td className="p-4 text-center">
        <EditableField
          value={entry.postpaid}
          onSave={(value) => updateEntry(entry.id, "postpaid", value)}
          fieldKey={`${entry.id}-postpaid`}
          type="number"
          className="text-green-600 font-medium"
          editingField={editingField}
          setEditingField={setEditingField}
        />
      </td>

      <td className="p-4 text-center">
        <EditableField
          value={entry.indTv}
          onSave={(value) => updateEntry(entry.id, "indTv", value)}
          fieldKey={`${entry.id}-indTv`}
          type="number"
          className="text-blue-600 font-medium"
          editingField={editingField}
          setEditingField={setEditingField}
        />
      </td>

      <td className="p-4 text-center">
        <EditableField
          value={entry.zbytek}
          onSave={(value) => updateEntry(entry.id, "zbytek", value)}
          fieldKey={`${entry.id}-zbytek`}
          type="number"
          className="text-purple-600 font-medium"
          editingField={editingField}
          setEditingField={setEditingField}
        />
      </td>

      <td className="p-4 text-center">
        <span className="font-bold text-gray-900">{total.toLocaleString()} Kč</span>
      </td>

      <td className="p-4 text-center">
        <EditableField
          value={entry.dailyGoal}
          onSave={(value) => updateEntry(entry.id, "dailyGoal", value)}
          fieldKey={`${entry.id}-dailyGoal`}
          type="number"
          className="text-gray-600"
          editingField={editingField}
          setEditingField={setEditingField}
        />
      </td>

      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Progress value={progress} className="h-2" />
          </div>
          <Badge variant="secondary" className={`${goalStatus.color} text-white flex items-center gap-1`}>
            <StatusIcon className="h-3 w-3" />
            {progress.toFixed(0)}%
          </Badge>
        </div>
      </td>

      <td className="p-4 text-center">
        <span className="text-sm text-gray-500">{entry.lastUpdated}</span>
      </td>
    </tr>
  );
};
