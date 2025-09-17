// محاكاة قاعدة بيانات
const mockCustomers = [
  { id: 1, name: 'عميل 1', email: 'customer1@example.com' },
  { id: 2, name: 'عميل 2', email: 'customer2@example.com' },
];

const mockSuppliers = [
  { id: 1, name: 'مورد 1', email: 'supplier1@example.com' },
];

const mockProducts = [
  { id: 1, name: 'منتج 1', price: 100 },
];

const mockAccounts = [
  { id: 1, name: 'حساب رئيسي', type: 'أصول' },
];

export async function checkCustomerExists(name: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCustomers.some((c) => c.name === name));
    }, 500);
  });
}

export async function checkEmailUnique(email: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(!mockCustomers.some((c) => c.email === email));
    }, 500);
  });
}

// مشابه للموردين، المنتجات، الحسابات، إلخ. (يمكن توسيع)