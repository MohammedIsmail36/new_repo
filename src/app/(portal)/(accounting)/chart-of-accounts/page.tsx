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
import { Badge, StatusBadge } from '@/components/ui/Badge';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { useToast, toast } from '@/components/ui/Toast';
import PageHeader from '@/components/ui/PageHeader';
import {
  PlusCircle,
  Edit,
  Trash2,
  Download,
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  BarChart3,
  RefreshCw,
  TreePine,
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus,
  Settings
} from 'lucide-react';

// Import types and mock data
import {
  ChartAccount,
  AccountType,
  AccountCategory,
  AccountFilters,
  AccountsStats
} from '../../../../types/accounts-types';
import {
  mockChartOfAccounts,
  mockAccountsStats,
  buildAccountTree,
  filterAccounts
} from '@/lib/mockChartOfAccounts';

// Colors based on account type
const accountTypeColors = {
  asset: 'bg-blue-50 text-blue-700 border-blue-200',
  liability: 'bg-red-50 text-red-700 border-red-200',
  equity: 'bg-purple-50 text-purple-700 border-purple-200',
  revenue: 'bg-green-50 text-green-700 border-green-200',
  expense: 'bg-orange-50 text-orange-700 border-orange-200',
  cost: 'bg-yellow-50 text-yellow-700 border-yellow-200'
};

// Icons based on account type
const accountTypeIcons = {
  asset: TrendingUp,
  liability: TrendingDown,
  equity: BarChart3,
  revenue: DollarSign,
  expense: Minus,
  cost: Calculator
};

// Translation of account types
const accountTypeLabels = {
  asset: 'الأصول',
  liability: 'الخصوم',
  equity: 'حقوق الملكية',
  revenue: 'الإيرادات',
  expense: 'المصروفات',
  cost: 'تكلفة المبيعات'
};

// Translation of account categories
const accountCategoryLabels = {
  'current-assets': 'الأصول المتداولة',
  'fixed-assets': 'الأصول الثابتة',
  'intangible-assets': 'الأصول غير الملموسة',
  'long-term-assets': 'الأصول طويلة الأجل',
  'current-liabilities': 'الخصوم المتداولة',
  'long-term-liabilities': 'الخصوم طويلة الأجل',
  'capital': 'رأس المال',
  'retained-earnings': 'الأرباح المحتجزة',
  'reserves': 'الاحتياطات',
  'sales-revenue': 'إيرادات المبيعات',
  'other-revenue': 'إيرادات أخرى',
  'financial-revenue': 'الإيرادات المالية',
  'operating-expenses': 'مصروفات تشغيلية',
  'administrative-expenses': 'مصروفات إدارية',
  'selling-expenses': 'مصروفات بيعية',
  'financial-expenses': 'مصروفات مالية',
  'cost-of-goods-sold': 'تكلفة البضاعة المباعة'
};

// Component for a single tree item
interface SimpleTreeItemProps {
  account: ChartAccount;
  level: number;
  isExpanded: boolean;
  expandedNodes: Set<string>;
  onToggleExpanded: (accountId: string) => void;
  onViewDetails: (account: ChartAccount) => void;
  showBalances: boolean;
  showCodes: boolean;
}

