import React, { useState } from 'react';
import { ClipboardList, CheckSquare, Users, Building2, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DatePickerWithRange } from './DatePickerWithRange';
import { DateRange } from 'react-day-picker';
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { BarChart } from './charts/BarChart';
import { TEST_TYPES } from '../types/test';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

function Dashboard({ onNavigate }: DashboardProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: new Date(2023, 1, 9),
  });

  const todayTests = 47;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DatePickerWithRange date={date} onDateChange={setDate} />
          <Button variant="outline">기간설정</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              전체 검사신청수
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              전월 대비 +180.1% 증가
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              전체 검사완료수
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,203</div>
            <p className="text-xs text-muted-foreground">
              전월 대비 +19% 증가
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 회원수</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">
              전월 대비 +19% 증가
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              전체 파트너수
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              전월 대비 +20.1% 증가
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>최근 10일간 검사신청수</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <BarChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>최근 검사신청</CardTitle>
            <p className="text-sm text-muted-foreground">
              오늘 {todayTests}건의 검사가 신청되었습니다.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentTests.map((test, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://ui.shadcn.com/avatars/0${(index % 5) + 1}.png`} />
                    <AvatarFallback>{test.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{test.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {test.partner} • {TEST_TYPES[test.testType]}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    {test.registrationDate}
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => onNavigate('tests')}
              >
                더 보기
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const recentTests = [
  {
    name: "김철수",
    partner: "서울대학교병원",
    testType: "GUT_MICROBIOME",
    registrationDate: "2024-03-15 14:30"
  },
  {
    name: "이영희",
    partner: "연세의료원",
    testType: "ORAL_MICROBIOME",
    registrationDate: "2024-03-15 13:24"
  },
  {
    name: "박지민",
    partner: "삼성서울병원",
    testType: "VAGINAL_MICROBIOME",
    registrationDate: "2024-03-15 12:55"
  },
  {
    name: "정민수",
    partner: "서울아산병원",
    testType: "SKIN_MICROBIOME",
    registrationDate: "2024-03-15 11:40"
  },
  {
    name: "최유진",
    partner: "고려대학교병원",
    testType: "PET_GUT_MICROBIOME",
    registrationDate: "2024-03-15 10:15"
  },
  {
    name: "강동원",
    partner: "서울대학교병원",
    testType: "GUT_MICROBIOME",
    registrationDate: "2024-03-15 09:30"
  },
  {
    name: "한소희",
    partner: "연세의료원",
    testType: "ORAL_MICROBIOME",
    registrationDate: "2024-03-15 09:15"
  },
  {
    name: "이도현",
    partner: "삼성서울병원",
    testType: "SKIN_MICROBIOME",
    registrationDate: "2024-03-15 08:45"
  },
  {
    name: "김태리",
    partner: "서울아산병원",
    testType: "VAGINAL_MICROBIOME",
    registrationDate: "2024-03-15 08:20"
  },
  {
    name: "박서준",
    partner: "고려대학교병원",
    testType: "PET_GUT_MICROBIOME",
    registrationDate: "2024-03-15 08:00"
  }
];

export default Dashboard;