// أنواع بيانات الشركاء

export interface Partner {
  id: string;
  code: string;
  name: string;
  nameEn?: string;
  type: PartnerType;
  category: PartnerCategory;

  // معلومات الاتصال
  phone?: string;
  email?: string;
  address?: string;

  // معلومات مالية
  creditLimit?: number;
  balance: number;
  currency: string;

  // معلومات إضافية
  taxNumber?: string;
  commercialRecord?: string;
  isActive: boolean;
  notes?: string;

  // تواريخ
  createdAt: Date;
  updatedAt: Date;
}

// أنواع الشركاء
export type PartnerType =
  | 'customer'     // عميل
  | 'supplier'     // مورد
  | 'employee'     // موظف
  | 'owner'        // صاحب رأس المال
  | 'partner'      // شريك
  | 'contractor'   // مقاول
  | 'other';       // أخرى

// فئات الشركاء
export type PartnerCategory =
  | 'individual'   // فرد
  | 'company'      // شركة
  | 'government'   // جهة حكومية
  | 'bank'         // بنك
  | 'organization' // مؤسسة
  | 'other';       // أخرى

// تسميات أنواع الشركاء
export const partnerTypeLabels: Record<PartnerType, string> = {
  customer: 'عميل',
  supplier: 'مورد',
  employee: 'موظف',
  owner: 'صاحب رأس المال',
  partner: 'شريك',
  contractor: 'مقاول',
  other: 'أخرى'
};

// تسميات فئات الشركاء
export const partnerCategoryLabels: Record<PartnerCategory, string> = {
  individual: 'فرد',
  company: 'شركة',
  government: 'جهة حكومية',
  bank: 'بنك',
  organization: 'مؤسسة',
  other: 'أخرى'
};

// فلاتر البحث
export interface PartnerFilters {
  search?: string;
  type?: PartnerType;
  category?: PartnerCategory;
  isActive?: boolean;
}

// بيانات وهمية للشركاء
export const mockPartners: Partner[] = [
  {
    id: '1',
    code: 'CUST001',
    name: 'شركة النور للتجارة',
    nameEn: 'Al Noor Trading Company',
    type: 'customer',
    category: 'company',
    phone: '01234567890',
    email: 'info@alnoor.com',
    address: 'القاهرة، مصر',
    creditLimit: 100000,
    balance: 15000,
    currency: 'EGP',
    taxNumber: '123456789',
    commercialRecord: 'CR123456',
    isActive: true,
    notes: 'عميل مميز',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-09-20')
  },
  {
    id: '2',
    code: 'SUPP001',
    name: 'مؤسسة الأمل للمواد الغذائية',
    nameEn: 'Al Amal Food Supplies',
    type: 'supplier',
    category: 'company',
    phone: '01098765432',
    email: 'sales@alamal.com',
    address: 'الإسكندرية، مصر',
    creditLimit: 50000,
    balance: -8500,
    currency: 'EGP',
    taxNumber: '987654321',
    isActive: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-09-18')
  },
  {
    id: '3',
    code: 'EMP001',
    name: 'أحمد محمد علي',
    nameEn: 'Ahmed Mohamed Ali',
    type: 'employee',
    category: 'individual',
    phone: '01155443322',
    email: 'ahmed.ali@company.com',
    address: 'الجيزة، مصر',
    balance: 2500,
    currency: 'EGP',
    isActive: true,
    notes: 'مدير المبيعات',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-09-15')
  },
  {
    id: '4',
    code: 'OWN001',
    name: 'محمد أحمد السيد',
    nameEn: 'Mohamed Ahmed Al Sayed',
    type: 'owner',
    category: 'individual',
    phone: '01122334455',
    email: 'owner@company.com',
    balance: 500000,
    currency: 'EGP',
    isActive: true,
    notes: 'صاحب رأس المال الرئيسي',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-09-22')
  },
  {
    id: '5',
    code: 'CUST002',
    name: 'فاطمة حسن محمود',
    nameEn: 'Fatima Hassan Mahmoud',
    type: 'customer',
    category: 'individual',
    phone: '01066778899',
    email: 'fatima@email.com',
    address: 'المنصورة، مصر',
    creditLimit: 25000,
    balance: 3200,
    currency: 'EGP',
    isActive: true,
    createdAt: new Date('2024-04-12'),
    updatedAt: new Date('2024-09-10')
  },
  {
    id: '6',
    code: 'CONT001',
    name: 'شركة البناء المتطور',
    nameEn: 'Advanced Construction Company',
    type: 'contractor',
    category: 'company',
    phone: '01277889900',
    email: 'contracts@advanced.com',
    address: 'أسوان، مصر',
    creditLimit: 200000,
    balance: -12000,
    currency: 'EGP',
    taxNumber: '555666777',
    commercialRecord: 'CR789012',
    isActive: true,
    notes: 'مقاول أعمال البناء',
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-09-05')
  },
  {
    id: '7',
    code: 'BANK001',
    name: 'البنك الأهلي المصري',
    nameEn: 'National Bank of Egypt',
    type: 'other',
    category: 'bank',
    phone: '0219000000',
    email: 'info@nbe.com.eg',
    address: 'القاهرة، مصر',
    balance: 150000,
    currency: 'EGP',
    isActive: true,
    notes: 'البنك الرئيسي للشركة',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: '8',
    code: 'SUPP002',
    name: 'مصنع الحديد والصلب',
    nameEn: 'Iron and Steel Factory',
    type: 'supplier',
    category: 'company',
    phone: '01388776655',
    email: 'orders@iron-steel.com',
    address: 'حلوان، مصر',
    creditLimit: 300000,
    balance: -25000,
    currency: 'EGP',
    taxNumber: '111222333',
    commercialRecord: 'CR345678',
    isActive: true,
    createdAt: new Date('2024-06-08'),
    updatedAt: new Date('2024-09-12')
  }
];