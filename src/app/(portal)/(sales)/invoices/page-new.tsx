"use client";

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import {
  PlusCircle,
  Edit,
  Trash2,
  Download,
  Filter,
  Search,
  Calendar,
  DollarSign,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  CheckSquare,
  Square,
  Eye,
  FileText
} from 'lucide-react';

// بيانات تجريبية محسنة
const mockInvoices = [
  {
    id: 1,
    invoice_number: "INV18SS/2025/00001",
    issue_date: "2025-09-04",
    due_date: "2025-10-04",
    total_amount: 368.00,
    paid_amount: 368.00,
    remaining_amount: 0.00,
    status: "مدفوع",
    client_name: "Deco Addict",
    client_phone: "12345673",
    client_country: "US",
    items_count: 1,
    currency: "SAR",
    vat_amount: 48.00,
    subtotal: 320.00,
    payment_method: "تحويل بنكي",
    is_reversed: true,
    reversal_date: "2025-09-04"
  },
  {
    id: 2,
    invoice_number: "INV18SS/2025/00002",
    issue_date: "2025-09-05",
    due_date: "2025-11-05",
    total_amount: 500.00,
    paid_amount: 0.00,
    remaining_amount: 500.00,
    status: "غير مدفوع",
    client_name: "Tech Corp",
    client_phone: "98765432",
    client_country: "SA",
    items_count: 2,
    currency: "SAR",
    vat_amount: 65.00,
    subtotal: 435.00,
    payment_method: "كاش",
    is_reversed: false,
    reversal_date: null
  },
  {
    id: 3,
    invoice_number: "INV18SS/2025/00003",
    issue_date: "2025-08-15",
    due_date: "2025-09-15",
    total_amount: 1250.00,
    paid_amount: 500.00,
    remaining_amount: 750.00,
    status: "متأخر",
    client_name: "شركة الأحلام",
    client_phone: "55512345",
    client_country: "SA",
    items_count: 3,
    currency: "SAR",
    vat_amount: 162.50,
    subtotal: 1087.50,
    payment_method: "بطاقة ائتمان",
    is_reversed: false,
    reversal_date: null
  },
  {
    id: 4,
    invoice_number: "INV18SS/2025/00004",
    issue_date: "2025-09-10",
    due_date: "2025-10-10",
    total_amount: 890.00,
    paid_amount: 890.00,
    remaining_amount: 0.00,
    status: "مدفوع",
    client_name: "مؤسسة النجاح",
    client_phone: "50012345",
    client_country: "SA",
    items_count: 4,
    currency: "SAR",
    vat_amount: 115.70,
    subtotal: 774.30,
    payment_method: "شيك",
    is_reversed: false,
    reversal_date: null
  }
];

const statusOptions = [
  { value: "", label: "جميع الحالات" },
  { value: "مدفوع", label: "مدفوع" },
  { value: "غير مدفوع", label: "غير مدفوع" },
  { value: "متأخر", label: "متأخر" },
  { value: "ملغى", label: "ملغى" }
];

const sortOptions = [
  { value: "issue_date", label: "تاريخ الإصدار" },
  { value: "total_amount", label: "المبلغ الإجمالي" },
  { value: "status", label: "الحالة" },
  { value: "client_name", label: "اسم العميل" }
];

const paymentMethodOptions = [
  { value: "", label: "جميع طرق الدفع" },
  { value: "كاش", label: "كاش" },
  { value: "تحويل بنكي", label: "تحويل بنكي" },
  { value: "بطاقة ائتمان", label: "بطاقة ائتمان" },
  { value: "شيك", label: "شيك" }
];

// مكون الإجراءات
interface InvoiceType {
  id: number;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  status: string;
  client_name: string;
  client_phone: string;
  client_country: string;
  items_count: number;
  currency: string;
  vat_amount: number;
  subtotal: number;
  payment_method: string;
  is_reversed: boolean;
  reversal_date: string | null;
}

