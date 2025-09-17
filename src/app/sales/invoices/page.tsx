"use client";

import { useState, useMemo } from 'react';
import { PlusCircle, Edit, Trash2, FileText, Download, Filter, Search, Calendar, DollarSign, ChevronUp, ChevronDown, MoreHorizontal, CheckSquare, Square, Eye } from 'lucide-react';

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
  },
  {
    id: 5,
    invoice_number: "INV18SS/2025/00005",
    issue_date: "2025-09-12",
    due_date: "2025-10-12",
    total_amount: 2100.00,
    paid_amount: 1000.00,
    remaining_amount: 1100.00,
    status: "غير مدفوع",
    client_name: "شركة التقنية الحديثة",
    client_phone: "55998877",
    client_country: "SA",
    items_count: 5,
    currency: "SAR",
    vat_amount: 273.00,
    subtotal: 1827.00,
    payment_method: "تحويل بنكي",
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

// مكونات UI بسيطة
const Badge = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    outline: "border border-gray-200 bg-white text-gray-700"
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "default", size = "md", className = "", onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
);

const Select = ({ children, value, onValueChange, className = "" }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${className}`}
    >
      {children}
    </select>
  );
};

const SelectItem = ({ children, value }) => (
  <option value={value}>{children}</option>
);

// دوال مساعدة
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    timeZone: 'Asia/Riyadh'
  };
  return date.toLocaleDateString('ar-SA', options);
};

const formatAmount = (amount, currency = "SAR") => {
  return `${amount.toFixed(2)} ${currency}`;
};

// مكون حالة الفاتورة
const StatusBadge = ({ status, isReversed = false }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'مدفوع':
        return { variant: 'success', icon: '✓' };
      case 'غير مدفوع':
        return { variant: 'danger', icon: '×' };
      case 'متأخر':
        return { variant: 'warning', icon: '!' };
      case 'ملغى':
        return { variant: 'default', icon: '⊘' };
      default:
        return { variant: 'default', icon: '?' };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <div className="flex items-center gap-2">
      <Badge variant={config.variant} className="flex items-center gap-1">
        <span>{config.icon}</span>
        {status}
      </Badge>
      {isReversed && (
        <Badge className="bg-orange-100 text-orange-800 border border-orange-200">
          مسترد
        </Badge>
      )}
    </div>
  );
};

// مكون الإجراءات
const ActionsDropdown = ({ invoice }) => {
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
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                console.log('عرض:', invoice.invoice_number);
                setIsOpen(false);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              عرض
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                console.log('تعديل:', invoice.invoice_number);
                setIsOpen(false);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              تعديل
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                console.log('تحميل:', invoice.invoice_number);
                setIsOpen(false);
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              تحميل PDF
            </button>
            <hr className="my-1" />
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => {
                console.log('حذف:', invoice.invoice_number);
                setIsOpen(false);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              حذف
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function EnhancedInvoices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [sortBy, setSortBy] = useState('issue_date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // الفلترة والترتيب
  const filteredAndSortedInvoices = useMemo(() => {
    let filtered = mockInvoices.filter((invoice) => {
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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const toggleSelectInvoice = (invoiceId) => {
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
    <div className="p-6 max-w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الفواتير</h1>
            <p className="text-gray-600">إدارة ومتابعة فواتير المبيعات والمدفوعات</p>
          </div>
          <Button className="flex items-center gap-2 shadow-md">
            <PlusCircle className="h-5 w-5" />
            إضافة فاتورة جديدة
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-r-4 border-r-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الفواتير</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalInvoices}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-r-4 border-r-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">المبلغ المدفوع</p>
                  <p className="text-2xl font-bold text-green-600">{formatAmount(stats.paidAmount)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-r-4 border-r-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">المبلغ المعلق</p>
                  <p className="text-2xl font-bold text-yellow-600">{formatAmount(stats.pendingAmount)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-r-4 border-r-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي المبيعات</p>
                  <p className="text-2xl font-bold text-purple-600">{formatAmount(stats.totalAmount)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث برقم الفاتورة، اسم العميل أو رقم الهاتف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 pl-4"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                الفلاتر
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">طريقة الدفع</label>
                    <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                      {paymentMethodOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right">
                    <button
                      onClick={toggleSelectAll}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {selectedInvoices.size === paginatedInvoices.length ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
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
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
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
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('issue_date')}
                  >
                    <div className="flex items-center gap-2">
                      تاريخ الإصدار
                      {sortBy === 'issue_date' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الاستحقاق
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('total_amount')}
                  >
                    <div className="flex items-center gap-2">
                      المبلغ الإجمالي
                      {sortBy === 'total_amount' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ المدفوع
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-2">
                      الحالة
                      {sortBy === 'status' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    طريقة الدفع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedInvoices.map((invoice) => {
                  const dueDate = new Date(invoice.due_date);
                  const today = new Date();
                  const isOverdue = dueDate < today && invoice.status !== 'مدفوع';
                  
                  return (
                    <tr 
                      key={invoice.id}
                      className={`hover:bg-gray-50 ${selectedInvoices.has(invoice.id) ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleSelectInvoice(invoice.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {selectedInvoices.has(invoice.id) ? (
                            <CheckSquare className="h-4 w-4" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                            {invoice.invoice_number}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{invoice.client_name}</span>
                          <span className="text-xs text-gray-500">{invoice.client_phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">{formatDate(invoice.issue_date)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center gap-2 ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                          <Calendar className={`w-4 h-4 ${isOverdue ? 'text-red-500' : 'text-gray-500'}`} />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {formatDate(invoice.due_date)}
                            </span>
                            {isOverdue && (
                              <span className="text-xs text-red-500 font-medium">متأخر</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-medium">
                          <DollarSign className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-900">{formatAmount(invoice.total_amount, invoice.currency)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 font-medium">
                            <DollarSign className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-900">{formatAmount(invoice.paid_amount, invoice.currency)}</span>
                          </div>
                          {invoice.remaining_amount > 0 && (
                            <span className="text-xs text-red-500 font-medium">
                              متبقي: {formatAmount(invoice.remaining_amount, invoice.currency)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={invoice.status} isReversed={invoice.is_reversed} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline" className="text-xs">
                          {invoice.payment_method}
                        </Badge>
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
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                <p className="text-sm text-gray-700">
                  عرض <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span> إلى{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * pageSize, filteredAndSortedInvoices.length)}
                  </span>{' '}
                  من <span className="font-medium">{filteredAndSortedInvoices.length}</span> نتيجة
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">صفوف لكل صفحة:</label>
                <Select 
                  value={pageSize.toString()} 
                  onValueChange={(value) => {
                    setPageSize(parseInt(value));
                    setCurrentPage(1);
                  }}
                  className="w-20"
                >
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </Select>
                
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mr-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            isCurrentPage
                              ? 'z-10 bg-blue-600 border-blue-600 text-white'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              تم تحديد {selectedInvoices.size} فاتورة
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                تصدير
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                تحرير مجمع
              </Button>
              <Button size="sm" variant="danger" className="flex items-center gap-1">
                <Trash2 className="h-4 w-4" />
                حذف
              </Button>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setSelectedInvoices(new Set())}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}