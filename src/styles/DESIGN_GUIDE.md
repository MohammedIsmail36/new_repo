# دليل نظام التصميم الجديد
## Modern Arabic Design System for Sales Management System

### 🎨 **النظرة العامة**

تم إنشاء نظام تصميم موحد وعصري يدعم:
- التطبيقات العربية (RTL)
- التوافق مع Django المستقبلي
- تصميم responsive متقدم
- أفضل ممارسات الـ UX/UI

---

## 📁 **هيكل النظام**

```
src/
├── styles/
│   ├── design-system.css      # النظام الأساسي
│   └── DESIGN_GUIDE.md       # هذا الملف
├── components/
│   └── ui/
│       ├── Button.tsx         # مكون الأزرار المحسّن
│       ├── Card.tsx          # مكون البطاقات
│       ├── Input.tsx         # مكونات الإدخال
│       ├── Badge.tsx         # مكونات العلامات
│       ├── Select.tsx        # قوائم الاختيار
│       └── index.ts          # التصدير الموحد
└── app/
    └── globals.css           # محدث للنظام الجديد
```

---

## 🎯 **كيفية الاستخدام**

### 1. **استيراد المكونات**

```tsx
import { Button, Card, Input, Badge, Select } from '@/components/ui';

// أو استيراد فردي
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
```

### 2. **استخدام الألوان من النظام**

```tsx
// استخدام CSS Variables
<div style={{ color: 'var(--primary-600)', backgroundColor: 'var(--bg-primary)' }}>
  المحتوى
</div>

// استخدام Tailwind Classes
<div className="text-primary-600 bg-white border border-secondary-200">
  المحتوى
</div>
```

### 3. **أمثلة على المكونات**

#### **الأزرار**
```tsx
<Button variant="default" size="md">
  زر أساسي
</Button>

<Button variant="outline" size="lg" leftIcon={<Plus />}>
  إضافة عنصر
</Button>

<Button variant="success" loading={true}>
  جاري التحميل...
</Button>
```

#### **البطاقات**
```tsx
<Card variant="elevated" hover>
  <CardHeader separated>
    <CardTitle>عنوان البطاقة</CardTitle>
    <CardDescription>وصف مختصر</CardDescription>
  </CardHeader>
  <CardContent>
    محتوى البطاقة
  </CardContent>
  <CardFooter separated>
    <Button variant="outline">إلغاء</Button>
    <Button variant="default">حفظ</Button>
  </CardFooter>
</Card>
```

#### **حقول الإدخال**
```tsx
<Input
  label="اسم المستخدم"
  placeholder="أدخل اسم المستخدم"
  helperText="سيتم استخدام هذا الاسم للتسجيل"
  leftIcon={<User />}
/>

<Input
  type="password"
  label="كلمة المرور"
  showPasswordToggle
  errorMessage="كلمة المرور ضعيفة"
/>
```

#### **العلامات والحالات**
```tsx
<StatusBadge status="مدفوع" />
<StatusBadge status="غير مدفوع" isReversed />
<PriorityBadge priority="عاجل" />

<Badge variant="success" onRemove={() => {}}>
  علامة قابلة للإزالة
</Badge>
```

### 4. **التخطيط (Layout)**

```tsx
// استخدام الكلاسات الجديدة
<div className="layout-container">
  <aside className="layout-sidebar">
    الشريط الجانبي
  </aside>
  <div className="layout-main">
    <header className="layout-header">
      الهيدر
    </header>
    <main className="layout-content">
      المحتوى الأساسي
    </main>
  </div>
</div>
```

---

## 🎨 **نظام الألوان**

### **الألوان الأساسية**
- `--primary-50` إلى `--primary-900`: الأزرق الأساسي
- `--secondary-50` إلى `--secondary-900`: الرمادي
- `--success-50` إلى `--success-700`: الأخضر
- `--error-50` إلى `--error-700`: الأحمر
- `--warning-50` إلى `--warning-700`: البرتقالي

