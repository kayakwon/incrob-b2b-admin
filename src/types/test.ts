export interface Test {
  id: number;
  barcode: string;
  partner: string;
  partnerId: string;
  patientName: string;
  phoneNumber: string;
  testType: 'GUT_MICROBIOME' | 'ORAL_MICROBIOME' | 'VAGINAL_MICROBIOME' | 'SKIN_MICROBIOME' | 'PET_GUT_MICROBIOME';
  registrationDate: string;
  status: 'REGISTRATION_COMPLETE' | 'SHIPPING' | 'ANALYZING' | 'ANALYSIS_COMPLETE';
  completionDate?: string;
}

export const TEST_TYPES = {
  GUT_MICROBIOME: '장내 미생물',
  ORAL_MICROBIOME: '구강 미생물',
  VAGINAL_MICROBIOME: '질내 미생물',
  SKIN_MICROBIOME: '피부 미생물',
  PET_GUT_MICROBIOME: '반려동물 장내 미생물'
} as const;

export const TEST_STATUS = {
  REGISTRATION_COMPLETE: '의뢰서등록완료',
  SHIPPING: '배송중',
  ANALYZING: '분석중',
  ANALYSIS_COMPLETE: '분석완료'
} as const;