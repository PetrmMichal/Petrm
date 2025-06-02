
export interface CommissionEntry {
  id: string;
  name: string;
  postpaid: number;
  indTv: number;
  zbytek: number;
  dailyGoal: number;
  lastUpdated: string;
}

export interface DailyData {
  date: string;
  entries: CommissionEntry[];
  teamGoal: number;
}

export interface GoalStatus {
  status: "exceeded" | "on-track" | "behind";
  color: string;
  icon: any;
}
