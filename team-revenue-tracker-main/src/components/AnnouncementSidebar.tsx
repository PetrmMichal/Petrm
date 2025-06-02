import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Megaphone, Calendar, TrendingUp, Star, AlertCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "general" | "achievement" | "reminder" | "urgent";
  author: string;
  timestamp: string;
}

interface AnnouncementSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Aktualizace Q4 cílů",
    content: "Týmové cíle byly upraveny na základě výkonnosti trhu. Kategorie vývoj má nyní 15% bonus multiplikátor pro zbytek čtvrtletí.",
    type: "general",
    author: "Sarah Manager",
    timestamp: "před 2 hodinami"
  },
  {
    id: "2",
    title: "🎉 Alex Chen - Nejlepší výkon!",
    content: "Gratulujeme Alexovi za překročení denních cílů 5 dní v řadě! Pokračuj v skvělé práci.",
    type: "achievement",
    author: "Team Lead",
    timestamp: "před 1 dnem"
  },
  {
    id: "3",
    title: "Měsíční porada",
    content: "Nezapomeňte na měsíční poradu tento pátek ve 14:00. Přijďte připraveni se svými měsíčními reporty.",
    type: "reminder",
    author: "HR oddělení",
    timestamp: "před 2 dny"
  },
  {
    id: "4",
    title: "Údržba systému dnes večer",
    content: "Systém sledování provizí bude nedostupný kvůli údržbě od 23:00 do 1:00. Zadejte prosím své záznamy předem.",
    type: "urgent",
    author: "IT podpora",
    timestamp: "před 3 hodinami"
  }
];

export const AnnouncementSidebar = ({ isOpen, onClose }: AnnouncementSidebarProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newType, setNewType] = useState<Announcement["type"]>("general");

  const addAnnouncement = () => {
    if (!newTitle || !newContent) return;

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      type: newType,
      author: "Admin",
      timestamp: "právě teď"
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);
    setNewTitle("");
    setNewContent("");
    setNewType("general");
    setIsAdding(false);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
  };

  const getTypeColor = (type: Announcement["type"]) => {
    switch (type) {
      case "achievement": return "bg-green-100 text-green-800";
      case "reminder": return "bg-blue-100 text-blue-800";
      case "urgent": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: Announcement["type"]) => {
    switch (type) {
      case "achievement": return Star;
      case "reminder": return Calendar;
      case "urgent": return AlertCircle;
      default: return Megaphone;
    }
  };

  const getTypeLabel = (type: Announcement["type"]) => {
    switch (type) {
      case "achievement": return "úspěch";
      case "reminder": return "připomínka";
      case "urgent": return "urgentní";
      default: return "obecné";
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:relative top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        !isOpen && "lg:hidden"
      )}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-blue-600" />
                Novinky
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add Announcement Button */}
          <div className="p-4 border-b border-gray-200">
            {!isAdding ? (
              <Button 
                onClick={() => setIsAdding(true)}
                className="w-full"
                variant="outline"
              >
                + Přidat novinku
              </Button>
            ) : (
              <Card>
                <CardContent className="p-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Nadpis novinky..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                  <Textarea
                    placeholder="Obsah novinky..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full text-sm"
                    rows={3}
                  />
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as Announcement["type"])}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="general">Obecné</option>
                    <option value="achievement">Úspěch</option>
                    <option value="reminder">Připomínka</option>
                    <option value="urgent">Urgentní</option>
                  </select>
                  <div className="flex gap-2">
                    <Button onClick={addAnnouncement} size="sm" className="flex-1">
                      Publikovat
                    </Button>
                    <Button onClick={() => setIsAdding(false)} variant="outline" size="sm">
                      Zrušit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Announcements List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {announcements.map((announcement) => {
              const TypeIcon = getTypeIcon(announcement.type);
              return (
                <Card key={announcement.id} className="transition-shadow hover:shadow-md group">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm font-medium leading-tight flex-1">
                        {announcement.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(announcement.type)}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {getTypeLabel(announcement.type)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteAnnouncement(announcement.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {announcement.content}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{announcement.author}</span>
                      <span>{announcement.timestamp}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
