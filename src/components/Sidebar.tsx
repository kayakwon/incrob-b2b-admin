import React from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  PackageSearch, 
  Users2, 
  Building, 
  MessagesSquare 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Logo } from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: '대시보드' },
  { id: 'tests', icon: FlaskConical, label: '검사 관리' },
  { id: 'kits', icon: PackageSearch, label: '검사키트 관리' },
  { id: 'users', icon: Users2, label: '회원 관리' },
  { id: 'partners', icon: Building, label: '파트너 관리' },
  { id: 'faq', icon: MessagesSquare, label: 'FAQ 관리' },
];

function Sidebar({ onNavigate, currentView }: SidebarProps) {
  return (
    <div className="w-64 bg-[#313C55] flex flex-col">
      <div className="p-6">
        <Logo />
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.id ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              currentView === item.id 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t border-[#414D6C]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-white/10 hover:text-white">
              <img
                src="https://ui.shadcn.com/avatars/01.png"
                alt="Admin profile"
                className="h-8 w-8 rounded-full mr-3"
              />
              <div className="text-left">
                <p className="text-sm font-medium">인크로비</p>
                <p className="text-xs text-gray-400">admin@incrob.com</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>내 계정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>프로필 설정</DropdownMenuItem>
            <DropdownMenuItem>보안 설정</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Sidebar;