function SimpleTreeItem({
  account,
  level,
  isExpanded,
  expandedNodes,
  onToggleExpanded,
  onViewDetails,
  showBalances,
  showCodes
}: SimpleTreeItemProps) {
  const hasChildren = account.children && account.children.length > 0;
  const AccountIcon = accountTypeIcons[account.type];

  return (
    <>
      <div
        className={`group flex items-center py-3 px-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-all duration-150`}
        style={{ paddingRight: `${level * 24 + 16}px` }}
        onClick={() => {
          if (hasChildren) {
            onToggleExpanded(account.id);
          } else {
            onViewDetails(account);
          }
        }}
      >
        {/* expand/collapse button */}
        <div className="flex items-center w-6 mr-2">
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpanded(account.id);
              }}
              className="p-1 rounded hover:bg-gray-200 transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          ) : (
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            </div>
          )}
        </div>

        {/* Account type icon */}
        <div className="flex items-center mr-3">
          <div className={`p-1.5 rounded ${accountTypeColors[account.type]}`}>
            <AccountIcon className="w-4 h-4" />
          </div>
        </div>

        {/* كود الحساب */}
        {showCodes && (
          <div className="mr-3 min-w-[80px]">
            <span className="font-mono text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded text-center block">
              {account.code}
            </span>
          </div>
        )}

        {/* اسم الحساب */}
        <div className="flex-1 min-w-0 mr-4">
          <div className="flex items-center gap-3">
            <h3 className={`font-medium text-gray-900 truncate ${
              level === 0 ? 'text-lg font-semibold' :
              level === 1 ? 'text-base' : 'text-sm'
            }`}>
              {account.name}
            </h3>

            {/* بادج النوع */}
            <Badge
              variant={account.type === 'asset' ? 'default' :
                      account.type === 'liability' ? 'destructive' :
                      account.type === 'equity' ? 'secondary' :
                      account.type === 'revenue' ? 'success' : 'warning'}
              size="sm"
            >
              {accountTypeLabels[account.type]}
            </Badge>

            {/* حالة الحساب */}
            <StatusBadge
              status={account.isActive ? 'نشط' : 'غير نشط'}
              size="sm"
            />

            {/* عدد الفروع */}
            {hasChildren && (
              <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">
                {formatNumber(account.children!.length)} فرع
              </span>
            )}
          </div>

          {/* الاسم الانجليزي والوصف */}
          {(account.nameEn || account.description) && (
            <div className="mt-1 text-xs text-gray-500 truncate">
              {account.nameEn && <span>{account.nameEn}</span>}
              {account.nameEn && account.description && <span className="mx-2">•</span>}
              {account.description && <span>{account.description}</span>}
            </div>
          )}
        </div>

        {/* الرصيد مبسط */}
        {showBalances && (
          <div className="text-left ml-4 min-w-[100px]">
            <div className={`text-sm font-semibold ${
              account.balance > 0 ? 'text-green-600' :
              account.balance < 0 ? 'text-red-600' : 'text-gray-500'
            }`}>
              {formatCurrency(Math.abs(account.balance))}
            </div>
          </div>
        )}

        {/* أزرار العمليات */}
        <div className="ml-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(account);
            }}
            className="p-1 rounded hover:bg-blue-100 text-blue-600 transition-colors"
            title="عرض التفاصيل"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* الحسابات الفرعية */}
      {hasChildren && isExpanded && (
        <div>
          {account.children!.map((child) => (
            <SimpleTreeItem
              key={child.id}
              account={child}
              level={level + 1}
              isExpanded={expandedNodes.has(child.id)}
              expandedNodes={expandedNodes}
              onToggleExpanded={onToggleExpanded}
              onViewDetails={onViewDetails}
              showBalances={showBalances}
              showCodes={showCodes}
            />
          ))}
        </div>
      )}
    </>
  );
}

// تنسيق العملة المصرية
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0
  }).format(amount).replace('EGP', 'ج.م');
};

// تنسيق الأرقام بالإنجليزية
const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

