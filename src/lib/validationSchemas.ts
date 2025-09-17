import { z } from 'zod';
import { checkCustomerExists, checkEmailUnique } from './mockApi';

export const invoiceSchema = z.object({
  customer: z.string().min(1, { message: 'يجب اختيار عميل' }).refine(async (value) => await checkCustomerExists(value), { message: 'العميل غير موجود' }),
  total: z.number({ invalid_type_error: 'الإجمالي يجب أن يكون رقمًا' }).min(0, { message: 'الإجمالي يجب ألا يكون سالبًا' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }).optional().refine(async (value) => !value || (await checkEmailUnique(value)), { message: 'البريد الإلكتروني مستخدم' }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'التاريخ غير صالح (YYYY-MM-DD)' }),
});

export const purchaseSchema = z.object({
  supplier: z.string().min(1, { message: 'يجب اختيار مورد' }),
  total: z.number().min(0, { message: 'الإجمالي يجب ألا يكون سالبًا' }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'التاريخ غير صالح' }),
});

export const productSchema = z.object({
  name: z.string().min(2, { message: 'اسم المنتج مطلوب' }),
  price: z.number().min(0, { message: 'السعر يجب ألا يكون سالبًا' }),
  stock: z.number().min(0, { message: 'المخزون يجب ألا يكون سالبًا' }),
});

export const journalEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'التاريخ غير صالح' }),
  description: z.string().min(5, { message: 'الوصف مطلوب' }),
  debit: z.number().min(0, { message: 'الدين يجب ألا يكون سالبًا' }),
  credit: z.number().min(0, { message: 'الائتمان يجب ألا يكون سالبًا' }),
  account: z.string().min(1, { message: 'يجب اختيار حساب' }),
});

export const userSchema = z.object({
  username: z.string().min(3, { message: 'اسم المستخدم مطلوب' }),
  email: z.string().email({ message: 'البريد غير صالح' }),
  password: z.string().min(6, { message: 'كلمة المرور قصيرة' }),
});

export const customerSchema = z.object({
  name: z.string().min(2, { message: 'اسم العميل مطلوب' }),
  email: z.string().email({ message: 'البريد غير صالح' }),
  phone: z.string().min(10, { message: 'رقم الهاتف غير صالح' }),
});

export const supplierSchema = z.object({
  name: z.string().min(2, { message: 'اسم المورد مطلوب' }),
  email: z.string().email({ message: 'البريد غير صالح' }),
  phone: z.string().min(10, { message: 'رقم الهاتف غير صالح' }),
});

export const receiptSchema = z.object({
  customer: z.string().min(1, { message: 'يجب اختيار عميل' }),
  amount: z.number().min(0, { message: 'المبلغ يجب ألا يكون سالبًا' }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'التاريخ غير صالح' }),
});

export const paymentSchema = z.object({
  supplier: z.string().min(1, { message: 'يجب اختيار مورد' }),
  amount: z.number().min(0, { message: 'المبلغ يجب ألا يكون سالبًا' }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'التاريخ غير صالح' }),
});

export const accountSchema = z.object({
  name: z.string().min(1, { message: 'اسم الحساب مطلوب' }),
  type: z.string().min(1, { message: 'نوع الحساب مطلوب' }),
});

export type AccountFormData = z.infer<typeof accountSchema>;