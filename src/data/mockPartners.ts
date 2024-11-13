export interface Partner {
  id: number;
  partnerId: string;
  name: string;
  businessNumber: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  logo?: string;
}

export const mockPartners: Partner[] = [
  {
    id: 1,
    partnerId: 'SNUH',
    name: '서울대학교병원',
    businessNumber: '123-45-67890',
    email: 'contact@snuh.org',
    phone: '02-2072-2114',
    registrationDate: '2024-03-15 14:30',
    status: 'ACTIVE',
  },
  {
    id: 2,
    partnerId: 'YUHS',
    name: '연세의료원',
    businessNumber: '234-56-78901',
    email: 'contact@yuhs.ac',
    phone: '02-2228-1111',
    registrationDate: '2024-03-14 11:20',
    status: 'ACTIVE',
  },
  {
    id: 3,
    partnerId: 'SMC',
    name: '삼성서울병원',
    businessNumber: '345-67-89012',
    email: 'contact@smc.or.kr',
    phone: '02-3410-2114',
    registrationDate: '2024-03-13 09:45',
    status: 'ACTIVE',
  },
  {
    id: 4,
    partnerId: 'AMC',
    name: '서울아산병원',
    businessNumber: '456-78-90123',
    email: 'contact@amc.seoul.kr',
    phone: '02-3010-3114',
    registrationDate: '2024-03-12 16:15',
    status: 'ACTIVE',
  },
  {
    id: 5,
    partnerId: 'KUMC',
    name: '고려대학교병원',
    businessNumber: '567-89-01234',
    email: 'contact@kumc.or.kr',
    phone: '02-920-5114',
    registrationDate: '2024-03-11 13:50',
    status: 'INACTIVE',
  },
  {
    id: 6,
    partnerId: 'KHUH',
    name: '경희대학교병원',
    businessNumber: '678-90-12345',
    email: 'contact@khuh.ac.kr',
    phone: '02-958-8114',
    registrationDate: '2024-03-10 10:25',
    status: 'ACTIVE',
  },
  {
    id: 7,
    partnerId: 'CMC',
    name: '가톨릭중앙의료원',
    businessNumber: '789-01-23456',
    email: 'contact@cmc.or.kr',
    phone: '02-1588-1511',
    registrationDate: '2024-03-09 15:40',
    status: 'ACTIVE',
  },
  {
    id: 8,
    partnerId: 'SCHMC',
    name: '순천향대학교병원',
    businessNumber: '890-12-34567',
    email: 'contact@schmc.ac.kr',
    phone: '02-709-9114',
    registrationDate: '2024-03-08 12:10',
    status: 'INACTIVE',
  },
  {
    id: 9,
    partnerId: 'EUMC',
    name: '이화여자대학교의료원',
    businessNumber: '901-23-45678',
    email: 'contact@eumc.ac.kr',
    phone: '02-2650-5114',
    registrationDate: '2024-03-07 09:30',
    status: 'ACTIVE',
  },
  {
    id: 10,
    partnerId: 'HMC',
    name: '한양대학교병원',
    businessNumber: '012-34-56789',
    email: 'contact@hyumc.com',
    phone: '02-2290-8114',
    registrationDate: '2024-03-06 14:15',
    status: 'ACTIVE',
  }
];