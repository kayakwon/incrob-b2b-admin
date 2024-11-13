import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";

function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="sr-only">알림</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;