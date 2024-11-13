import { TEST_TYPES } from '../types/test';

export interface User {
  id: number;
  partner: string;
  partnerId: string;
  name: string;
  phone: string;
  email: string;
  signupMethod: 'EMAIL' | 'KAKAO' | 'APPLE';
  uid: string;
  signupDate: string;
  lastAccessDate: string;
  testResults: number;
}

export const SIGNUP_METHODS = {
  EMAIL: '이메일',
  KAKAO: '카카오ID',
  APPLE: '애플ID'
} as const;

export const mockUsers: User[] = [
  {
    id: 1000,
    partner: '서울대학교병원',
    partnerId: 'SNUH',
    name: '김철수',
    phone: '010-1234-5678',
    email: 'chulsoo.kim@email.com',
    signupMethod: 'EMAIL',
    uid: 'USER_001',
    signupDate: '2024-03-15 14:30',
    lastAccessDate: '2024-03-20 09:15',
    testResults: 3
  },
  {
    id: 999,
    partner: '연세의료원',
    partnerId: 'YUHS',
    name: '이영희',
    phone: '010-2345-6789',
    email: 'younghee.lee@email.com',
    signupMethod: 'KAKAO',
    uid: 'USER_002',
    signupDate: '2024-03-14 11:20',
    lastAccessDate: '2024-03-19 16:45',
    testResults: 2
  },
  {
    id: 998,
    partner: '삼성서울병원',
    partnerId: 'SMC',
    name: '박지민',
    phone: '010-3456-7890',
    email: 'jimin.park@email.com',
    signupMethod: 'APPLE',
    uid: 'USER_003',
    signupDate: '2024-03-13 09:45',
    lastAccessDate: '2024-03-18 13:30',
    testResults: 1
  },
  {
    id: 997,
    partner: '서울아산병원',
    partnerId: 'AMC',
    name: '정민수',
    phone: '010-4567-8901',
    email: 'minsoo.jung@email.com',
    signupMethod: 'EMAIL',
    uid: 'USER_004',
    signupDate: '2024-03-12 16:15',
    lastAccessDate: '2024-03-17 11:20',
    testResults: 4
  },
  {
    id: 996,
    partner: '고려대학교병원',
    partnerId: 'KUMC',
    name: '최유진',
    phone: '010-5678-9012',
    email: 'yujin.choi@email.com',
    signupMethod: 'KAKAO',
    uid: 'USER_005',
    signupDate: '2024-03-11 13:50',
    lastAccessDate: '2024-03-16 14:40',
    testResults: 2
  },
  {
    id: 995,
    partner: '서울대학교병원',
    partnerId: 'SNUH',
    name: '강동원',
    phone: '010-6789-0123',
    email: 'dongwon.kang@email.com',
    signupMethod: 'APPLE',
    uid: 'USER_006',
    signupDate: '2024-03-10 10:30',
    lastAccessDate: '2024-03-15 15:25',
    testResults: 1
  },
  {
    id: 994,
    partner: '연세의료원',
    partnerId: 'YUHS',
    name: '한소희',
    phone: '010-7890-1234',
    email: 'sohee.han@email.com',
    signupMethod: 'EMAIL',
    uid: 'USER_007',
    signupDate: '2024-03-09 15:45',
    lastAccessDate: '2024-03-14 10:10',
    testResults: 3
  },
  {
    id: 993,
    partner: '삼성서울병원',
    partnerId: 'SMC',
    name: '이도현',
    phone: '010-8901-2345',
    email: 'dohyun.lee@email.com',
    signupMethod: 'KAKAO',
    uid: 'USER_008',
    signupDate: '2024-03-08 09:20',
    lastAccessDate: '2024-03-13 17:35',
    testResults: 2
  },
  {
    id: 992,
    partner: '서울아산병원',
    partnerId: 'AMC',
    name: '김태리',
    phone: '010-9012-3456',
    email: 'taeri.kim@email.com',
    signupMethod: 'APPLE',
    uid: 'USER_009',
    signupDate: '2024-03-07 14:10',
    lastAccessDate: '2024-03-12 12:50',
    testResults: 1
  },
  {
    id: 991,
    partner: '고려대학교병원',
    partnerId: 'KUMC',
    name: '박서준',
    phone: '010-0123-4567',
    email: 'seojun.park@email.com',
    signupMethod: 'EMAIL',
    uid: 'USER_010',
    signupDate: '2024-03-06 11:25',
    lastAccessDate: '2024-03-11 09:45',
    testResults: 5
  }
];