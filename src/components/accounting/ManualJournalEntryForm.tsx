'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  Calendar,
  FileText,
  Calculator,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader2,
  Save,
  Send,
  Hash,
  Building,
  User,
  DollarSign,
  Info
} from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { useToast, toast } from '@/components/ui/Toast';

// Types
interface JournalEntryLine {
  id: string;
  accountId: string;
  accountName: string;
  description: string;
  partner?: string;
  debitAmount: number;
  creditAmount: number;
}

interface JournalEntryData {
  date: string;
  reference: string;
  journal: string;
  description: string;
  status: 'draft' | 'posted';
  lines: JournalEntryLine[];
}

interface JournalEntryFormProps {
  onSuccess?: (data: JournalEntryData) => void;
  onError?: (error: any) => void;
}

// Mock data for accounts
const mockAccounts = [
  { value: '1001', label: 'النقدية في الصندوق', type: 'asset' },
  { value: '1002', label: 'البنك - الأهلي المصري', type: 'asset' },
  { value: '1101', label: 'العملاء', type: 'asset' },
  { value: '2001', label: 'الموردون', type: 'liability' },
  { value: '3001', label: 'رأس المال', type: 'equity' },
  { value: '4001', label: 'المبيعات', type: 'revenue' },
  { value: '5001', label: 'تكلفة البضاعة المباعة', type: 'expense' },
  { value: '6001', label: 'مصروفات إدارية', type: 'expense' }
];

const mockJournals = [
  { value: 'MISC', label: 'يومية متنوعة' },
  { value: 'BANK', label: 'يومية البنك' },
  { value: 'CASH', label: 'يومية النقدية' },
  { value: 'SALE', label: 'يومية المبيعات' },
  { value: 'PURCH', label: 'يومية المشتريات' }
];

