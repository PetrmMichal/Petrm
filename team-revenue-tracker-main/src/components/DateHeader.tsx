
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, LogOut, Calendar as CalendarViewIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { LiveClock } from "./LiveClock";

interface DateHeaderProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (open: boolean) => void;
  onSave: () => void;
  currentUser?: string;
  onLogout?: () => void;
  onOpenCalendarView: () => void;
  onDownloadPDF: () => void;
}

export const DateHeader = ({
  selectedDate,
  setSelectedDate,
  isCalendarOpen,
  setIsCalendarOpen,
  onSave,
  currentUser,
  onLogout,
  onOpenCalendarView,
  onDownloadPDF
}: DateHeaderProps) => {
  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              {isToday ? "Dnes" : "Data za den"}: {format(selectedDate, 'EEEE, d. MMMM yyyy', { locale: cs })}
            </CardTitle>
            {currentUser && (
              <p className="text-sm text-gray-600 mt-1">
                Přihlášen jako: <span className="font-medium text-blue-600">{currentUser}</span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <LiveClock />
            <div className="flex items-center gap-2">
              <Button onClick={onSave} variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Uložit
              </Button>
              <Button onClick={onOpenCalendarView} variant="outline" size="sm">
                <CalendarViewIcon className="h-4 w-4 mr-2" />
                Kalendář
              </Button>
              <Button onClick={onDownloadPDF} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Stáhnout
              </Button>
              {onLogout && (
                <Button onClick={onLogout} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Odhlásit
                </Button>
              )}
            </div>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, 'PPP', { locale: cs })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setIsCalendarOpen(false);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
