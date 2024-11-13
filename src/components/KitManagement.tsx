import React, { useState, useRef } from 'react';
import { Pencil, Trash2, Upload, Plus, FileSpreadsheet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from './common/Pagination';
import SearchSection, { SearchFilters } from './SearchSection';
import { mockKits } from '../data/mockKits';
import { TEST_TYPES } from '../types/test';

function KitManagement() {
  const [kits, setKits] = useState(mockKits);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedKits, setSelectedKits] = useState<number[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [kitToDelete, setKitToDelete] = useState<number | null>(null);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (filters: SearchFilters) => {
    let filtered = [...mockKits];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(kit =>
        kit.barcode.includes(searchLower)
      );
    }

    if (filters.partner) {
      filtered = filtered.filter(kit =>
        kit.partner.toLowerCase().includes(filters.partner.toLowerCase())
      );
    }

    if (filters.registrationDateStart && filters.registrationDateEnd) {
      filtered = filtered.filter(kit => {
        const kitDate = new Date(kit.registrationDate);
        return kitDate >= filters.registrationDateStart! &&
               kitDate <= filters.registrationDateEnd!;
      });
    }

    setKits(filtered);
    setCurrentPage(1);
  };

  const indexOfLastKit = currentPage * itemsPerPage;
  const indexOfFirstKit = indexOfLastKit - itemsPerPage;
  const currentKits = kits.slice(indexOfFirstKit, indexOfLastKit);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedKits(currentKits.map(kit => kit.id));
    } else {
      setSelectedKits([]);
    }
  };

  const handleSelectKit = (kitId: number, checked: boolean) => {
    if (checked) {
      setSelectedKits([...selectedKits, kitId]);
    } else {
      setSelectedKits(selectedKits.filter(id => id !== kitId));
    }
  };

  const handleDeleteClick = (kitId: number) => {
    setKitToDelete(kitId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (kitToDelete) {
      setKits(kits.filter(kit => kit.id !== kitToDelete));
      setDeleteDialogOpen(false);
      setKitToDelete(null);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">검사키트 관리</h1>
        <p className="mt-2 text-sm text-gray-600">NGS 검사키트를 관리합니다.</p>
      </div>

      <SearchSection onSearch={handleSearch} />

      <div className="bg-gray-50 p-4 rounded-lg mb-4 flex justify-end space-x-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".xlsx,.xls"
          onChange={(e) => {
            // Handle file upload
            console.log(e.target.files);
          }}
        />
        <Button variant="outline" onClick={handleFileUpload}>
          <Upload className="w-4 h-4 mr-2" />
          Excel로 업로드
        </Button>
        <Button onClick={() => setRegisterDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          검사키트 등록
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Total {kits.length}건
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
                    checked={selectedKits.length === currentKits.length}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">바코드번호</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">파트너명(파트너ID)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">검사 타입</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용여부</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentKits.map((kit) => (
                <tr key={kit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={selectedKits.includes(kit.id)}
                      onCheckedChange={(checked) => handleSelectKit(kit.id, checked as boolean)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kit.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kit.barcode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {kit.partner} ({kit.partnerId})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{TEST_TYPES[kit.testType]}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kit.registrationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {kit.useDate ? '사용' : '미사용'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kit.useDate || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4 mr-1" />
                        수정
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(kit.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        삭제
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          totalItems={kits.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>검사키트 등록</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div>
                <Label>바코드번호 범위</Label>
                <div className="flex items-center space-x-2 mt-1.5">
                  <Input placeholder="시작번호" />
                  <span>~</span>
                  <Input placeholder="끝번호" />
                </div>
              </div>
              <div>
                <Label>파트너명(파트너ID)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="파트너 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SNUH">서울대학교병원 (SNUH)</SelectItem>
                    <SelectItem value="YUHS">연세의료원 (YUHS)</SelectItem>
                    <SelectItem value="SMC">삼성서울병원 (SMC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>검사타입</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="검사타입 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TEST_TYPES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegisterDialogOpen(false)}>취소</Button>
            <Button>등록</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>삭제 확인</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 삭제하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default KitManagement;