### **الألوان الذكية**
- `--bg-primary`: خلفية أساسية
- `--bg-secondary`: خلفية ثانوية
- `--text-primary`: نص أساسي
- `--text-secondary`: نص ثانوي

---

## 📱 **التصميم المتجاوب**

```css
/* Breakpoints */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 480px)  { /* Small Mobile */ }
```

### **أمثلة على الاستخدام**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- المحتوى -->
</div>

<Button className="w-full md:w-auto">
  زر متجاوب
</Button>
```

---

## ⚡ **التحولات والحركات**

### **الكلاسات المتوفرة**
- `.animate-fade-in`: تحول تدريجي للظهور
- `.animate-slide-in-right`: انزلاق من اليمين
- `.animate-slide-in-down`: انزلاق من الأعلى
- `.hover-lift`: رفع عند التمرير
- `.transition-colors`: تحولات الألوان السلسة

### **أمثلة**
```tsx
<Card className="hover-lift animate-fade-in">
  بطاقة مع تأثيرات
</Card>

<Button className="transition-colors">
  زر مع تحولات سلسة
</Button>
```

---

## 🔧 **التوافق مع Django**

النظام جاهز لـ Django من خلال:

### **1. أنماط Django Forms**
```css
.django-form .field input {
  /* يطبق تلقائياً أنماط Input */
}
```

### **2. Django Messages**
```html
<div class="django-messages">
  <div class="message success">تم الحفظ بنجاح</div>
  <div class="message error">حدث خطأ</div>
</div>
```

### **3. Django Admin**
```css
.admin-override {
  /* فرض اتجاه RTL على admin */
}
```

---

## 🚀 **أفضل الممارسات**

### **1. استخدم المتغيرات**
```css
/* جيد */
color: var(--primary-600);

/* تجنب */
color: #2563eb;
```

### **2. استخدم الكلاسات المناسبة**
```tsx
// جيد
<Button variant="primary" size="lg">

// تجنب
<button style={{ backgroundColor: 'blue', padding: '20px' }}>
```

### **3. التركيز على Accessibility**
```tsx
<Button leftIcon={<Plus />} aria-label="إضافة عنصر جديد">
  إضافة
</Button>

<Input
  label="البريد الإلكتروني"
  required
  aria-describedby="email-help"
/>
```

---

## 📋 **قائمة التحقق للمطورين**

- [ ] استخدام المكونات الجديدة بدلاً من القديمة
- [ ] تطبيق نظام الألوان المتغير
- [ ] اختبار التصميم المتجاوب
- [ ] التأكد من دعم RTL
- [ ] إضافة تسميات Accessibility
- [ ] استخدام التحولات المناسبة
- [ ] اتباع أنماط التسمية المحددة

---

## 🔄 **الترحيل من النظام القديم**

### **قبل:**
```tsx
import { theme } from '@/lib/theme';

<div style={{
  backgroundColor: theme.colors.primary_blue,
  padding: theme.layout.main_content.padding
}}>
```

### **بعد:**
```tsx
<div className="bg-primary-600 p-6">
```

### **أو:**
```tsx
<div style={{
  backgroundColor: 'var(--primary-600)',
  padding: 'var(--spacing-6)'
}}>
```

---

## 🆘 **الدعم والمساعدة**

للأسئلة حول النظام:
1. راجع أمثلة المكونات في `/src/components/ui/`
2. تحقق من متغيرات CSS في `/src/styles/design-system.css`
3. استخدم TypeScript للحصول على IntelliSense

---

## 🔮 **التطورات المستقبلية**

- [ ] إضافة Dark Mode
- [ ] مكونات إضافية (Table, Modal, Dropdown)
- [ ] تحسين Performance
- [ ] تكامل أعمق مع Django
- [ ] Storybook للتوثيق التفاعلي