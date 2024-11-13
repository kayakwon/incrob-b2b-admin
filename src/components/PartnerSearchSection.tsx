import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from './DatePickerWithRange';
import { DateRange } from 'react-day-picker';

interface SearchSectionProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  searchTerm: string;
  registrationDateStart: Date | null;
  registrationDateEnd: Date | null;
  isActive: boolean;
  isInactive: boolean;
}

function PartnerSearchSection({ onSearch }: SearchSectionProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    registrationDateStart: null,
    registrationDateEnd: null,
    isActive: false,
    isInactive: false,
  });

  const [registrationDate, setRegistrationDate] = useState<DateRange | undefined>();

  const handleRegistrationDateChange = (range: DateRange | undefined) => {
    setRegistrationDate(range);
    setFilters(prev => ({
      ...prev,
      registrationDateStart: range?.from ?? null,
      registrationDateEnd: range?.to ?? null,
    }));
  };

  const handleReset = () => {
    setFilters({
      searchTerm: '',
      registrationDateStart: null,
      registrationDateEnd: null,
      isActive: false,
      isInactive: false,
    });
    setRegistrationDate(undefined);
    onSearch({
      searchTerm: '',
      registrationDateStart: null,
      registrationDateEnd: null,
      isActive: false,
      isInactive: false,
    });
  };

  return (
    <div className="bg-card border rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 gap-6">
        {/* 첫번째 행 */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="파트너ID, 파트너명, 사업자번호, 이메일, 연락처로 검색"
              className="pl-9"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
          </div>
        </div>

        {/* 두번째 행 */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="space-y-2">
            <label className="text-sm font-medium">등록일</label>
            <DatePickerWithRange
              date={registrationDate}
              onDateChange={handleRegistrationDateChange}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={filters.isActive}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, isActive: checked as boolean }))
                }
              />
              <label htmlFor="active" className="text-sm">활성</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inactive"
                checked={filters.isInactive}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, isInactive: checked as boolean }))
                }
              />
              <label htmlFor="inactive" className="text-sm">비활성</label>
            </div>
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

export default PartnerSearchSection;