const ActionsDropdown = ({ invoice }: { invoice: InvoiceType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-secondary-200 z-10 animate-fade-in">
          <div className="py-1">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
              onClick={() => {
                console.log('عرض:', invoice.invoice_number);
                setIsOpen(false);
              }}
            >
              <Eye className="h-4 w-4 ml-2" />
              عرض
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
              onClick={() => {
                console.log('تعديل:', invoice.invoice_number);
                setIsOpen(false);
              }}
            >
              <Edit className="h-4 w-4 ml-2" />
              تعديل
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
              onClick={() => {
                console.log('تحميل:', invoice.invoice_number);
                setIsOpen(false);
              }}
            >
              <Download className="h-4 w-4 ml-2" />
              تحميل PDF
            </button>
            <hr className="my-1" />
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
              onClick={() => {
                console.log('حذف:', invoice.invoice_number);
                setIsOpen(false);
              }}
            >
              <Trash2 className="h-4 w-4 ml-2" />
              حذف
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// دوال مساعدة
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Riyadh'
  };
  return date.toLocaleDateString('ar-SA', options);
};

const formatAmount = (amount: number, currency = "SAR") => {
  return `${amount.toFixed(2)} ${currency}`;
};

export default function ModernInvoices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [sortBy, setSortBy] = useState('issue_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState(new Set<number>());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // الفلترة والترتيب
  const filteredAndSortedInvoices = useMemo(() => {
    const filtered = mockInvoices.filter((invoice) => {
      const matchesSearch = searchQuery === '' ||
        invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.client_phone.includes(searchQuery);

      const matchesStatus = statusFilter === '' || invoice.status === statusFilter;
      const matchesPaymentMethod = paymentMethodFilter === '' || invoice.payment_method === paymentMethodFilter;

      return matchesSearch && matchesStatus && matchesPaymentMethod;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'total_amount':
          comparison = a.total_amount - b.total_amount;
          break;
        case 'issue_date':
          comparison = new Date(a.issue_date).getTime() - new Date(b.issue_date).getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'client_name':
          comparison = a.client_name.localeCompare(b.client_name);
          break;
        default:
          return 0;
      }

      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }, [searchQuery, statusFilter, paymentMethodFilter, sortBy, sortDirection]);

  const paginatedInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedInvoices.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedInvoices, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedInvoices.length / pageSize);

  const stats = useMemo(() => {
    const totalInvoices = filteredAndSortedInvoices.length;
    const totalAmount = filteredAndSortedInvoices.reduce((sum, inv) => sum + inv.total_amount, 0);
    const paidAmount = filteredAndSortedInvoices.reduce((sum, inv) => sum + inv.paid_amount, 0);
    const pendingAmount = filteredAndSortedInvoices.reduce((sum, inv) => sum + inv.remaining_amount, 0);

    return { totalInvoices, totalAmount, paidAmount, pendingAmount };
  }, [filteredAndSortedInvoices]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const toggleSelectInvoice = (invoiceId: number) => {
    const newSelected = new Set(selectedInvoices);
    if (newSelected.has(invoiceId)) {
      newSelected.delete(invoiceId);
    } else {
      newSelected.add(invoiceId);
    }
    setSelectedInvoices(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedInvoices.size === paginatedInvoices.length) {
      setSelectedInvoices(new Set());
    } else {
      setSelectedInvoices(new Set(paginatedInvoices.map(inv => inv.id)));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">إدارة الفواتير</h1>
            <p className="text-secondary">إدارة ومتابعة فواتير المبيعات والمدفوعات</p>
          </div>
          <Button
            leftIcon={<PlusCircle className="h-5 w-5" />}
            className="hover-lift"
          >
            إضافة فاتورة جديدة
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card variant="elevated" hover className="animate-fade-in border-r-4 border-r-primary-500" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary">إجمالي الفواتير</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalInvoices}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" hover className="animate-fade-in border-r-4 border-r-success-500" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary">المبلغ المدفوع</p>
                  <p className="text-2xl font-bold text-success-600">{formatAmount(stats.paidAmount)}</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-success-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" hover className="animate-fade-in border-r-4 border-r-warning-500" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary">المبلغ المعلق</p>
                  <p className="text-2xl font-bold text-warning-600">{formatAmount(stats.pendingAmount)}</p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-warning-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" hover className="animate-fade-in border-r-4 border-r-secondary-500" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary">إجمالي المبيعات</p>
                  <p className="text-2xl font-bold text-secondary-600">{formatAmount(stats.totalAmount)}</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-secondary-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1">
              <Input
                placeholder="البحث برقم الفاتورة، اسم العميل أو رقم الهاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="h-4 w-4" />}
            >
              الفلاتر
            </Button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-secondary-200 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="الحالة"
                  options={statusOptions}
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                />

                <Select
                  label="طريقة الدفع"
                  options={paymentMethodOptions}
                  value={paymentMethodFilter}
                  onValueChange={setPaymentMethodFilter}
                />

                <Select
                  label="ترتيب حسب"
                  options={sortOptions}
                  value={sortBy}
                  onValueChange={setSortBy}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSelectAll}
                      className="text-primary-600 hover:text-primary-800 p-0"
                    >
                      {selectedInvoices.size === paginatedInvoices.length ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </Button>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors"
                    onClick={() => handleSort('invoice_number')}
                  >
                    <div className="flex items-center gap-2">
                      رقم الفاتورة
                      {sortBy === 'invoice_number' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors"
                    onClick={() => handleSort('client_name')}
                  >
                    <div className="flex items-center gap-2">
                      العميل
                      {sortBy === 'client_name' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors"
                    onClick={() => handleSort('issue_date')}
                  >
                    <div className="flex items-center gap-2">
                      تاريخ الإصدار
                      {sortBy === 'issue_date' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    تاريخ الاستحقاق
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors"
                    onClick={() => handleSort('total_amount')}
                  >
                    <div className="flex items-center gap-2">
                      المبلغ الإجمالي
                      {sortBy === 'total_amount' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {paginatedInvoices.map((invoice) => {
                  const dueDate = new Date(invoice.due_date);
                  const today = new Date();
                  const isOverdue = dueDate < today && invoice.status !== 'مدفوع';

                  return (
                    <tr
                      key={invoice.id}
                      className={`hover:bg-secondary-50 transition-colors ${selectedInvoices.has(invoice.id) ? 'bg-primary-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSelectInvoice(invoice.id)}
                          className="text-primary-600 hover:text-primary-800 p-0"
                        >
                          {selectedInvoices.has(invoice.id) ? (
                            <CheckSquare className="h-4 w-4" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </Button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary-600" />
                          <span className="text-primary-600 hover:text-primary-800 cursor-pointer font-medium transition-colors">
                            {invoice.invoice_number}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium text-primary">{invoice.client_name}</span>
                          <span className="text-xs text-secondary">{invoice.client_phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-secondary-500" />
                          <span className="text-sm font-medium">{formatDate(invoice.issue_date)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center gap-2 ${isOverdue ? 'text-error-600' : 'text-primary'}`}>
                          <Calendar className={`w-4 h-4 ${isOverdue ? 'text-error-500' : 'text-secondary-500'}`} />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {formatDate(invoice.due_date)}
                            </span>
                            {isOverdue && (
                              <Badge variant="error" size="xs">
                                متأخر
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 font-medium">
                            <DollarSign className="w-3 h-3 text-secondary-500" />
                            <span className="text-primary">{formatAmount(invoice.total_amount, invoice.currency)}</span>
                          </div>
                          {invoice.remaining_amount > 0 && (
                            <span className="text-xs text-error-500 font-medium">
                              متبقي: {formatAmount(invoice.remaining_amount, invoice.currency)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge
                          status={invoice.status as 'مدفوع' | 'غير مدفوع' | 'متأخر' | 'ملغى'}
                          isReversed={invoice.is_reversed}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ActionsDropdown invoice={invoice} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-secondary-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                السابق
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                التالي
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-secondary">
                  عرض <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span> إلى{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * pageSize, filteredAndSortedInvoices.length)}
                  </span>{' '}
                  من <span className="font-medium">{filteredAndSortedInvoices.length}</span> نتيجة
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  options={[
                    { value: "5", label: "5" },
                    { value: "10", label: "10" },
                    { value: "25", label: "25" },
                    { value: "50", label: "50" }
                  ]}
                  value={pageSize.toString()}
                  onValueChange={(value) => {
                    setPageSize(parseInt(value));
                    setCurrentPage(1);
                  }}
                />

                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mr-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    size="sm"
                  >
                    السابق
                  </Button>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;

                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={isCurrentPage ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                          size="sm"
                        >
                          {page}
                        </Button>
                      );
                    }
                    return null;
                  })}

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    size="sm"
                  >
                    التالي
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Actions */}
      {selectedInvoices.size > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-secondary-200 p-4 animate-slide-in-right">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-primary">
              تم تحديد {selectedInvoices.size} فاتورة
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                leftIcon={<Download className="h-4 w-4" />}
              >
                تصدير
              </Button>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<Edit className="h-4 w-4" />}
              >
                تحرير مجمع
              </Button>
              <Button
                size="sm"
                variant="danger"
                leftIcon={<Trash2 className="h-4 w-4" />}
              >
                حذف
              </Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedInvoices(new Set())}
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}