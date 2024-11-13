import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from './DatePickerWithRange';
import { DateRange } from 'react-day-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEST_TYPES } from '../types/test';

interface SearchSectionProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  searchTerm: string;
  registrationDateStart: Date | null;
  registrationDateEnd: Date | null;
  completionDateStart: Date | null;
  completionDateEnd: Date | null;
  partner: string;
  testType: string;
}

const partners = [
  '서울대학교병원',
  '연세의료원',
  '삼성서울병원',
  '서울아산병원',
  '고려대학교병원',
];

function TestSearchSection({ onSearch }: SearchSectionProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    registrationDateStart: null,
    registrationDateEnd: null,
    completionDateStart: null,
    completionDateEnd: null,
    partner: '',
    testType: '',
  });

  const [registrationDate, setRegistrationDate] = useState<DateRange | undefined>();
  const [completionDate, setCompletionDate] = useState<DateRange | undefined>();
  const [showPartnerSuggestions, setShowPartnerSuggestions] = useState(false);

  const handleRegistrationDateChange = (range: DateRange | undefined) => {
    setRegistrationDate(range);
    setFilters(prev => ({
      ...prev,
      registrationDateStart: range?.from ?? null,
      registrationDateEnd: range?.to ?? null,
    }));
  };

  const handleCompletionDateChange = (range: DateRange | undefined) => {
    setCompletionDate(range);
    setFilters(prev => ({
      ...prev,
      completionDateStart: range?.from ?? null,
      completionDateEnd: range?.to ?? null,
    }));
  };

  const handleReset = () => {
    setFilters({
      searchTerm: '',
      registrationDateStart: null,
      registrationDateEnd: null,
      completionDateStart: null,
      completionDateEnd: null,
      partner: '',
      testType: '',
    });
    setRegistrationDate(undefined);
    setCompletionDate(undefined);
    onSearch({
      searchTerm: '',
      registrationDateStart: null,
      registrationDateEnd: null,
      completionDateStart: null,
      completionDateEnd: null,
      partner: '',
      testType: '',
    });
  };

  return (
    <div className="bg-card border rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 gap-6">
        {/* 첫번째 행 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="바코드 번호, 검사자명, 연락처로 검색"
              className="pl-9"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
          </div>

          <div className="relative">
            <Input
              type="text"
              placeholder="파트너명"
              value={filters.partner}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, partner: e.target.value }));
                setShowPartnerSuggestions(true);
              }}
              onFocus={() => setShowPartnerSuggestions(true)}
            />
            {showPartnerSuggestions && filters.partner && (
              <div className="absolute z-10 w-full mt-1 bg-popover border rounded-lg shadow-lg">
                {partners
                  .filter(p => p.toLowerCase().includes(filters.partner.toLowerCase()))
                  .map((partner) => (
                    <div
                      key={partner}
                      className="px-4 py-2 hover:bg-muted cursor-pointer"
                      onClick={() => {
                        setFilters(prev => ({ ...prev, partner }));
                        setShowPartnerSuggestions(false);
                      }}
                    >
                      {partner}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <Select
            value={filters.testType}
            onValueChange={(value) => setFilters(prev => ({ ...prev, testType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="검사 타입 선택" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TEST_TYPES).map(([key, value]) => (
                <SelectItem key={key} value={key}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 두번째 행 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">의뢰서 등록일</label>
            <DatePickerWithRange
              date={registrationDate}
              onDateChange={handleRegistrationDateChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">검사 완료일</label>
            <DatePickerWithRange
              date={completionDate}
              onDateChange={handleCompletionDateChange}
            />
          </div>
        </div>
      </div>

      {/* 검색 버튼 영역 */}
      <div className="mt-6 flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={handleReset}
        >
          <X className="w-4 h-4 mr-2" />
          초기화
        </Button>
        <Button
          onClick={() => onSearch(filters)}
        >
          <Search className="w-4 h-4 mr-2" />
          검색
        </Button>
      </div>
    </div>
  );
}

export default TestSearchSection;