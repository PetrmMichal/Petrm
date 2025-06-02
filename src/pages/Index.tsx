
import { useState } from "react";
import { CommissionTable } from "@/components/CommissionTable";
import { AnnouncementSidebar } from "@/components/AnnouncementSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, BarChart3 } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AnnouncementSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                    Sledování provizí
                  </h1>
                  <p className="text-gray-600 mt-1">Sledujte denní výkonnost provizí všech členů týmu</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex items-center gap-2"
              >
                <Menu className="h-4 w-4" />
                Novinky
              </Button>
            </div>

            {/* Commission Table */}
            <CommissionTable />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
