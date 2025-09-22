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
import { theme } from '@/lib/theme';
import { toast } from 'sonner';
import { paymentSchema, type PaymentFormData } from '@/lib/validationSchemas';

const mockPayments = [
  { id: 1, supplier: 'مورد 1', amount: 1500, date: '2025-09-14' },
];

const mockSuppliers = [
  { value: 'مورد 1', label: 'مورد 1' },
  { value: 'مورد 2', label: 'مورد 2' },
];

export default function Payments() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const totalPages = 5;

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange',
    defaultValues: { supplier: '', amount: 0, date: '' },
  });

  const onSubmit: SubmitHandler<PaymentFormData> = async (data) => {
    toast.success('تم إضافة سند الصرف!');
    form.reset();
  };

  const filteredPayments = mockPayments.filter((payment) =>
    payment.supplier.includes(searchQuery)
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'رقم السند', width: 150 },
    { field: 'supplier', headerName: 'المورد', width: 200 },
    { field: 'amount', headerName: 'المبلغ', width: 150 },
    { field: 'date', headerName: 'التاريخ', width: 150 },
    {
      field: 'actions',
      headerName: 'إجراءات',
      width: 100,
      renderCell: () => (
        <DropdownMenuComponent
          items={[
            { label: 'تعديل', onClick: () => toast.info('تعديل السند') },
            { label: 'حذف', onClick: () => toast.error('حذف السند') },
          ]}
        />
      ),
    },
  ];

  return (
    <Card style={{ ...theme.components.card }} className="m-4">
      <div className="flex justify-between items-center mb-4">
        <h1 style={theme.typography.heading_1}>سندات الصرف</h1>
        <div className="flex gap-4">
          <SearchBar onSearch={setSearchQuery} placeholder="ابحث عن سند..." />
          <Dialog>
            <DialogTrigger asChild>
              <Button style={theme.components.button.primary}>إضافة سند صرف جديد</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={theme.typography.heading_2}>إضافة سند صرف</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <SearchableSelect name="supplier" label="المورد" options={mockSuppliers} required />
                  <FormInput name="amount" label="المبلغ" type="number" placeholder="أدخل المبلغ" required />
                  <DatePicker name="date" label="التاريخ" required />
                  <Button type="submit" style={theme.components.button.primary}>حفظ</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={filteredPayments} columns={columns} />
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </Card>
  );
}