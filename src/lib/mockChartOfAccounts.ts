// frontend\src\lib\mockChartOfAccounts.ts
import { ChartAccount, AccountsStats } from '../../types/accounts-types';

// البيانات التجريبية لشجرة الحسابات
export const mockChartOfAccounts: ChartAccount[] = [
  // الأصول - Assets (1xxx)
  {
    id: '1',
    code: '1000',
    name: 'الأصول',
    nameEn: 'Assets',
    level: 1,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: true,
    balance: 2450000,
    debitBalance: 2450000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'مجموعة الأصول الرئيسية',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: true,
    allowDirectPosting: false,
    children: []
  },

  // الأصول المتداولة - Current Assets (11xx)
  {
    id: '2',
    code: '1100',
    name: 'الأصول المتداولة',
    nameEn: 'Current Assets',
    parentId: '1',
    parentCode: '1000',
    level: 2,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: true,
    balance: 1850000,
    debitBalance: 1850000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'الأصول التي يمكن تحويلها إلى نقد خلال سنة',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: true,
    allowDirectPosting: false,
    children: []
  },

  // النقدية - Cash (111x)
  {
    id: '3',
    code: '1110',
    name: 'النقدية والبنوك',
    nameEn: 'Cash and Banks',
    parentId: '2',
    parentCode: '1100',
    level: 3,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: true,
    balance: 850000,
    debitBalance: 850000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'الأموال النقدية والحسابات البنكية',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '4',
    code: '1111',
    name: 'صندوق النقدية',
    nameEn: 'Cash on Hand',
    parentId: '3',
    parentCode: '1110',
    level: 4,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: false,
    balance: 25000,
    debitBalance: 25000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'النقدية الموجودة في الصندوق',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-16'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['نقدية', 'صندوق']
  },

  {
    id: '5',
    code: '1112',
    name: 'البنك الأهلي - حساب جاري',
    nameEn: 'National Bank - Current Account',
    parentId: '3',
    parentCode: '1110',
    level: 4,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: false,
    balance: 425000,
    debitBalance: 425000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'حساب جاري بالبنك الأهلي',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['بنك', 'حساب جاري']
  },

  {
    id: '6',
    code: '1113',
    name: 'بنك الراجحي - حساب توفير',
    nameEn: 'Al Rajhi Bank - Savings Account',
    parentId: '3',
    parentCode: '1110',
    level: 4,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: false,
    balance: 400000,
    debitBalance: 400000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'حساب توفير ببنك الراجحي',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-15'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['بنك', 'حساب توفير']
  },

  // حسابات العملاء - Accounts Receivable (112x)
  {
    id: '7',
    code: '1120',
    name: 'حسابات العملاء المدينة',
    nameEn: 'Accounts Receivable',
    parentId: '2',
    parentCode: '1100',
    level: 3,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: true,
    balance: 650000,
    debitBalance: 650000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'المبالغ المستحقة من العملاء',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '8',
    code: '1121',
    name: 'عملاء - محليين',
    nameEn: 'Local Customers',
    parentId: '7',
    parentCode: '1120',
    level: 4,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: false,
    balance: 450000,
    debitBalance: 450000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'حسابات العملاء المحليين',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-16'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['عملاء', 'محلي']
  },

  {
    id: '9',
    code: '1122',
    name: 'عملاء - أجانب',
    nameEn: 'Foreign Customers',
    parentId: '7',
    parentCode: '1120',
    level: 4,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: false,
    balance: 200000,
    debitBalance: 200000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'حسابات العملاء الأجانب',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-14'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['عملاء', 'أجنبي']
  },

  // المخزون - Inventory (113x)
  {
    id: '10',
    code: '1130',
    name: 'المخزون',
    nameEn: 'Inventory',
    parentId: '2',
    parentCode: '1100',
    level: 3,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: true,
    balance: 350000,
    debitBalance: 350000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'مخزون البضائع والمواد',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '11',
    code: '1131',
    name: 'مخزون البضائع الجاهزة',
    nameEn: 'Finished Goods Inventory',
    parentId: '10',
    parentCode: '1130',
    level: 4,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: false,
    balance: 250000,
    debitBalance: 250000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'البضائع الجاهزة للبيع',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['مخزون', 'بضائع جاهزة']
  },

  {
    id: '12',
    code: '1132',
    name: 'مخزون المواد الخام',
    nameEn: 'Raw Materials Inventory',
    parentId: '10',
    parentCode: '1130',
    level: 4,
    type: 'asset',
    category: 'current-assets',
    isActive: true,
    hasChildren: false,
    balance: 100000,
    debitBalance: 100000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'المواد الخام للإنتاج',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-15'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['مخزون', 'مواد خام']
  },

  // الأصول الثابتة - Fixed Assets (12xx)
  {
    id: '13',
    code: '1200',
    name: 'الأصول الثابتة',
    nameEn: 'Fixed Assets',
    parentId: '1',
    parentCode: '1000',
    level: 2,
    type: 'asset',
    category: 'fixed-assets',
    isActive: true,
    hasChildren: true,
    balance: 600000,
    debitBalance: 600000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'الأصول طويلة الأجل',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: true,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '14',
    code: '1210',
    name: 'أثاث ومعدات مكتبية',
    nameEn: 'Office Furniture & Equipment',
    parentId: '13',
    parentCode: '1200',
    level: 3,
    type: 'asset',
    category: 'fixed-assets',
    isActive: true,
    hasChildren: false,
    balance: 150000,
    debitBalance: 150000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'أثاث ومعدات المكتب',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['أثاث', 'معدات']
  },

  {
    id: '15',
    code: '1220',
    name: 'أجهزة كمبيوتر وتقنية',
    nameEn: 'Computers & Technology',
    parentId: '13',
    parentCode: '1200',
    level: 3,
    type: 'asset',
    category: 'fixed-assets',
    isActive: true,
    hasChildren: false,
    balance: 200000,
    debitBalance: 200000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'أجهزة الكمبيوتر والتقنية',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['تقنية', 'كمبيوتر']
  },

  {
    id: '16',
    code: '1230',
    name: 'سيارات ومركبات',
    nameEn: 'Vehicles',
    parentId: '13',
    parentCode: '1200',
    level: 3,
    type: 'asset',
    category: 'fixed-assets',
    isActive: true,
    hasChildren: false,
    balance: 250000,
    debitBalance: 250000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'سيارات الشركة',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['سيارات', 'مركبات']
  },

  // الخصوم - Liabilities (2xxx)
  {
    id: '17',
    code: '2000',
    name: 'الخصوم',
    nameEn: 'Liabilities',
    level: 1,
    type: 'liability',
    category: 'current-liabilities',
    isActive: true,
    hasChildren: true,
    balance: 850000,
    debitBalance: 0,
    creditBalance: 850000,
    currency: 'SAR',
    description: 'مجموعة الخصوم الرئيسية',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: true,
    allowDirectPosting: false,
    children: []
  },

  // الخصوم المتداولة - Current Liabilities (21xx)
  {
    id: '18',
    code: '2100',
    name: 'الخصوم المتداولة',
    nameEn: 'Current Liabilities',
    parentId: '17',
    parentCode: '2000',
    level: 2,
    type: 'liability',
    category: 'current-liabilities',
    isActive: true,
    hasChildren: true,
    balance: 650000,
    debitBalance: 0,
    creditBalance: 650000,
    currency: 'SAR',
    description: 'الالتزامات قصيرة الأجل',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: true,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '19',
    code: '2110',
    name: 'حسابات الموردين الدائنة',
    nameEn: 'Accounts Payable',
    parentId: '18',
    parentCode: '2100',
    level: 3,
    type: 'liability',
    category: 'current-liabilities',
    isActive: true,
    hasChildren: false,
    balance: 400000,
    debitBalance: 0,
    creditBalance: 400000,
    currency: 'SAR',
    description: 'المبالغ المستحقة للموردين',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-16'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['موردين', 'دائنة']
  },

  {
    id: '20',
    code: '2120',
    name: 'ضريبة القيمة المضافة المستحقة',
    nameEn: 'VAT Payable',
    parentId: '18',
    parentCode: '2100',
    level: 3,
    type: 'liability',
    category: 'current-liabilities',
    isActive: true,
    hasChildren: false,
    balance: 150000,
    debitBalance: 0,
    creditBalance: 150000,
    currency: 'SAR',
    description: 'ضريبة القيمة المضافة المستحقة الدفع',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['ضريبة', 'قيمة مضافة']
  },

  {
    id: '21',
    code: '2130',
    name: 'مستحقات ورواتب',
    nameEn: 'Accrued Salaries',
    parentId: '18',
    parentCode: '2100',
    level: 3,
    type: 'liability',
    category: 'current-liabilities',
    isActive: true,
    hasChildren: false,
    balance: 100000,
    debitBalance: 0,
    creditBalance: 100000,
    currency: 'SAR',
    description: 'الرواتب والمستحقات',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-15'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['رواتب', 'مستحقات']
  },

  // الخصوم طويلة الأجل - Long Term Liabilities (22xx)
  {
    id: '22',
    code: '2200',
    name: 'الخصوم طويلة الأجل',
    nameEn: 'Long Term Liabilities',
    parentId: '17',
    parentCode: '2000',
    level: 2,
    type: 'liability',
    category: 'long-term-liabilities',
    isActive: true,
    hasChildren: true,
    balance: 200000,
    debitBalance: 0,
    creditBalance: 200000,
    currency: 'SAR',
    description: 'الالتزامات طويلة الأجل',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: true,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '23',
    code: '2210',
    name: 'قروض بنكية طويلة الأجل',
    nameEn: 'Long Term Bank Loans',
    parentId: '22',
    parentCode: '2200',
    level: 3,
    type: 'liability',
    category: 'long-term-liabilities',
    isActive: true,
    hasChildren: false,
    balance: 200000,
    debitBalance: 0,
    creditBalance: 200000,
    currency: 'SAR',
    description: 'القروض البنكية طويلة الأجل',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-01'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['قروض', 'بنكية']
  },

  // حقوق الملكية - Equity (3xxx)
  {
    id: '24',
    code: '3000',
    name: 'حقوق الملكية',
    nameEn: 'Equity',
    level: 1,
    type: 'equity',
    category: 'capital',
    isActive: true,
    hasChildren: true,
    balance: 1600000,
    debitBalance: 0,
    creditBalance: 1600000,
    currency: 'SAR',
    description: 'حقوق أصحاب الشركة',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: true,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '25',
    code: '3100',
    name: 'رأس المال',
    nameEn: 'Share Capital',
    parentId: '24',
    parentCode: '3000',
    level: 2,
    type: 'equity',
    category: 'capital',
    isActive: true,
    hasChildren: false,
    balance: 1000000,
    debitBalance: 0,
    creditBalance: 1000000,
    currency: 'SAR',
    description: 'رأس مال الشركة',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['رأس مال']
  },

  {
    id: '26',
    code: '3200',
    name: 'الأرباح المحتجزة',
    nameEn: 'Retained Earnings',
    parentId: '24',
    parentCode: '3000',
    level: 2,
    type: 'equity',
    category: 'retained-earnings',
    isActive: true,
    hasChildren: false,
    balance: 600000,
    debitBalance: 0,
    creditBalance: 600000,
    currency: 'SAR',
    description: 'الأرباح المحتجزة من السنوات السابقة',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['أرباح', 'محتجزة']
  },

  // الإيرادات - Revenue (4xxx)
  {
    id: '27',
    code: '4000',
    name: 'الإيرادات',
    nameEn: 'Revenue',
    level: 1,
    type: 'revenue',
    category: 'sales-revenue',
    isActive: true,
    hasChildren: true,
    balance: 3500000,
    debitBalance: 0,
    creditBalance: 3500000,
    currency: 'SAR',
    description: 'إيرادات الشركة',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: true,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '28',
    code: '4100',
    name: 'إيرادات المبيعات',
    nameEn: 'Sales Revenue',
    parentId: '27',
    parentCode: '4000',
    level: 2,
    type: 'revenue',
    category: 'sales-revenue',
    isActive: true,
    hasChildren: true,
    balance: 3200000,
    debitBalance: 0,
    creditBalance: 3200000,
    currency: 'SAR',
    description: 'إيرادات من بيع البضائع والخدمات',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '29',
    code: '4110',
    name: 'مبيعات محلية',
    nameEn: 'Local Sales',
    parentId: '28',
    parentCode: '4100',
    level: 3,
    type: 'revenue',
    category: 'sales-revenue',
    isActive: true,
    hasChildren: false,
    balance: 2500000,
    debitBalance: 0,
    creditBalance: 2500000,
    currency: 'SAR',
    description: 'المبيعات للعملاء المحليين',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['مبيعات', 'محلية']
  },

  {
    id: '30',
    code: '4120',
    name: 'مبيعات للتصدير',
    nameEn: 'Export Sales',
    parentId: '28',
    parentCode: '4100',
    level: 3,
    type: 'revenue',
    category: 'sales-revenue',
    isActive: true,
    hasChildren: false,
    balance: 700000,
    debitBalance: 0,
    creditBalance: 700000,
    currency: 'SAR',
    description: 'المبيعات للتصدير',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-15'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['مبيعات', 'تصدير']
  },

  {
    id: '31',
    code: '4200',
    name: 'إيرادات أخرى',
    nameEn: 'Other Revenue',
    parentId: '27',
    parentCode: '4000',
    level: 2,
    type: 'revenue',
    category: 'other-revenue',
    isActive: true,
    hasChildren: false,
    balance: 300000,
    debitBalance: 0,
    creditBalance: 300000,
    currency: 'SAR',
    description: 'إيرادات متنوعة أخرى',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-10'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['إيرادات', 'أخرى']
  },

  // تكلفة المبيعات - Cost of Sales (5xxx)
  {
    id: '32',
    code: '5000',
    name: 'تكلفة المبيعات',
    nameEn: 'Cost of Sales',
    level: 1,
    type: 'cost',
    category: 'cost-of-goods-sold',
    isActive: true,
    hasChildren: true,
    balance: 1800000,
    debitBalance: 1800000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'تكلفة البضائع المباعة',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: true,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '33',
    code: '5100',
    name: 'تكلفة البضائع المباعة',
    nameEn: 'Cost of Goods Sold',
    parentId: '32',
    parentCode: '5000',
    level: 2,
    type: 'cost',
    category: 'cost-of-goods-sold',
    isActive: true,
    hasChildren: false,
    balance: 1800000,
    debitBalance: 1800000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'التكلفة المباشرة للبضائع المباعة',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['تكلفة', 'بضائع']
  },

  // المصروفات - Expenses (6xxx)
  {
    id: '34',
    code: '6000',
    name: 'المصروفات',
    nameEn: 'Expenses',
    level: 1,
    type: 'expense',
    category: 'operating-expenses',
    isActive: true,
    hasChildren: true,
    balance: 950000,
    debitBalance: 950000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'مصروفات الشركة',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: true,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '35',
    code: '6100',
    name: 'المصروفات الإدارية',
    nameEn: 'Administrative Expenses',
    parentId: '34',
    parentCode: '6000',
    level: 2,
    type: 'expense',
    category: 'administrative-expenses',
    isActive: true,
    hasChildren: true,
    balance: 400000,
    debitBalance: 400000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'المصروفات الإدارية والعمومية',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '36',
    code: '6110',
    name: 'رواتب وأجور',
    nameEn: 'Salaries & Wages',
    parentId: '35',
    parentCode: '6100',
    level: 3,
    type: 'expense',
    category: 'administrative-expenses',
    isActive: true,
    hasChildren: false,
    balance: 250000,
    debitBalance: 250000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'رواتب وأجور الموظفين',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-15'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['رواتب', 'موظفين']
  },

  {
    id: '37',
    code: '6120',
    name: 'إيجارات',
    nameEn: 'Rent Expenses',
    parentId: '35',
    parentCode: '6100',
    level: 3,
    type: 'expense',
    category: 'administrative-expenses',
    isActive: true,
    hasChildren: false,
    balance: 120000,
    debitBalance: 120000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'إيجارات المباني والمعدات',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-01'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['إيجار', 'مباني']
  },

  {
    id: '38',
    code: '6130',
    name: 'كهرباء وماء وهاتف',
    nameEn: 'Utilities',
    parentId: '35',
    parentCode: '6100',
    level: 3,
    type: 'expense',
    category: 'administrative-expenses',
    isActive: true,
    hasChildren: false,
    balance: 30000,
    debitBalance: 30000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'مصروفات الكهرباء والماء والاتصالات',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-16'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['كهرباء', 'مياه', 'اتصالات']
  },

  {
    id: '39',
    code: '6200',
    name: 'المصروفات البيعية',
    nameEn: 'Selling Expenses',
    parentId: '34',
    parentCode: '6000',
    level: 2,
    type: 'expense',
    category: 'selling-expenses',
    isActive: true,
    hasChildren: true,
    balance: 350000,
    debitBalance: 350000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'مصروفات البيع والتسويق',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '40',
    code: '6210',
    name: 'دعاية وإعلان',
    nameEn: 'Advertising & Marketing',
    parentId: '39',
    parentCode: '6200',
    level: 3,
    type: 'expense',
    category: 'selling-expenses',
    isActive: true,
    hasChildren: false,
    balance: 150000,
    debitBalance: 150000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'مصروفات الدعاية والإعلان',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-12'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['دعاية', 'إعلان', 'تسويق']
  },

  {
    id: '41',
    code: '6220',
    name: 'عمولات المبيعات',
    nameEn: 'Sales Commissions',
    parentId: '39',
    parentCode: '6200',
    level: 3,
    type: 'expense',
    category: 'selling-expenses',
    isActive: true,
    hasChildren: false,
    balance: 200000,
    debitBalance: 200000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'عمولات موظفي المبيعات',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-16'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['عمولات', 'مبيعات']
  },

  {
    id: '42',
    code: '6300',
    name: 'المصروفات المالية',
    nameEn: 'Financial Expenses',
    parentId: '34',
    parentCode: '6000',
    level: 2,
    type: 'expense',
    category: 'financial-expenses',
    isActive: true,
    hasChildren: true,
    balance: 200000,
    debitBalance: 200000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'المصروفات المالية والبنكية',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    isSystem: false,
    allowDirectPosting: false,
    children: []
  },

  {
    id: '43',
    code: '6310',
    name: 'فوائد القروض',
    nameEn: 'Interest Expenses',
    parentId: '42',
    parentCode: '6300',
    level: 3,
    type: 'expense',
    category: 'financial-expenses',
    isActive: true,
    hasChildren: false,
    balance: 180000,
    debitBalance: 180000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'فوائد على القروض البنكية',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-01'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['فوائد', 'قروض']
  },

  {
    id: '44',
    code: '6320',
    name: 'رسوم بنكية',
    nameEn: 'Bank Charges',
    parentId: '42',
    parentCode: '6300',
    level: 3,
    type: 'expense',
    category: 'financial-expenses',
    isActive: true,
    hasChildren: false,
    balance: 20000,
    debitBalance: 20000,
    creditBalance: 0,
    currency: 'SAR',
    description: 'الرسوم والعمولات البنكية',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-09-17'),
    lastTransactionDate: new Date('2025-09-16'),
    isSystem: false,
    allowDirectPosting: true,
    tags: ['رسوم', 'بنكية']
  }
];

