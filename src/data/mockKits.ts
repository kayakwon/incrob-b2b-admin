import { TEST_TYPES } from '../types/test';

export interface Kit {
  id: number;
  barcode: string;
  partner: string;
  partnerId: string;
  testType: keyof typeof TEST_TYPES;
  registrationDate: string;
  useDate: string | null;
}

export const mockKits: Kit[] = [
  {
    id: 1000,
    barcode: '3202303079371',
    partner: '서울대학교병원',
    partnerId: 'SNUH',
    testType: 'GUT_MICROBIOME',
    registrationDate: '2024-03-15 14:30',
    useDate: '2024-03-20'
  },
  {
    id: 999,
    barcode: '3202303079372',
    partner: '연세의료원',
    partnerId: 'YUHS',
    testType: 'ORAL_MICROBIOME',
    registrationDate: '2024-03-14 11:20',
    useDate: null
  },
  {
    id: 998,
    barcode: '3202303079373',
    partner: '삼성서울병원',
    partnerId: 'SMC',
    testType: 'VAGINAL_MICROBIOME',
    registrationDate: '2024-03-13 09:45',
    useDate: null
  },
  {
    id: 997,
    barcode: '3202303079374',
    partner: '서울아산병원',
    partnerId: 'AMC',
    testType: 'SKIN_MICROBIOME',
    registrationDate: '2024-03-12 16:15',
    useDate: '2024-03-18'
  },
  {
    id: 996,
    barcode: '3202303079375',
    partner: '고려대학교병원',
    partnerId: 'KUMC',
    testType: 'PET_GUT_MICROBIOME',
    registrationDate: '2024-03-11 13:50',
    useDate: '2024-03-16'
  },
  {
    id: 995,
    barcode: '3202303079376',
    partner: '서울대학교병원',
    partnerId: 'SNUH',
    testType: 'GUT_MICROBIOME',
    registrationDate: '2024-03-10 10:30',
    useDate: null
  },
  {
    id: 994,
    barcode: '3202303079377',
    partner: '연세의료원',
    partnerId: 'YUHS',
    testType: 'ORAL_MICROBIOME',
    registrationDate: '2024-03-09 15:20',
    useDate: '2024-03-15'
  },
  {
    id: 993,
    barcode: '3202303079378',
    partner: '삼성서울병원',
    partnerId: 'SMC',
    testType: 'VAGINAL_MICROBIOME',
    registrationDate: '2024-03-08 11:45',
    useDate: null
  },
  {
    id: 992,
    barcode: '3202303079379',
    partner: '서울아산병원',
    partnerId: 'AMC',
    testType: 'SKIN_MICROBIOME',
    registrationDate: '2024-03-07 14:15',
    useDate: '2024-03-14'
  },
  {
    id: 991,
    barcode: '3202303079380',
    partner: '고려대학교병원',
    partnerId: 'KUMC',
    testType: 'PET_GUT_MICROBIOME',
    registrationDate: '2024-03-06 09:50',
    useDate: '2024-03-12'
  }
];