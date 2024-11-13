import React, { useState } from 'react';
import { FileSpreadsheet, Pencil, Trash2, Plus, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Pagination from './common/Pagination';
import PartnerSearchSection, { SearchFilters } from './PartnerSearchSection';
import { mockPartners } from '../data/mockPartners';

interface PartnerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  partner: typeof mockPartners[0] | null;
  mode: 'register' | 'detail';
}

const PartnerDialog = ({ isOpen, onClose, partner, mode }: PartnerDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'register' ? '파트너 등록' : '파트너 상세정보'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partnerId">파트너ID</Label>
              <Input 
                id="partnerId" 
                defaultValue={partner?.partnerId} 
                readOnly={mode === 'detail'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partnerName">파트너명</Label>
              <Input 
                id="partnerName" 
                defaultValue={partner?.name}
                readOnly={mode === 'detail'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessNumber">사업자번호</Label>
              <Input 
                id="businessNumber" 
                defaultValue={partner?.businessNumber}
                readOnly={mode === 'detail'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue={partner?.email}
                readOnly={mode === 'detail'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">연락처</Label>
              <Input 
                id="phone" 
                defaultValue={partner?.phone}
                readOnly={mode === 'detail'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">파트너로고</Label>
              {mode === 'detail' ? (
                <div className="h-[100px] flex items-center">
                  <Avatar className="h-[100px] w-[100px]">
                    <AvatarImage src={partner?.logo} alt={partner?.name} className="object-cover" />
                    <AvatarFallback className="text-2xl">{partner?.name?.[0]}</AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <Input id="logo" type="file" />
              )}
            </div>
          </div>
          {mode === 'detail' && (
            <div className="space-y-2 col-span-2">
              <Label>링크 URL</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  value={`https://b2b.incrob.com/${partner?.partnerId}`}
                  readOnly
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          {mode === 'register' ? (
            <>
              <Button variant="outline" onClick={onClose}>취소</Button>
              <Button>등록</Button>
            </>
          ) : (
            <Button onClick={onClose}>닫기</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function PartnerManagement() {
  const [partners, setPartners] = useState(mockPartners);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(null);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<typeof mockPartners[0] | null>(null);

  const handleSearch = (filters: SearchFilters) => {
    let filtered = [...mockPartners];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(partner =>
        partner.partnerId.toLowerCase().includes(searchLower) ||
        partner.name.toLowerCase().includes(searchLower) ||
        partner.businessNumber.includes(searchLower) ||
        partner.email.toLowerCase().includes(searchLower) ||
        partner.phone.includes(searchLower)
      );
    }

    if (filters.registrationDateStart && filters.registrationDateEnd) {
      filtered = filtered.filter(partner => {
        const partnerDate = new Date(partner.registrationDate);
        return partnerDate >= filters.registrationDateStart! &&
               partnerDate <= filters.registrationDateEnd!;
      });
    }

    if (filters.isActive || filters.isInactive) {
      filtered = filtered.filter(partner => {
        if (filters.isActive && !filters.isInactive) {
          return partner.status === 'ACTIVE';
        }
        if (!filters.isActive && filters.isInactive) {
          return partner.status === 'INACTIVE';
        }
        return true;
      });
    }

    setPartners(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (partnerId: number) => {
    setSelectedPartnerId(partnerId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPartnerId) {
      const updatedPartners = partners.filter(partner => partner.id !== selectedPartnerId);
      setPartners(updatedPartners);
      setIsDeleteDialogOpen(false);
      setSelectedPartnerId(null);
    }
  };

  const handlePartnerClick = (partner: typeof mockPartners[0]) => {
    setSelectedPartner(partner);
    setIsDetailDialogOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPartners = partners.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">파트너 관리</h1>
        <p className="mt-2 text-sm text-gray-600">파트너사 정보를 관리합니다.</p>
      </div>

      <PartnerSearchSection onSearch={handleSearch} />

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Total {partners.length}건</span>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Excel로 다운로드
            </Button>
          </div>
          <Button onClick={() => setIsRegisterDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            파트너 등록
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">파트너ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">파트너명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사업자번호</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPartners.map((partner) => (
                <tr key={partner.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button 
                      className="hover:text-blue-600"
                      onClick={() => handlePartnerClick(partner)}
                    >
                      {partner.partnerId}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button 
                      className="hover:text-blue-600"
                      onClick={() => handlePartnerClick(partner)}
                    >
                      {partner.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.businessNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.registrationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4 mr-1" />
                        수정
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(partner.id)}>
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
          totalItems={partners.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      <PartnerDialog 
        isOpen={isRegisterDialogOpen} 
        onClose={() => setIsRegisterDialogOpen(false)}
        partner={null}
        mode="register"
      />

      <PartnerDialog
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        partner={selectedPartner}
        mode="detail"
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>삭제 확인</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 삭제하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PartnerManagement;