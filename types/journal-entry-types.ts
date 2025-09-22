// أنواع بيانات القيود المحاسبية

export interface JournalEntry {
  id: string;
  entryNumber: string; // رقم القيد
  date: Date; // تاريخ القيد
  referenceNumber?: string; // رقم المرجع
  description: string; // وصف القيد

  // التفاصيل المحاسبية
  lines: JournalEntryLine[]; // بنود القيد
  totalDebit: number; // إجمالي المدين
  totalCredit: number; // إجمالي الدائن

  // الحالة والمعلومات
  status: JournalEntryStatus; // حالة القيد
  type: JournalEntryType; // نوع القيد
  currency: string; // العملة
  exchangeRate?: number; // سعر الصرف

  // معلومات التتبع
  createdAt: Date; // تاريخ الإنشاء
  updatedAt: Date; // تاريخ آخر تحديث
  createdBy: string; // منشئ القيد
  reviewedBy?: string; // مراجع القيد
  reviewedAt?: Date; // تاريخ المراجعة
  postedBy?: string; // منشئ الترحيل
  postedAt?: Date; // تاريخ الترحيل

  // معلومات إضافية
  notes?: string; // ملاحظات
  attachments?: JournalEntryAttachment[]; // المرفقات
  tags?: string[]; // العلامات
  fiscalYear: string; // السنة المالية
  period: string; // الفترة المالية

  // نظام التحكم
  isReversed: boolean; // تم عكسه
  reversalEntryId?: string; // رقم القيد المعكوس
  originalEntryId?: string; // القيد الأصلي إذا كان هذا عكس
}

// بند القيد المحاسبي
export interface JournalEntryLine {
  id: string;
  lineNumber: number; // رقم البند
  accountId: string; // معرف الحساب
  accountCode: string; // كود الحساب
  accountName: string; // اسم الحساب

  // المبالغ
  debit: number; // المبلغ المدين
  credit: number; // المبلغ الدائن
  amount: number; // المبلغ الأساسي

  // الوصف والتفاصيل
  description?: string; // وصف البند
  costCenter?: string; // مركز التكلفة
  project?: string; // المشروع

  // معلومات إضافية
  reference?: string; // المرجع
  dueDate?: Date; // تاريخ الاستحقاق
  currency?: string; // العملة
  exchangeRate?: number; // سعر الصرف

  // البيانات التحليلية
  analyticalData?: Record<string, any>; // بيانات تحليلية إضافية
}

// حالة القيد
export type JournalEntryStatus =
  | 'draft'      // مسودة
  | 'pending'    // في الانتظار
  | 'reviewed'   // تمت المراجعة
  | 'posted'     // تم الترحيل
  | 'cancelled'  // ملغي
  | 'reversed'   // تم عكسه
  | 'adjusted';  // تم تعديله

// نوع القيد
export type JournalEntryType =
  | 'manual'     // قيد يدوي
  | 'automatic'  // قيد تلقائي
  | 'opening'    // قيد افتتاحي
  | 'closing'    // قيد إقفال
  | 'adjustment' // قيد تسوية
  | 'reversal'   // قيد عكس
  | 'recurring'; // قيد متكرر

// المرفقات
export interface JournalEntryAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

// بيانات نموذج إضافة القيد
export interface JournalEntryFormData {
  date: Date;
  referenceNumber?: string;
  description: string;
  lines: JournalEntryLineFormData[];
  notes?: string;
  tags?: string[];
  costCenter?: string;
  project?: string;
}

// بيانات نموذج بند القيد
export interface JournalEntryLineFormData {
  accountId: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  description?: string;
  costCenter?: string;
  project?: string;
  reference?: string;
  dueDate?: Date;
}

// فلاتر البحث
export interface JournalEntryFilters {
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: JournalEntryStatus;
  type?: JournalEntryType;
  accountId?: string;
  createdBy?: string;
  amountFrom?: number;
  amountTo?: number;
  fiscalYear?: string;
  period?: string;
  hasAttachments?: boolean;
}

// إحصائيات القيود
export interface JournalEntryStats {
  totalEntries: number;
  entriesByStatus: Record<JournalEntryStatus, number>;
  entriesByType: Record<JournalEntryType, number>;
  totalAmount: number;
  totalDebit: number;
  totalCredit: number;
  pendingReview: number;
  pendingPosting: number;
  lastEntry?: Date;
}

// استجابة API
export interface JournalEntriesResponse {
  entries: JournalEntry[];
  stats: JournalEntryStats;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// خطأ التحقق
export interface JournalEntryValidationError {
  field: string;
  lineIndex?: number;
  message: string;
  code: string;
}

// خيارات العرض
export interface JournalEntryViewOptions {
  showLineNumbers: boolean;
  showAccountCodes: boolean;
  showReferences: boolean;
  showCostCenters: boolean;
  expandAllLines: boolean;
  groupByAccount: boolean;
  groupByDate: boolean;
}

// تقرير القيود
export interface JournalEntryReport {
  id: string;
  name: string;
  filters: JournalEntryFilters;
  viewOptions: JournalEntryViewOptions;
  generatedAt: Date;
  generatedBy: string;
  format: 'pdf' | 'excel' | 'csv';
}

// قالب القيد المتكرر
export interface RecurringJournalTemplate {
  id: string;
  name: string;
  description?: string;
  lines: JournalEntryLineFormData[];
  schedule: RecurringSchedule;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
  nextRunDate: Date;
  lastRunDate?: Date;
  createdAt: Date;
  createdBy: string;
}

// جدولة التكرار
export interface RecurringSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  interval: number; // كل كم وحدة
  dayOfWeek?: number; // يوم الأسبوع (0-6)
  dayOfMonth?: number; // يوم الشهر (1-31)
  monthOfYear?: number; // شهر السنة (1-12)
}

// سير العمل
export interface JournalEntryWorkflow {
  entryId: string;
  currentStep: WorkflowStep;
  steps: WorkflowStep[];
  canEdit: boolean;
  canReview: boolean;
  canPost: boolean;
  canCancel: boolean;
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'completed' | 'skipped';
  assignedTo?: string;
  completedBy?: string;
  completedAt?: Date;
  comments?: string;
  requiredRole: string;
}

// إعدادات القيود
export interface JournalEntrySettings {
  autoNumbering: boolean;
  numberingPattern: string; // نمط الترقيم
  requireReview: boolean; // يتطلب مراجعة
  requireApproval: boolean; // يتطلب اعتماد
  allowFutureDate: boolean; // السماح بتاريخ مستقبلي
  maxFutureDays: number; // الحد الأقصى للأيام المستقبلية
  allowBackDate: boolean; // السماح بتاريخ سابق
  maxBackDays: number; // الحد الأقصى للأيام السابقة
  allowZeroAmount: boolean; // السماح بمبلغ صفر
  mandatoryFields: string[]; // الحقول الإجبارية
  defaultCurrency: string; // العملة الافتراضية
  decimalPlaces: number; // عدد المنازل العشرية
}