// إحصائيات شجرة الحسابات
export const mockAccountsStats: AccountsStats = {
  totalAccounts: mockChartOfAccounts.length,
  activeAccounts: mockChartOfAccounts.filter(acc => acc.isActive).length,
  inactiveAccounts: mockChartOfAccounts.filter(acc => !acc.isActive).length,
  accountsByType: {
    asset: mockChartOfAccounts.filter(acc => acc.type === 'asset').length,
    liability: mockChartOfAccounts.filter(acc => acc.type === 'liability').length,
    equity: mockChartOfAccounts.filter(acc => acc.type === 'equity').length,
    revenue: mockChartOfAccounts.filter(acc => acc.type === 'revenue').length,
    expense: mockChartOfAccounts.filter(acc => acc.type === 'expense').length,
    cost: mockChartOfAccounts.filter(acc => acc.type === 'cost').length,
  },
  accountsByCategory: {
    'current-assets': mockChartOfAccounts.filter(acc => acc.category === 'current-assets').length,
    'fixed-assets': mockChartOfAccounts.filter(acc => acc.category === 'fixed-assets').length,
    'intangible-assets': mockChartOfAccounts.filter(acc => acc.category === 'intangible-assets').length,
    'long-term-assets': mockChartOfAccounts.filter(acc => acc.category === 'long-term-assets').length,
    'current-liabilities': mockChartOfAccounts.filter(acc => acc.category === 'current-liabilities').length,
    'long-term-liabilities': mockChartOfAccounts.filter(acc => acc.category === 'long-term-liabilities').length,
    capital: mockChartOfAccounts.filter(acc => acc.category === 'capital').length,
    'retained-earnings': mockChartOfAccounts.filter(acc => acc.category === 'retained-earnings').length,
    reserves: mockChartOfAccounts.filter(acc => acc.category === 'reserves').length,
    'sales-revenue': mockChartOfAccounts.filter(acc => acc.category === 'sales-revenue').length,
    'other-revenue': mockChartOfAccounts.filter(acc => acc.category === 'other-revenue').length,
    'financial-revenue': mockChartOfAccounts.filter(acc => acc.category === 'financial-revenue').length,
    'operating-expenses': mockChartOfAccounts.filter(acc => acc.category === 'operating-expenses').length,
    'administrative-expenses': mockChartOfAccounts.filter(acc => acc.category === 'administrative-expenses').length,
    'selling-expenses': mockChartOfAccounts.filter(acc => acc.category === 'selling-expenses').length,
    'financial-expenses': mockChartOfAccounts.filter(acc => acc.category === 'financial-expenses').length,
    'cost-of-goods-sold': mockChartOfAccounts.filter(acc => acc.category === 'cost-of-goods-sold').length,
  },
  totalBalance: mockChartOfAccounts.reduce((sum, acc) => sum + Math.abs(acc.balance), 0),
  totalDebits: mockChartOfAccounts.reduce((sum, acc) => sum + acc.debitBalance, 0),
  totalCredits: mockChartOfAccounts.reduce((sum, acc) => sum + acc.creditBalance, 0),
  lastUpdated: new Date('2025-09-17')
};

