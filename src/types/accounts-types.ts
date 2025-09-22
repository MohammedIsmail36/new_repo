// نوع بيانات شجرة الحسابات
export interface ChartAccount {
  id: string;
  code: string;
  name: string;
  nameEn?: string;
  parentId?: string;
  parentCode?: string;
  level: number;
  type: AccountType;
  category: AccountCategory;
  subCategory?: string;
  isActive: boolean;
  hasChildren: boolean;
  balance: number;
  debitBalance: number;
  creditBalance: number;
  currency: string;
  description?: string;
  children?: ChartAccount[];
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  lastTransactionDate?: Date;
  isSystem: boolean; // حساب نظام لا يمكن حذفه
  allowDirectPosting: boolean; // يسمح بالترحيل المباشر
  tags?: string[];
}

// أنواع الحسابات الرئيسية
export type AccountType =
  | 'asset'        // الأصول
  | 'liability'    // الخصوم
  | 'equity'       // حقوق الملكية
  | 'revenue'      // الإيرادات
  | 'expense'      // المصروفات
  | 'cost';        // تكلفة المبيعات

// فئات الحسابات
export type AccountCategory =
  // الأصول
  | 'current-assets'           // الأصول المتداولة
  | 'fixed-assets'            // الأصول الثابتة
  | 'intangible-assets'       // الأصول غير الملموسة
  | 'long-term-assets'        // الأصول طويلة الأجل

  // الخصوم
  | 'current-liabilities'     // الخصوم المتداولة
  | 'long-term-liabilities'   // الخصوم طويلة الأجل

  // حقوق الملكية
  | 'capital'                 // رأس المال
  | 'retained-earnings'       // الأرباح المحتجزة
  | 'reserves'               // الاحتياطات

  // الإيرادات
  | 'sales-revenue'          // إيرادات المبيعات
  | 'other-revenue'          // إيرادات أخرى
  | 'financial-revenue'      // الإيرادات المالية

  // المصروفات
  | 'operating-expenses'     // مصروفات تشغيلية
  | 'administrative-expenses' // مصروفات إدارية
  | 'selling-expenses'       // مصروفات بيعية
  | 'financial-expenses'     // مصروفات مالية

  // تكلفة المبيعات
  | 'cost-of-goods-sold';    // تكلفة البضاعة المباعة

// حالة الحساب
export type AccountStatus = 'active' | 'inactive' | 'archived';

// فلاتر البحث
export interface AccountFilters {
  search?: string;
  type?: AccountType;
  category?: AccountCategory;
  status?: AccountStatus;
  hasBalance?: boolean;
  level?: number;
  parentId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  showInactive?: boolean;
}

// بيانات إضافة/تعديل الحساب
export interface AccountFormData {
  code: string;
  name: string;
  nameEn?: string;
  parentId?: string;
  type: AccountType;
  category: AccountCategory;
  subCategory?: string;
  description?: string;
  allowDirectPosting: boolean;
  isActive: boolean;
  tags?: string[];
}

// إحصائيات شجرة الحسابات
export interface AccountsStats {
  totalAccounts: number;
  activeAccounts: number;
  inactiveAccounts: number;
  accountsByType: Record<AccountType, number>;
  accountsByCategory: Record<AccountCategory, number>;
  totalBalance: number;
  totalDebits: number;
  totalCredits: number;
  lastUpdated: Date;
}

// خيارات عرض الشجرة
export interface TreeViewOptions {
  showBalances: boolean;
  showCodes: boolean;
  showInactive: boolean;
  expandLevel: number; // مستوى التوسيع الافتراضي
  groupByType: boolean;
  sortBy: 'code' | 'name' | 'balance';
  sortOrder: 'asc' | 'desc';
}

// عمليات الحساب
export interface AccountOperation {
  id: string;
  type: 'create' | 'update' | 'delete' | 'activate' | 'deactivate';
  accountId: string;
  accountCode: string;
  accountName: string;
  timestamp: Date;
  userId: string;
  description?: string;
  oldData?: Partial<ChartAccount>;
  newData?: Partial<ChartAccount>;
}

// استجابة API
export interface AccountsResponse {
  accounts: ChartAccount[];
  stats: AccountsStats;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// خطأ validation
export interface AccountValidationError {
  field: keyof AccountFormData;
  message: string;
  code: string;
}

// أنماط التصدير
export type ExportFormat = 'excel' | 'pdf' | 'csv' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  includeBalances: boolean;
  includeInactive: boolean;
  onlyParentAccounts: boolean;
  dateRange?: {
    from: Date;
    to: Date;
  };
}