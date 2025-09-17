'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/FormInput';
import SearchableSelect from '@/components/SearchableSelect';
import DatePicker from '@/components/DatePicker';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import DropdownMenuComponent from '@/components/DropdownMenu';
import SkeletonLoader from '@/components/SkeletonLoader';
import ConfirmationModal from '@/components/ConfirmationModal';
import { theme } from '@/lib/theme';
import { toast } from 'sonner';
import { invoiceSchema, type InvoiceFormData } from '@/lib/validationSchemas';
import { useGlobalStore } from '@/stores/globalStore';

const mockInvoices = [
  { id: 1, customer: 'عميل 1', total: 5000, date: '2025-09-14' },
  { id: 2, customer: 'عميل 2', total: 3000, date: '2025-09-13' },
];
const mockCustomers = [
  { value: 'عميل 1', label: 'عميل 1' },
  { value: 'عميل 2', label: 'عميل 2' },
  { value: 'عميل 3', label: 'عميل 3' },
  { value: 'عميل 4', label: 'عميل 4' },
];

export default function SalesManagement() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const totalPages = 5;
  const { addNotification } = useGlobalStore();

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    mode: 'onChange',
    defaultValues: { customer: '', total: 0, email: '', date: '' },
  });

  const onSubmit: SubmitHandler<InvoiceFormData> = async (data) => {
    setLoading(true);
    // محاكاة API
    setTimeout(() => {
      toast.success('تم حفظ الفاتورة!', {
        description: JSON.stringify(data),
        action: { label: 'عرض', onClick: () => console.log('عرض') },
      });
      addNotification(`فاتورة جديدة لـ ${data.customer}`);
      form.reset();
      setLoading(false);
    }, 1000);
  };

  const filteredInvoices = mockInvoices.filter((invoice) =>
    invoice.customer.includes(searchQuery) || invoice.id.toString().includes(searchQuery)
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'رقم الفاتورة', width: 150, sortable: true },
    { field: 'customer', headerName: 'العميل', width: 200, sortable: true },
    { field: 'total', headerName: 'الإجمالي', width: 150, sortable: true },
    { field: 'date', headerName: 'التاريخ', width: 150, sortable: true },
    {
      field: 'actions',
      headerName: 'إجراءات',
      width: 100,
      renderCell: () => (
        <DropdownMenuComponent
          items={[
            { label: 'تعديل', onClick: () => toast.info('تعديل الفاتورة') },
            { label: 'حذف', onClick: () => toast.error('حذف الفاتورة') },
          ]}
        />
      ),
    },
  ];

  return (
    <Card style={{ ...theme.components.card }} className="m-4">
      <div className="flex justify-between items-center mb-4">
        <h1 style={theme.typography.heading_1}>إدارة المبيعات</h1>
        <div className="flex gap-4">
          <SearchBar onSearch={setSearchQuery} placeholder="ابحث عن فاتورة..." />
          <Dialog>
            <DialogTrigger asChild>
              <Button style={theme.components.button.primary}>إضافة فاتورة جديدة</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={theme.typography.heading_2}>إضافة فاتورة مبيعات</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <SearchableSelect name="customer" label="العميل" options={mockCustomers} required />
                  <FormInput name="total" label="الإجمالي" type="number" placeholder="أدخل المبلغ" required />
                  <FormInput name="email" label="البريد الإلكتروني" type="email" placeholder="أدخل البريد (اختياري)" />
                  <DatePicker name="date" label="تاريخ الفاتورة" required />
                  <Button
                    type="submit"
                    style={theme.components.button.primary}
                    disabled={form.formState.isSubmitting || form.formState.isValidating || loading}
                  >
                    {form.formState.isSubmitting || form.formState.isValidating || loading ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      'حفظ'
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {loading ? (
        <SkeletonLoader count={5} />
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredInvoices}
            columns={columns}
            disableRowSelectionOnClick
            sortingMode="client"
            filterMode="client"
            sx={{
              '& .MuiDataGrid-columnHeaders': { backgroundColor: theme.components.table.header_bg },
              '& .MuiDataGrid-cell': { borderBottom: theme.components.table.row_border },
            }}
          />
        </div>
      )}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </Card>
  );
}