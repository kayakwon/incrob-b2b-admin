import { Test } from '../types/test';

export const mockTests: Test[] = [
  {
    id: 1000,
    barcode: '3202303079371',
    partner: '서울대학교병원',
    partnerId: 'SNUH',
    patientName: '김철수',
    phoneNumber: '010-1234-5678',
    testType: 'GUT_MICROBIOME',
    registrationDate: '2024-03-15 14:30',
    status: 'ANALYSIS_COMPLETE',
    completionDate: '2024-03-20'
  },
  {
    id: 999,
    barcode: '3202303079372',
    partner: '연세의료원',
    partnerId: 'YUHS',
    patientName: '이영희',
    phoneNumber: '010-2345-6789',
    testType: 'ORAL_MICROBIOME',
    registrationDate: '2024-03-14 11:20',
    status: 'ANALYZING'
  },
  {
    id: 998,
    barcode: '3202303079373',
    partner: '삼성서울병원',
    partnerId: 'SMC',
    patientName: '박지민',
    phoneNumber: '010-3456-7890',
    testType: 'VAGINAL_MICROBIOME',
    registrationDate: '2024-03-13 09:45',
    status: 'SHIPPING'
  },
  {
    id: 997,
    barcode: '3202303079374',
    partner: '서울아산병원',
    partnerId: 'AMC',
    patientName: '정민수',
    phoneNumber: '010-4567-8901',
    testType: 'SKIN_MICROBIOME',
    registrationDate: '2024-03-12 16:15',
    status: 'REGISTRATION_COMPLETE'
  },
  {
    id: 996,
    barcode: '3202303079375',
    partner: '고려대학교병원',
    partnerId: 'KUMC',
    patientName: '최유진',
    phoneNumber: '010-5678-9012',
    testType: 'PET_GUT_MICROBIOME',
    registrationDate: '2024-03-11 13:50',
    status: 'ANALYSIS_COMPLETE',
    completionDate: '2024-03-16'
  },
  {
    id: 995,
    barcode: '3202303079376',
    partner: '서울대학교병원',
    partnerId: 'SNUH',
    patientName: '강동원',
    phoneNumber: '010-6789-0123',
    testType: 'GUT_MICROBIOME',
    registrationDate: '2024-03-10 10:30',
    status: 'ANALYZING'
  },
  {
    id: 994,
    barcode: '3202303079377',
    partner: '연세의료원',
    partnerId: 'YUHS',
    patientName: '한소희',
    phoneNumber: '010-7890-1234',
    testType: 'ORAL_MICROBIOME',
    registrationDate: '2024-03-09 15:45',
    status: 'SHIPPING'
  },
  {
    id: 993,
    barcode: '3202303079378',
    partner: '삼성서울병원',
    partnerId: 'SMC',
    patientName: '이도현',
    phoneNumber: '010-8901-2345',
    testType: 'SKIN_MICROBIOME',
    registrationDate: '2024-03-08 09:20',
    status: 'ANALYSIS_COMPLETE',
    completionDate: '2024-03-13'
  },
  {
    id: 992,
    barcode: '3202303079379',
    partner: '서울아산병원',
    partnerId: 'AMC',
    patientName: '김태리',
    phoneNumber: '010-9012-3456',
    testType: 'VAGINAL_MICROBIOME',
    registrationDate: '2024-03-07 14:10',
    status: 'REGISTRATION_COMPLETE'
  },
  {
    id: 991,
    barcode: '3202303079380',
    partner: '고려대학교병원',
    partnerId: 'KUMC',
    patientName: '박서준',
    phoneNumber: '010-0123-4567',
    testType: 'PET_GUT_MICROBIOME',
    registrationDate: '2024-03-06 11:25',
    status: 'ANALYSIS_COMPLETE',
    completionDate: '2024-03-11'
  }
];