// مساعد لبناء شجرة الحسابات
export function buildAccountTree(accounts: ChartAccount[]): ChartAccount[] {
  const accountMap = new Map<string, ChartAccount>();
  const rootAccounts: ChartAccount[] = [];

  // إنشاء خريطة للحسابات
  accounts.forEach(account => {
    accountMap.set(account.id, { ...account, children: [] });
  });

  // بناء الشجرة
  accounts.forEach(account => {
    const accountCopy = accountMap.get(account.id)!;

    if (account.parentId) {
      const parent = accountMap.get(account.parentId);
      if (parent) {
        parent.children!.push(accountCopy);
      }
    } else {
      rootAccounts.push(accountCopy);
    }
  });

  return rootAccounts;
}

// دالة البحث والفلترة
export function filterAccounts(
  accounts: ChartAccount[],
  filters: Partial<{
    search: string;
    type: string;
    category: string;
    status: string;
    hasBalance: boolean;
    level: number;
  }>
): ChartAccount[] {
  const filtered = accounts.filter(account => {
    if (filters.search && !account.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !account.code.includes(filters.search)) {
      return false;
    }

    if (filters.type && account.type !== filters.type) {
      return false;
    }

    if (filters.category && account.category !== filters.category) {
      return false;
    }

    if (filters.status) {
      const isActive = filters.status === 'active';
      if (account.isActive !== isActive) {
        return false;
      }
    }

    if (filters.hasBalance !== undefined) {
      const hasBalance = account.balance !== 0;
      if (hasBalance !== filters.hasBalance) {
        return false;
      }
    }

    if (filters.level !== undefined && account.level !== filters.level) {
      return false;
    }

    return true;
  });

  // إذا كان هناك فلتر مستوى، نحتاج لإضافة الآباء للحفاظ على الهيكل الهرمي
  if (filters.level !== undefined) {
    const filteredWithParents = new Set<string>();

    // أضف الحسابات المفلترة
    filtered.forEach(account => {
      filteredWithParents.add(account.id);
    });

    // أضف جميع الآباء المطلوبين
    filtered.forEach(account => {
      let currentParentId = account.parentId;
      while (currentParentId) {
        const parent = accounts.find(a => a.id === currentParentId);
        if (parent) {
          filteredWithParents.add(parent.id);
          currentParentId = parent.parentId;
        } else {
          break;
        }
      }
    });

    // ارجع الحسابات مع آبائها
    return accounts.filter(account => filteredWithParents.has(account.id));
  }

  return filtered;
}