export default function ManualJournalEntryForm({
  onSuccess,
  onError
}: JournalEntryFormProps) {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const { showToast } = useToast();

  // Form setup
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<JournalEntryData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      reference: '',
      journal: 'MISC',
      description: '',
      status: 'draft',
      lines: [
        { id: '1', accountId: '', accountName: '', description: '', partner: '', debitAmount: 0, creditAmount: 0 },
        { id: '2', accountId: '', accountName: '', description: '', partner: '', debitAmount: 0, creditAmount: 0 }
      ]
    }
  });

  // Field array for journal lines
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lines'
  });

  // Watch form values
  const watchedLines = watch('lines');
  const currentStatus = watch('status');
  const selectedJournal = watch('journal');

  // Calculate totals and validate balance
  const totals = useMemo(() => {
    const totalDebit = watchedLines.reduce((sum, line) => sum + (Number(line.debitAmount) || 0), 0);
    const totalCredit = watchedLines.reduce((sum, line) => sum + (Number(line.creditAmount) || 0), 0);
    const isBalanced = totalDebit === totalCredit && totalDebit > 0;
    const difference = Math.abs(totalDebit - totalCredit);

    return { totalDebit, totalCredit, isBalanced, difference };
  }, [watchedLines]);

  // Auto-generate reference based on journal and date
  useEffect(() => {
    if (selectedJournal && watch('date')) {
      const date = watch('date').replace(/-/g, '');
      const ref = `${selectedJournal}/${date}/001`;
      setValue('reference', ref);
    }
  }, [selectedJournal, setValue, watch]);

  // Add new line
  const addLine = useCallback(() => {
    append({
      id: Date.now().toString(),
      accountId: '',
      accountName: '',
      description: '',
      partner: '',
      debitAmount: 0,
      creditAmount: 0
    });
  }, [append]);

  // Remove line
  const removeLine = useCallback((index: number) => {
    if (fields.length > 2) {
      remove(index);
    }
  }, [remove, fields.length]);

  // Handle account selection
  const handleAccountSelect = useCallback((index: number, accountId: string) => {
    const account = mockAccounts.find(acc => acc.value === accountId);
    if (account) {
      setValue(`lines.${index}.accountId`, accountId);
      setValue(`lines.${index}.accountName`, account.label);
    }
  }, [setValue]);

  // Handle amount change with auto-balancing
  const handleAmountChange = useCallback((index: number, type: 'debit' | 'credit', value: string) => {
    const numValue = Math.max(0, Number(value) || 0);

    if (type === 'debit') {
      setValue(`lines.${index}.debitAmount`, numValue, { shouldValidate: true });
      if (numValue > 0) {
        setValue(`lines.${index}.creditAmount`, 0, { shouldValidate: true });
      }
    } else {
      setValue(`lines.${index}.creditAmount`, numValue, { shouldValidate: true });
      if (numValue > 0) {
        setValue(`lines.${index}.debitAmount`, 0, { shouldValidate: true });
      }
    }

    // Auto-add line if this is the last line and has content
    const isLastLine = index === fields.length - 1;
    const hasContent = numValue > 0 || watchedLines[index]?.accountId;
    if (isLastLine && hasContent) {
      setTimeout(addLine, 100);
    }
  }, [setValue, fields.length, watchedLines, addLine]);

  // Format number with Arabic locale
  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Handle form submission (Save as Draft)
  const onSubmit = async (data: JournalEntryData) => {
    setIsLoading(true);

    try {
      // Filter out empty lines
      const validLines = data.lines.filter(line =>
        line.accountId && (line.debitAmount > 0 || line.creditAmount > 0)
      );

      if (validLines.length < 2) {
        throw new Error('يجب إدخال بندين على الأقل');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      showToast(toast.success(
        'تم حفظ المسودة',
        'تم حفظ القيد كمسودة بنجاح',
        4000
      ));

      onSuccess?.({ ...data, lines: validLines });
    } catch (error: any) {
      console.error('Save draft error:', error);
      onError?.(error);
      showToast(toast.error(
        'خطأ في الحفظ',
        error.message || 'حدث خطأ أثناء حفظ المسودة',
        5000
      ));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle post journal entry
  const handlePost = async () => {
    if (!totals.isBalanced) {
      showToast(toast.error(
        'خطأ في التوازن',
        'يجب أن تكون المبالغ المدينة مساوية للمبالغ الدائنة',
        5000
      ));
      return;
    }

    setIsPosting(true);

    try {
      const formData = watch();
      const validLines = formData.lines.filter(line =>
        line.accountId && (line.debitAmount > 0 || line.creditAmount > 0)
      );

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setValue('status', 'posted');

      showToast(toast.success(
        'تم ترحيل القيد',
        'تم ترحيل القيد المحاسبي بنجاح',
        4000
      ));

      onSuccess?.({ ...formData, status: 'posted', lines: validLines });
    } catch (error) {
      console.error('Post error:', error);
      showToast(toast.error(
        'خطأ في الترحيل',
        'حدث خطأ أثناء ترحيل القيد',
        5000
      ));
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">قيد يومية يدوي</h1>
            </div>
            <Badge
              variant={currentStatus === 'posted' ? 'success' : 'secondary'}
              className="text-sm"
            >
              {currentStatus === 'posted' ? 'مرحل' : 'مسودة'}
            </Badge>
          </div>

          {/* Balance Indicator */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">حالة التوازن</div>
              <div className={`text-lg font-semibold ${totals.isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                {totals.isBalanced ? 'متوازن ✓' : `غير متوازن (${formatNumber(totals.difference)})`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Journal Entry Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4" />
                التاريخ <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('date', { required: 'التاريخ مطلوب' })}
                type="date"
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && (
                <p className="text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Building className="w-4 h-4" />
                اليومية <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('journal', { required: 'اليومية مطلوبة' })}
                options={mockJournals}
                className={errors.journal ? 'border-red-500' : ''}
              />
              {errors.journal && (
                <p className="text-sm text-red-600">{errors.journal.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Hash className="w-4 h-4" />
                رقم المرجع
              </label>
              <Input
                {...register('reference')}
                placeholder="سيتم التوليد تلقائياً"
                className="bg-gray-50"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4" />
                إجمالي المبلغ
              </label>
              <div className="text-lg font-bold text-blue-600 py-2">
                {formatNumber(totals.totalDebit)} ج.م
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              المذكرة / الوصف <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description', { required: 'الوصف مطلوب' })}
              placeholder="اكتب وصفاً واضحاً للعملية المحاسبية..."
              className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={2}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Journal Lines */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">بنود القيد المحاسبي</h3>
          </div>

          {/* Table Header */}
          <div className="bg-gray-100 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-semibold text-gray-700">
              <div className="col-span-4">الحساب</div>
              <div className="col-span-3">البيان</div>
              <div className="col-span-2">الشريك</div>
              <div className="col-span-1 text-center">مدين</div>
              <div className="col-span-1 text-center">دائن</div>
              <div className="col-span-1 text-center">إجراءات</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                {/* Account */}
                <div className="col-span-4">
                  <Select
                    placeholder="اختر الحساب..."
                    options={mockAccounts.map(acc => ({
                      value: acc.value,
                      label: `${acc.value} - ${acc.label}`
                    }))}
                    value={watchedLines[index]?.accountId || ''}
                    onChange={(e) => handleAccountSelect(index, e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Description */}
                <div className="col-span-3">
                  <Input
                    {...register(`lines.${index}.description`)}
                    placeholder="وصف البند..."
                    className="w-full"
                  />
                </div>

                {/* Partner */}
                <div className="col-span-2">
                  <Input
                    {...register(`lines.${index}.partner`)}
                    placeholder="الشريك..."
                    className="w-full"
                  />
                </div>

                {/* Debit Amount */}
                <div className="col-span-1">
                  <Input
                    {...register(`lines.${index}.debitAmount`, {
                      valueAsNumber: true,
                      onChange: (e) => handleAmountChange(index, 'debit', e.target.value)
                    })}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="text-center"
                    dir="ltr"
                  />
                </div>

                {/* Credit Amount */}
                <div className="col-span-1">
                  <Input
                    {...register(`lines.${index}.creditAmount`, {
                      valueAsNumber: true,
                      onChange: (e) => handleAmountChange(index, 'credit', e.target.value)
                    })}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="text-center"
                    dir="ltr"
                  />
                </div>

                {/* Actions */}
                <div className="col-span-1 text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLine(index)}
                    disabled={fields.length <= 2}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Line Button */}
          <div className="border-t border-gray-200 p-4">
            <Button
              type="button"
              variant="outline"
              onClick={addLine}
              className="w-full py-3 border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              إضافة بند جديد
            </Button>
          </div>

          {/* Totals */}
          <div className="bg-blue-50 border-t border-blue-200 px-6 py-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-9 flex items-center justify-end">
                <span className="text-lg font-semibold text-blue-900">الإجمالي:</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-lg font-bold text-blue-700">{formatNumber(totals.totalDebit)}</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-lg font-bold text-blue-700">{formatNumber(totals.totalCredit)}</span>
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Info className="w-4 h-4" />
            {currentStatus === 'draft' ? 'يمكن حفظ القيد كمسودة أو ترحيله مباشرة' : 'تم ترحيل القيد'}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              إلغاء
            </Button>

            {currentStatus === 'draft' && (
              <>
                <Button
                  type="submit"
                  disabled={!isValid || isLoading}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      حفظ كمسودة
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  disabled={!isValid || !totals.isBalanced || isPosting}
                  onClick={handlePost}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  {isPosting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري الترحيل...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      ترحيل القيد
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}