
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { CommissionEntry, DailyData } from "@/types/commission";
import { DateHeader } from "./DateHeader";
import { TeamSummary } from "./TeamSummary";
import { CommissionTableRow } from "./CommissionTableRow";
import { LoginForm } from "./LoginForm";
import { CalendarView } from "./CalendarView";
import { downloadDailyRecordAsPDF } from "@/utils/pdfExport";

const initialData: CommissionEntry[] = [
  { id: "1", name: "Petr Michal", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "10:30" },
  { id: "2", name: "Aleš Mörtl", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "11:15" },
  { id: "3", name: "Daniel Rusín", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "9:45" },
  { id: "4", name: "Michael Arnošt Beneš", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "10:00" },
  { id: "5", name: "Jakub Škarda", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "11:30" },
  { id: "6", name: "Terezie Beránková", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "10:45" },
  { id: "7", name: "Vítek Hakr", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "9:30" },
  { id: "8", name: "Josef Studený", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "11:00" },
  { id: "9", name: "Barbora Grillová", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "10:15" },
  { id: "10", name: "Eliška Hanáková", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "11:45" },
  { id: "11", name: "No Name", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "9:50" },
  { id: "12", name: "No Name", postpaid: 0, indTv: 0, zbytek: 0, dailyGoal: 1000, lastUpdated: "10:20" },
];

export const CommissionTable = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState<CommissionEntry[]>(initialData);
  const [teamGoal, setTeamGoal] = useState<number>(10500);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [historicalData, setHistoricalData] = useState<DailyData[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCalendarViewOpen, setIsCalendarViewOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const availableUsers = initialData.map(entry => entry.name).filter(name => name !== "No Name");

  // Sort entries to put current user first
  const sortedEntries = currentUser 
    ? [
        ...entries.filter(entry => entry.name === currentUser),
        ...entries.filter(entry => entry.name !== currentUser)
      ]
    : entries;

  // Load data for selected date
  useEffect(() => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const savedData = historicalData.find(d => d.date === dateKey);
    
    if (savedData) {
      setEntries(savedData.entries);
      setTeamGoal(savedData.teamGoal);
    } else {
      setEntries(initialData);
      setTeamGoal(10500);
    }
  }, [selectedDate, historicalData]);

  // Auto-save functionality
  useEffect(() => {
    if (!currentUser) return;
    
    const saveInterval = setInterval(() => {
      saveCurrentData();
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [entries, teamGoal, selectedDate, currentUser]);

  const saveCurrentData = () => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const newData: DailyData = {
      date: dateKey,
      entries: [...entries],
      teamGoal
    };

    setHistoricalData(prev => {
      const filtered = prev.filter(d => d.date !== dateKey);
      return [...filtered, newData];
    });

    console.log(`Data autosaved for ${dateKey}`);
  };

  const updateEntry = (id: string, field: keyof CommissionEntry, value: string | number) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id 
        ? { ...entry, [field]: value, lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        : entry
    ));
    console.log(`Updated: ${field} for user ${id}`);
  };

  const getTotalCommission = (entry: CommissionEntry) => {
    return entry.postpaid + entry.indTv + entry.zbytek;
  };

  const teamTotal = entries.reduce((sum, entry) => sum + getTotalCommission(entry), 0);

  const handleLogin = (userName: string) => {
    setCurrentUser(userName);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleOpenCalendarView = () => {
    setIsCalendarViewOpen(true);
  };

  const handleDownloadPDF = () => {
    downloadDailyRecordAsPDF(selectedDate, entries, teamGoal, teamTotal);
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} availableUsers={availableUsers} />;
  }

  return (
    <div className="space-y-6">
      <DateHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        onSave={saveCurrentData}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenCalendarView={handleOpenCalendarView}
        onDownloadPDF={handleDownloadPDF}
      />

      {isCalendarViewOpen && (
        <CalendarView
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          historicalData={historicalData}
          onClose={() => setIsCalendarViewOpen(false)}
        />
      )}

      <TeamSummary
        selectedDate={selectedDate}
        teamTotal={teamTotal}
        teamGoal={teamGoal}
        setTeamGoal={setTeamGoal}
        editingField={editingField}
        setEditingField={setEditingField}
      />

      <Card>
        <CardHeader>
          <CardTitle>Sledování denních provizí</CardTitle>
          <p className="text-sm text-gray-600">Klikněte na libovolné pole pro úpravu hodnot</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold">Jméno</th>
                  <th className="text-center p-4 font-semibold">Postpaid</th>
                  <th className="text-center p-4 font-semibold">IND + TV</th>
                  <th className="text-center p-4 font-semibold">Zbytek</th>
                  <th className="text-center p-4 font-semibold">Celkem</th>
                  <th className="text-center p-4 font-semibold">Cíl</th>
                  <th className="text-center p-4 font-semibold">Plnění</th>
                  <th className="text-center p-4 font-semibold">Aktualizace</th>
                </tr>
              </thead>
              <tbody>
                {sortedEntries.map((entry) => (
                  <CommissionTableRow
                    key={entry.id}
                    entry={entry}
                    updateEntry={updateEntry}
                    editingField={editingField}
                    setEditingField={setEditingField}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