// الصفحة الرئيسية
export default function ChartOfAccountsPage() {
  // الحالة
  const [accounts, setAccounts] = useState<ChartAccount[]>(mockChartOfAccounts);
  const [stats] = useState<AccountsStats>(mockAccountsStats);
  const [filters, setFilters] = useState<AccountFilters>({});
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', '2', '17', '24', '27', '32', '34']));
  const [showBalances, setShowBalances] = useState(true);
  const [showCodes, setShowCodes] = useState(true);
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('list');
  const [selectedAccount, setSelectedAccount] = useState<ChartAccount | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // حالات المودال والتوست الجديدة
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean; account: ChartAccount | null}>({isOpen: false, account: null});
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();



  // فلترة محسنة ومطابقة لنظام filterAccounts
  const filteredAccounts = useMemo(() => {
    const filtered = filterAccounts(accounts, filters);
    return buildAccountTree(filtered);
  }, [accounts, filters]);

  // قائمة مسطحة للجدول مع نفس منطق الفلترة
  const flatFilteredAccounts = useMemo(() => {
    return filterAccounts(accounts, filters);
  }, [accounts, filters]);


  // توسيع/طي العقد (محسن بـ useCallback)
  const toggleExpanded = useCallback((accountId: string) => {
    setExpandedNodes(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(accountId)) {
        newExpanded.delete(accountId);
      } else {
        newExpanded.add(accountId);
      }
      return newExpanded;
    });
  }, []);

  // التحقق من حالة التوسيع العامة
  const getAllExpandableIds = () => {
    const getAllIds = (accounts: ChartAccount[]): string[] => {
      let ids: string[] = [];
      for (const account of accounts) {
        if (account.hasChildren) {
          ids.push(account.id);
          if (account.children) {
            ids = ids.concat(getAllIds(account.children));
          }
        }
      }
      return ids;
    };
    return getAllIds(filteredAccounts);
  };

  const allExpandableIds = getAllExpandableIds();
  const isAllExpanded = allExpandableIds.every(id => expandedNodes.has(id));

  // دالة التبديل الذكي
  const toggleAllExpansion = () => {
    if (isAllExpanded) {
      // إذا كان الكل موسع، نطوي الكل
      setExpandedNodes(new Set());
    } else {
      // إذا لم يكن الكل موسع، نوسع الكل
      setExpandedNodes(new Set(allExpandableIds));
    }
  };

  // تحديث الفلاتر (محسن بـ useCallback)
  const updateFilters = useCallback((newFilters: Partial<AccountFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // العمليات
  const handleEdit = (account: ChartAccount) => {
    setSelectedAccount(account);
    // فتح نافذة التعديل
    console.log('Edit account:', account);
  };

  const handleDelete = (account: ChartAccount) => {
    setDeleteConfirm({ isOpen: true, account });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.account) return;

    setIsDeleting(true);
    try {
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAccounts(prev => prev.filter(acc => acc.id !== deleteConfirm.account!.id));

      showToast(toast.success(
        'تم حذف الحساب بنجاح',
        `تم حذف الحساب "${deleteConfirm.account.name}" نهائياً`,
        4000
      ));

      setDeleteConfirm({ isOpen: false, account: null });
    } catch {
      showToast(toast.error(
        'خطأ في حذف الحساب',
        'حدث خطأ أثناء حذف الحساب، يرجى المحاولة مرة أخرى',
        5000
      ));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewDetails = (account: ChartAccount) => {
    setSelectedAccount(account);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedAccount(null);
  };

  const handleAddAccount = () => {
    // فتح نافذة إضافة حساب جديد
    console.log('Add new account');
  };

  const handleExport = (format: string) => {
    console.log('Export as:', format);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // محاكاة تحديث البيانات
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const breadcrumbItems = [
    { label: 'المحاسبة', href: '/accounting' },
    { label: 'شجرة الحسابات', icon: <TreePine className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* رأس الصفحة مع Breadcrumb */}
      <PageHeader
        title="شجرة الحسابات"
        description="إدارة شاملة لدليل الحسابات والبيانات المحاسبية مع عرض تفاعلي للهيكل المحاسبي الكامل"
        breadcrumbItems={breadcrumbItems}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ml-2 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>

          <Button
            variant="secondary"
            onClick={() => handleExport('excel')}
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>

          <Button variant="default" onClick={handleAddAccount}>
            <PlusCircle className="w-4 h-4 ml-2" />
            حساب جديد
          </Button>
        </div>
      </PageHeader>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الحسابات</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatNumber(stats.totalAccounts)}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-600 font-medium">
                {stats.activeAccounts} نشط
              </span>
              <span className="text-gray-400 mx-2">•</span>
              <span className="text-red-600">
                {stats.inactiveAccounts} غير نشط
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الأرصدة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'EGP',
                    notation: 'compact'
                  }).format(stats.totalBalance).replace('EGP', 'ج.م')}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-600 font-medium">
                مدين: {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'EGP',
                  notation: 'compact'
                }).format(stats.totalDebits).replace('EGP', 'ج.م')}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-red-600 font-medium">
                دائن: {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'EGP',
                  notation: 'compact'
                }).format(stats.totalCredits).replace('EGP', 'ج.م')}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الأصول</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatNumber(stats.accountsByType.asset)}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <div>الخصوم: {formatNumber(stats.accountsByType.liability)}</div>
              <div>حقوق الملكية: {formatNumber(stats.accountsByType.equity)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الإيرادات والمصروفات</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatNumber(stats.accountsByType.revenue + stats.accountsByType.expense + stats.accountsByType.cost)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Calculator className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <div>إيرادات: {formatNumber(stats.accountsByType.revenue)}</div>
              <div>مصروفات: {formatNumber(stats.accountsByType.expense)}</div>
              <div>تكلفة: {formatNumber(stats.accountsByType.cost)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* شريط البحث والفلاتر المحسن */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        {/* البحث الرئيسي */}
        <div className="relative mb-5">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="🔍 البحث في دليل الحسابات..."
            value={filters.search || ''}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pr-12 h-11 text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
          />
          {filters.search && (
            <button
              onClick={() => updateFilters({ search: '' })}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>

        {/* الفلاتر السريعة في صف واحد */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <Select
            placeholder="نوع الحساب"
            value={filters.type || ''}
            onChange={(e) => updateFilters({ type: e.target.value as AccountType })}
            options={[
              { value: '', label: 'جميع الأنواع' },
              ...Object.entries(accountTypeLabels).map(([key, label]) => ({
                value: key,
                label: label
              }))
            ]}
          />

          <Select
            placeholder="الحالة"
            value={filters.status || ''}
            onChange={(e) => updateFilters({ status: e.target.value as 'active' | 'inactive' })}
            options={[
              { value: '', label: 'جميع الحالات' },
              { value: 'active', label: '✅ نشط' },
              { value: 'inactive', label: '❌ غير نشط' }
            ]}
          />

          <Select
            placeholder="مستوى الحساب"
            value={filters.level?.toString() || ''}
            onChange={(e) => {
              const value = e.target.value;
              updateFilters({ level: value && value !== '' ? parseInt(value) : undefined });
            }}
            options={[
              { value: '', label: 'جميع المستويات' },
              { value: '1', label: 'مستوى 1 - رئيسية' },
              { value: '2', label: 'مستوى 2 - فرعية' },
              { value: '3', label: 'مستوى 3 - تفصيلية' },
              { value: '4', label: 'مستوى 4 - نهائية' }
            ]}
          />

          <Select
            placeholder="فئة الحساب"
            value={filters.category || ''}
            onChange={(e) => updateFilters({ category: e.target.value as AccountCategory })}
            options={[
              { value: '', label: 'جميع الفئات' },
              ...Object.entries(accountCategoryLabels).map(([key, label]) => ({
                value: key,
                label: label
              }))
            ]}
          />
        </div>

        {/* خيارات العرض والتحكم */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100">
          {/* خيارات العرض */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={showBalances}
                onChange={(e) => setShowBalances(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300"
              />
              <span>💰 الأرصدة</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={showCodes}
                onChange={(e) => setShowCodes(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300"
              />
              <span>🏷️ الأكواد</span>
            </label>

            {/* فلتر خاص بالرصيد */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={filters.hasBalance === true}
                onChange={(e) => updateFilters({ hasBalance: e.target.checked || undefined })}
                className="w-4 h-4 text-green-600 rounded border-gray-300"
              />
              <span>📊 ذات رصيد فقط</span>
            </label>
          </div>

          {/* مؤشرات الفلترة */}
          <div className="flex items-center gap-3">
            {Object.keys(filters).length > 0 && (
              <>
                <span className="text-sm text-blue-600 font-medium">
                  🎯 {Object.keys(filters).length} فلتر نشط
                </span>
                <button
                  onClick={() => setFilters({})}
                  className="text-sm text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                >
                  مسح الكل
                </button>
              </>
            )}
          </div>
        </div>

      </div>

      {/* شجرة الحسابات */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2">
              <TreePine className="w-5 h-5 text-green-600" />
              دليل الحسابات
            </CardTitle>

            <div className="flex items-center gap-4">
              {/* أزرار نمط العرض - صغيرة واحترافية */}
              <div className="flex bg-gray-100 rounded-md p-0.5">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'list'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  قائمة
                </button>
                <button
                  onClick={() => setViewMode('tree')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'tree'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <TreePine className="w-3.5 h-3.5" />
                  شجرة
                </button>
              </div>

              {/* زر التوسيع/الطي الذكي للشجرة */}
              {viewMode === 'tree' && allExpandableIds.length > 0 && (
                <button
                  onClick={toggleAllExpansion}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700 hover:text-gray-900"
                >
                  {isAllExpanded ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      طي الكل
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      توسيع الكل
                    </>
                  )}
                </button>
              )}

              {/* عدد النتائج */}
              <div className="text-sm text-gray-600">
                <span>
                  عدد النتائج: {viewMode === 'tree' ? filteredAccounts.length : flatFilteredAccounts.length}
                  {Object.keys(filters).length > 0 && (
                    <span className="mr-2 text-blue-600">• مفلترة</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-gray-600">جاري تحديث البيانات...</span>
              </div>
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <TreePine className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                لا توجد حسابات تطابق المعايير المحددة
              </h3>
              <p className="text-gray-600 mb-6">
                جرب تعديل فلاتر البحث أو إضافة حسابات جديدة
              </p>
              <Button variant="default" onClick={handleAddAccount}>
                <PlusCircle className="w-4 h-4 ml-2" />
                إضافة حساب جديد
              </Button>
            </div>
          ) : viewMode === 'tree' ? (
            <div className="max-h-[700px] overflow-y-auto">
              <div className="border-t border-gray-200">
                {filteredAccounts.map((account) => (
                  <SimpleTreeItem
                    key={account.id}
                    account={account}
                    level={0}
                    isExpanded={expandedNodes.has(account.id)}
                    expandedNodes={expandedNodes}
                    onToggleExpanded={toggleExpanded}
                    onViewDetails={handleViewDetails}
                    showBalances={showBalances}
                    showCodes={showCodes}
                  />
                ))}
              </div>
            </div>
          ) : (
            // عرض القائمة الجدولي
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {showCodes && (
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        كود الحساب
                      </th>
                    )}
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      اسم الحساب
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      النوع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الفئة
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المستوى
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    {showBalances && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الرصيد
                      </th>
                    )}
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العمليات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {flatFilteredAccounts.map((account) => (
                    <tr
                      key={account.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      {showCodes && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono text-sm font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">
                            {account.code}
                          </span>
                        </td>
                      )}

                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${accountTypeColors[account.type]} shadow-sm ml-3`}>
                            {(() => {
                              const AccountIcon = accountTypeIcons[account.type];
                              return <AccountIcon className="w-4 h-4" />;
                            })()}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {account.name}
                            </div>
                            {account.nameEn && (
                              <div className="text-xs text-gray-500">
                                {account.nameEn}
                              </div>
                            )}
                            {account.description && (
                              <div className="text-xs text-gray-600 mt-1 max-w-xs truncate">
                                {account.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={account.type === 'asset' ? 'default' :
                                  account.type === 'liability' ? 'destructive' :
                                  account.type === 'equity' ? 'secondary' :
                                  account.type === 'revenue' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {accountTypeLabels[account.type]}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {accountCategoryLabels[account.category]}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Badge variant="outline" size="sm">
                          مستوى {formatNumber(account.level)}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex flex-col items-center gap-1">
                          <StatusBadge
                            status={account.isActive ? 'نشط' : 'غير نشط'}
                            size="sm"
                          />
                          {account.isSystem && (
                            <Badge variant="secondary" size="sm">
                              🔒 نظام
                            </Badge>
                          )}
                        </div>
                      </td>

                      {showBalances && (
                        <td className="px-6 py-4 whitespace-nowrap text-left">
                          <div className="bg-white rounded-lg p-2 shadow-sm border">
                            <div className={`font-bold text-sm ${
                              account.balance > 0 ? 'text-green-600' :
                              account.balance < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {formatCurrency(Math.abs(account.balance))}
                            </div>
                            {account.balance !== 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                <div>مدين: {formatCurrency(account.debitBalance)}</div>
                                <div>دائن: {formatCurrency(account.creditBalance)}</div>
                              </div>
                            )}
                          </div>
                        </td>
                      )}

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleViewDetails(account)}
                            className="p-2 rounded hover:bg-blue-100 text-blue-600 transition-colors"
                            title="عرض التفاصيل"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {!account.isSystem && (
                            <>
                              <button
                                onClick={() => handleEdit(account)}
                                className="p-2 rounded hover:bg-blue-100 text-blue-600 transition-colors"
                                title="تعديل"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDelete(account)}
                                className="p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
                                title="حذف"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ملخص سريع */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-full">
                <BarChart3 className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">ملخص دليل الحسابات</h3>
                <p className="text-gray-600">آخر تحديث: {stats.lastUpdated.toLocaleDateString('en-GB')}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.accountsByType.asset}
                </div>
                <div className="text-sm text-gray-600">الأصول</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stats.accountsByType.liability}
                </div>
                <div className="text-sm text-gray-600">الخصوم</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.accountsByType.equity}
                </div>
                <div className="text-sm text-gray-600">حقوق الملكية</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.accountsByType.revenue}
                </div>
                <div className="text-sm text-gray-600">الإيرادات</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {stats.accountsByType.expense}
                </div>
                <div className="text-sm text-gray-600">المصروفات</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* مودال تفاصيل الحساب */}
      {showDetailsModal && selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* خلفية */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeDetailsModal}
          />

          {/* المودال */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
            {/* رأس المودال */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${accountTypeColors[selectedAccount.type]}`}>
                    {(() => {
                      const AccountIcon = accountTypeIcons[selectedAccount.type];
                      return <AccountIcon className="w-6 h-6" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedAccount.name}</h2>
                    <p className="text-sm text-gray-500">كود الحساب: {selectedAccount.code}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge
                    status={selectedAccount.isActive ? 'نشط' : 'غير نشط'}
                    size="sm"
                  />
                  <button
                    onClick={closeDetailsModal}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* محتوى المودال */}
            <div className="p-6">
              {/* بطاقات المعلومات */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* الأرصدة */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">الرصيد الحالي</h3>
                  </div>
                  <div className={`text-2xl font-bold mb-2 ${
                    selectedAccount.balance > 0 ? 'text-green-600' :
                    selectedAccount.balance < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {formatCurrency(Math.abs(selectedAccount.balance))}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">مدين:</span>
                      <span className="text-green-600 font-medium">
                        {formatCurrency(selectedAccount.debitBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">دائن:</span>
                      <span className="text-red-600 font-medium">
                        {formatCurrency(selectedAccount.creditBalance)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* معلومات الحساب */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">معلومات أساسية</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">النوع:</span>
                      <Badge variant="default" size="sm" className="mr-2">
                        {accountTypeLabels[selectedAccount.type]}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-600">الفئة:</span>
                      <span className="mr-2 font-medium">{accountCategoryLabels[selectedAccount.category]}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">المستوى:</span>
                      <Badge variant="outline" size="sm" className="mr-2">
                        مستوى {formatNumber(selectedAccount.level)}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-600">العملة:</span>
                      <span className="mr-2 font-medium">{selectedAccount.currency}</span>
                    </div>
                  </div>
                </div>

                {/* إعدادات الحساب */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Settings className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">إعدادات</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">حساب نظام:</span>
                      <span className={`font-medium ${
                        selectedAccount.isSystem ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {selectedAccount.isSystem ? 'نعم 🔒' : 'لا'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">يسمح بالترحيل:</span>
                      <span className={`font-medium ${
                        selectedAccount.allowDirectPosting ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {selectedAccount.allowDirectPosting ? 'نعم' : 'لا'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">له حسابات فرعية:</span>
                      <span className={`font-medium ${
                        selectedAccount.hasChildren ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {selectedAccount.hasChildren ? `نعم (${formatNumber(selectedAccount.children?.length || 0)})` : 'لا'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* وصف الحساب */}
              {selectedAccount.description && (
                <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    وصف الحساب
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedAccount.description}</p>
                </div>
              )}

              {/* العلامات */}
              {selectedAccount.tags && selectedAccount.tags.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    العلامات
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAccount.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" size="sm" className="bg-blue-100 text-blue-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* معلومات التواريخ */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900 mb-1">تاريخ الإنشاء</div>
                    <div>{new Date(selectedAccount.createdAt).toLocaleDateString('en-GB')}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900 mb-1">آخر تحديث</div>
                    <div>{new Date(selectedAccount.updatedAt).toLocaleDateString('en-GB')}</div>
                  </div>
                  {selectedAccount.lastTransactionDate && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="font-medium text-gray-900 mb-1">آخر معاملة</div>
                      <div>{new Date(selectedAccount.lastTransactionDate).toLocaleDateString('en-GB')}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* أزرار العمليات */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {!selectedAccount.isSystem && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => {
                          handleEdit(selectedAccount);
                          closeDetailsModal();
                        }}
                      >
                        <Edit className="w-4 h-4 ml-2" />
                        تعديل الحساب
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          handleDelete(selectedAccount);
                          closeDetailsModal();
                        }}
                      >
                        <Trash2 className="w-4 h-4 ml-2" />
                        حذف الحساب
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeDetailsModal}
                >
                  إغلاق
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* مودال تأكيد الحذف العصري */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, account: null })}
        onConfirm={confirmDelete}
        title="حذف الحساب"
        message={`هل أنت متأكد من حذف الحساب "${deleteConfirm.account?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="حذف"
        cancelText="إلغاء"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
