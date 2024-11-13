import React, { useState } from 'react';
import { FileText, FileSpreadsheet, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Pagination from './common/Pagination';
import TestSearchSection, { SearchFilters } from './TestSearchSection';
import { mockTests } from '../data/mockTests';
import { TEST_TYPES, TEST_STATUS, type Test } from '../types/test';

function TestManagement() {
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedTests, setSelectedTests] = useState<number[]>([]);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{
    test: Test;
    type: 'request' | 'result';
  } | null>(null);

  const handleSearch = (filters: SearchFilters) => {
    let filtered = [...mockTests];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(test =>
        test.barcode.includes(searchLower) ||
        test.patientName.toLowerCase().includes(searchLower) ||
        test.phoneNumber.includes(searchLower)
      );
    }

    if (filters.partner) {
      filtered = filtered.filter(test =>
        test.partner.toLowerCase().includes(filters.partner.toLowerCase())
      );
    }

    if (filters.registrationDateStart && filters.registrationDateEnd) {
      filtered = filtered.filter(test => {
        const testDate = new Date(test.registrationDate);
        return testDate >= filters.registrationDateStart! &&
               testDate <= filters.registrationDateEnd!;
      });
    }

    if (filters.completionDateStart && filters.completionDateEnd) {
      filtered = filtered.filter(test => {
        if (!test.completionDate) return false;
        const testDate = new Date(test.completionDate);
        return testDate >= filters.completionDateStart! &&
               testDate <= filters.completionDateEnd!;
      });
    }

    setTests(filtered);
    setCurrentPage(1);
  };

  const handleDocumentClick = (test: Test, type: 'request' | 'result') => {
    setSelectedDocument({ test, type });
    setDocumentDialogOpen(true);
  };

  const getDialogTitle = () => {
    if (!selectedDocument) return '';
    const { test, type } = selectedDocument;
    return `${test.patientName} - ${type === 'request' ? '의뢰서' : '결과서'} - ${test.registrationDate}`;
  };

  // Calculate current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTests = tests.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">검사 관리</h1>
        <p className="mt-2 text-sm text-gray-600">NGS 검사 기록을 관리합니다.</p>
      </div>

      <TestSearchSection onSearch={handleSearch} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Total {tests.length}건
          </div>
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Excel로 다운로드
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Checkbox
                    checked={selectedTests.length === currentTests.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTests(currentTests.map(test => test.id));
                      } else {
                        setSelectedTests([]);
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">바코드번호</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">파트너명(파트너ID)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">검사자명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">검사 타입</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">의뢰서 등록일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">검사상태/완료일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={selectedTests.includes(test.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTests([...selectedTests, test.id]);
                        } else {
                          setSelectedTests(selectedTests.filter(id => id !== test.id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.barcode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {test.partner} ({test.partnerId})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{TEST_TYPES[test.testType]}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.registrationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {test.status === 'ANALYSIS_COMPLETE' && test.completionDate ? (
                      <span className="text-green-600">
                        {TEST_STATUS[test.status]}/{test.completionDate}
                      </span>
                    ) : (
                      <span>{TEST_STATUS[test.status]}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleDocumentClick(test, 'request')}
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        의뢰서
                      </Button>
                      {test.status === 'ANALYSIS_COMPLETE' && (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleDocumentClick(test, 'result')}
                        >
                          <FileSpreadsheet className="w-4 h-4 mr-1" />
                          결과서
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          totalItems={tests.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      <Dialog open={documentDialogOpen} onOpenChange={setDocumentDialogOpen}>
        <DialogContent className="max-w-[800px] h-[80vh]">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <div className="p-4">
              {selectedDocument?.type === 'request' ? (
                <div>의뢰서 내용이 여기에 표시됩니다.</div>
              ) : (
                <div>검사 결과서 내용이 여기에 표시됩니다.</div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TestManagement;