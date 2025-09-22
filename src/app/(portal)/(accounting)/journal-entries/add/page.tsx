
"use client";

import { useState, useMemo, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { useToast, toast } from '@/components/ui/Toast';
import PageHeader from '@/components/ui/PageHeader';
import {
  Plus,
  Trash2,
  Save,
  Send,
  FileText,
  Search,
  X
} from 'lucide-react';

import { ChartAccount } from '../../../../../types/accounts-types';
import { Partner, mockPartners, partnerTypeLabels } from '../../../../../types/partner-types';
import { mockChartOfAccounts } from '@/lib/mockChartOfAccounts';

// فلترة الحسابات التي تسمح بالترحيل المباشر
const getPostableAccounts = (accounts: ChartAccount[]): ChartAccount[] => {
  const postableAccounts: ChartAccount[] = [];

  const processAccounts = (accountList: ChartAccount[]) => {
    accountList.forEach(account => {
      if (account.allowDirectPosting && account.isActive) {
        postableAccounts.push(account);
      }
      if (account.children) {
        processAccounts(account.children);
      }
    });
  };

  processAccounts(accounts);
  return postableAccounts.sort((a, b) => a.code.localeCompare(b.code));
};

interface JournalEntryLine {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  description: string;
  debit: number;
  credit: number;
  partnerId?: string;
  partnerCode?: string;
  partnerName?: string;
}

interface JournalEntryData {
  date: string;
  reference: string;
  description: string;
  lines: JournalEntryLine[];
}

// مكون اختيار الحساب القابل للبحث
interface AccountSelectorProps {
  value: string;
  onChange: (accountId: string, accountCode: string, accountName: string) => void;
  className?: string;
}

function AccountSelector({ value, onChange, className = "" }: AccountSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const postableAccounts = useMemo(() => getPostableAccounts(mockChartOfAccounts), []);

  const filteredAccounts = useMemo(() => {
    if (!searchTerm) return postableAccounts.slice(0, 20);

    const term = searchTerm.toLowerCase();
    return postableAccounts.filter(account =>
      account.code.toLowerCase().includes(term) ||
      account.name.toLowerCase().includes(term)
    ).slice(0, 20);
  }, [postableAccounts, searchTerm]);

  const selectedAccount = postableAccounts.find(account => account.id === value);

  const handleSelect = (account: ChartAccount) => {
    onChange(account.id, account.code, account.name);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputChange = (inputValue: string) => {
    setSearchTerm(inputValue);
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // تأخير إخفاء القائمة للسماح بالنقر على العناصر
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm || (selectedAccount ? `${selectedAccount.code} - ${selectedAccount.name}` : '')}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={handleInputBlur}
        placeholder="ابحث عن الحساب..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {isOpen && filteredAccounts.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
          {filteredAccounts.map((account) => (
            <div
              key={account.id}
              onMouseDown={() => handleSelect(account)} // استخدام onMouseDown بدلاً من onClick لتجنب مشاكل onBlur
              className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {account.code}
                </span>
                <span className="text-sm text-gray-700">{account.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// مكون اختيار الشريك القابل للبحث
interface PartnerSelectorProps {
  value: string;
  onChange: (partnerId: string, partnerCode: string, partnerName: string) => void;
  className?: string;
}

function PartnerSelector({ value, onChange, className = "" }: PartnerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPartners = useMemo(() => {
    if (!searchTerm) return mockPartners.filter(p => p.isActive).slice(0, 20);

    const term = searchTerm.toLowerCase();
    return mockPartners.filter(partner =>
      partner.isActive &&
      (partner.code.toLowerCase().includes(term) ||
       partner.name.toLowerCase().includes(term) ||
       partner.nameEn?.toLowerCase().includes(term))
    ).slice(0, 20);
  }, [searchTerm]);

  const selectedPartner = mockPartners.find(partner => partner.id === value);

  const handleSelect = (partner: Partner) => {
    onChange(partner.id, partner.code, partner.name);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputChange = (inputValue: string) => {
    setSearchTerm(inputValue);
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  const handleClear = () => {
    onChange('', '', '');
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm || (selectedPartner ? selectedPartner.name : '')}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={handleInputBlur}
        onDoubleClick={() => {
          if (selectedPartner) {
            handleClear();
          }
        }}
        placeholder="ابحث عن الشريك (اختياري)..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        title={selectedPartner ? "انقر مرتين لمسح الاختيار" : ""}
      />

      {isOpen && filteredPartners.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              onMouseDown={() => handleSelect(partner)}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
            >
              <span className="text-sm text-gray-700">{partner.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JournalEntryAddPage() {
  const [entryData, setEntryData] = useState<JournalEntryData>({
    date: new Date().toISOString().split('T')[0],
    reference: '',
    description: '',
    lines: [
      { id: '1', accountId: '', accountCode: '', accountName: '', description: '', debit: 0, credit: 0, partnerId: '', partnerCode: '', partnerName: '' },
      { id: '2', accountId: '', accountCode: '', accountName: '', description: '', debit: 0, credit: 0, partnerId: '', partnerCode: '', partnerName: '' }
    ]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  // حسابات التوازن
  const totalDebit = entryData.lines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = entryData.lines.reduce((sum, line) => sum + line.credit, 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  // إضافة بند جديد
  const addLine = () => {
    const newId = (entryData.lines.length + 1).toString();
    setEntryData(prev => ({
      ...prev,
      lines: [...prev.lines, {
        id: newId,
        accountId: '',
        accountCode: '',
        accountName: '',
        description: '',
        debit: 0,
        credit: 0,
        partnerId: '',
        partnerCode: '',
        partnerName: ''
      }]
    }));
  };

  // حذف بند
  const removeLine = (id: string) => {
    if (entryData.lines.length <= 2) return;
    setEntryData(prev => ({
      ...prev,
      lines: prev.lines.filter(line => line.id !== id)
    }));
  };

  // تحديث بند
  const updateLine = (id: string, field: keyof JournalEntryLine, value: any) => {
    setEntryData(prev => ({
      ...prev,
      lines: prev.lines.map(line =>
        line.id === id ? { ...line, [field]: value } : line
      )
    }));
  };

  // تحديث مبلغ مع منع إدخال مدين ودائن معاً
  const updateAmount = (id: string, type: 'debit' | 'credit', value: string) => {
    const numValue = parseFloat(value) || 0;
    setEntryData(prev => ({
      ...prev,
      lines: prev.lines.map(line => {
        if (line.id === id) {
          if (type === 'debit') {
            return { ...line, debit: numValue, credit: numValue > 0 ? 0 : line.credit };
          } else {
            return { ...line, credit: numValue, debit: numValue > 0 ? 0 : line.debit };
          }
        }
        return line;
      })
    }));
  };

  // حفظ كمسودة
  const saveDraft = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast(toast.success('تم الحفظ', 'تم حفظ القيد كمسودة'));
    } catch (error) {
      showToast(toast.error('خطأ', 'فشل في حفظ المسودة'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ترحيل القيد
  const postEntry = async () => {
    if (!isBalanced) {
      showToast(toast.error('خطأ', 'القيد غير متوازن'));
      return;
    }

    if (!entryData.description.trim()) {
      showToast(toast.error('خطأ', 'يجب إدخال وصف القيد'));
      return;
    }

    // التحقق من البنود
    const hasEmptyLines = entryData.lines.some(line =>
      !line.accountId || (line.debit === 0 && line.credit === 0)
    );

    if (hasEmptyLines) {
      showToast(toast.error('خطأ', 'يجب اختيار حساب وإدخال مبلغ لكل بند'));
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast(toast.success('نجح', 'تم ترحيل القيد بنجاح'));

      // إعادة تعيين النموذج
      setEntryData({
        date: new Date().toISOString().split('T')[0],
        reference: '',
        description: '',
        lines: [
          { id: '1', accountId: '', accountCode: '', accountName: '', description: '', debit: 0, credit: 0, partnerId: '', partnerCode: '', partnerName: '' },
          { id: '2', accountId: '', accountCode: '', accountName: '', description: '', debit: 0, credit: 0, partnerId: '', partnerCode: '', partnerName: '' }
        ]
      });
    } catch (error) {
      showToast(toast.error('خطأ', 'فشل في ترحيل القيد'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { label: 'المحاسبة', href: '/accounting' },
    { label: 'القيود اليومية', href: '/accounting/journal-entries' },
    { label: 'قيد جديد', icon: <Plus className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto">
        {/* رأس الصفحة */}
        <PageHeader
          title="قيد يومية جديد"
          description="إنشاء قيد محاسبي يدوي"
          breadcrumbItems={breadcrumbItems}
        />

        <div className="mt-6 space-y-6">
          {/* معلومات القيد الأساسية */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    التاريخ *
                  </label>
                  <Input
                    type="date"
                    value={entryData.date}
                    onChange={(e) => setEntryData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    رقم المرجع
                  </label>
                  <Input
                    value={entryData.reference}
                    onChange={(e) => setEntryData(prev => ({ ...prev, reference: e.target.value }))}
                    placeholder="رقم المرجع (اختياري)"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    رقم القيد
                  </label>
                  <Input
                    value="سيتم إنشاؤه تلقائياً"
                    disabled
                    className="bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  وصف القيد *
                </label>
                <textarea
                  value={entryData.description}
                  onChange={(e) => setEntryData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف القيد..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* جدول البنود */}
          <Card>
            <CardHeader>
              <CardTitle>بنود القيد</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">#</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الحساب</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الشريك</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">الوصف</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">مدين</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">دائن</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">عمليات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entryData.lines.map((line, index) => (
                      <tr key={line.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-medium text-gray-600">{index + 1}</span>
                        </td>

                        <td className="py-3 px-4" style={{width: '25%'}}>
                          <AccountSelector
                            value={line.accountId}
                            onChange={(accountId, accountCode, accountName) => {
                              updateLine(line.id, 'accountId', accountId);
                              updateLine(line.id, 'accountCode', accountCode);
                              updateLine(line.id, 'accountName', accountName);
                            }}
                          />
                        </td>

                        <td className="py-3 px-4" style={{width: '20%'}}>
                          <PartnerSelector
                            value={line.partnerId || ''}
                            onChange={(partnerId, partnerCode, partnerName) => {
                              updateLine(line.id, 'partnerId', partnerId);
                              updateLine(line.id, 'partnerCode', partnerCode);
                              updateLine(line.id, 'partnerName', partnerName);
                            }}
                          />
                        </td>

                        <td className="py-3 px-4" style={{width: '25%'}}>
                          <Input
                            value={line.description}
                            onChange={(e) => updateLine(line.id, 'description', e.target.value)}
                            placeholder="وصف البند"
                            className="w-full"
                          />
                        </td>

                        <td className="py-3 px-4" style={{width: '12%'}}>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={line.debit > 0 ? line.debit : ''}
                            onChange={(e) => updateAmount(line.id, 'debit', e.target.value)}
                            placeholder="0.00"
                            className="text-center"
                          />
                        </td>

                        <td className="py-3 px-4" style={{width: '12%'}}>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={line.credit > 0 ? line.credit : ''}
                            onChange={(e) => updateAmount(line.id, 'credit', e.target.value)}
                            placeholder="0.00"
                            className="text-center"
                          />
                        </td>

                        <td className="py-3 px-4 text-center">
                          {entryData.lines.length > 2 && (
                            <button
                              onClick={() => removeLine(line.id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                              title="حذف البند"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}

                    {/* صف زر إضافة بند */}
                    <tr className="border-b">
                      <td colSpan={7} className="py-2 px-4">
                        <Button
                          onClick={addLine}
                          variant="outline"
                          size="sm"
                          className="w-full border-dashed border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                        >
                          <Plus className="w-4 h-4 ml-2" />
                          إضافة بند جديد
                        </Button>
                      </td>
                    </tr>

                    {/* صف الإجماليات */}
                    <tr className="bg-gray-100 font-semibold">
                      <td colSpan={4} className="py-3 px-4 text-right">
                        الإجمالي
                      </td>
                      <td className="py-3 px-4 text-center text-green-600">
                        {totalDebit.toLocaleString()} ج.م
                      </td>
                      <td className="py-3 px-4 text-center text-red-600">
                        {totalCredit.toLocaleString()} ج.م
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isBalanced ? (
                          <Badge variant="success" size="sm">متوازن</Badge>
                        ) : (
                          <Badge variant="destructive" size="sm">غير متوازن</Badge>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* أزرار العمليات */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={saveDraft}
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4 ml-2" />
              حفظ كمسودة
            </Button>

            <Button
              onClick={postEntry}
              disabled={isSubmitting || !isBalanced}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="w-4 h-4 ml-2" />
              {isSubmitting ? 'جاري الترحيل...' : 'ترحيل القيد'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}