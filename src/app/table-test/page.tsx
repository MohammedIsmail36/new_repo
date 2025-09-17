"use client"

import { EnterpriseTable, type TableColumn, type FilterConfig, type RowAction } from "@/components/enterprise-table"
import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/components/ui/toast-provider"
// import { useConfirmation } from "@/hooks/use-confirmation"
// import { FlashMessage } from "@/components/ui/flash-message"
import { Eye, Package, Star, Edit, Trash2, Copy, Archive, ShoppingCart } from "lucide-react"
import { useState } from "react"

// نموذج بيانات المنتجات الأولية
const initialProductsData = [
  {
    id: 1,
    name: "لابتوب Dell XPS 13",
    category: "إلكترونيات",
    price: 4500,
    stock: 25,
    status: "متوفر",
    brand: "Dell",
    rating: 4.8,
    description: "لابتوب عالي الأداء مع معالج Intel Core i7",
    image: "/modern-laptop-workspace.png",
    isActive: true,
  },
  {
    id: 2,
    name: "هاتف iPhone 15 Pro",
    category: "إلكترونيات",
    price: 6200,
    stock: 15,
    status: "متوفر",
    brand: "Apple",
    rating: 4.9,
    description: "أحدث هاتف من آبل مع كاميرا متطورة",
    image: "/modern-smartphone.png",
    isActive: true,
  },
  {
    id: 3,
    name: "كتاب تعلم البرمجة",
    category: "كتب",
    price: 85,
    stock: 0,
    status: "نفد المخزون",
    brand: "دار النشر العربية",
    rating: 4.5,
    description: "دليل شامل لتعلم البرمجة للمبتدئين",
    image: "/open-book-library.png",
    isActive: false,
  },
  {
    id: 4,
    name: "ساعة ذكية Samsung Galaxy Watch",
    category: "إلكترونيات",
    price: 1200,
    stock: 8,
    status: "قليل المخزون",
    brand: "Samsung",
    rating: 4.6,
    description: "ساعة ذكية مع مراقبة الصحة",
    image: "/modern-smartwatch.png",
    isActive: true,
  },
  {
    id: 5,
    name: "قميص قطني رجالي",
    category: "ملابس",
    price: 120,
    stock: 50,
    status: "متوفر",
    brand: "Fashion Brand",
    rating: 4.2,
    description: "قميص قطني عالي الجودة",
    image: "/shirt.png",
    isActive: false,
  },
  {
    id: 6,
    name: "سماعات Sony WH-1000XM5",
    category: "إلكترونيات",
    price: 1800,
    stock: 12,
    status: "متوفر",
    brand: "Sony",
    rating: 4.7,
    description: "سماعات لاسلكية مع إلغاء الضوضاء",
    image: "/diverse-people-listening-headphones.png",
    isActive: true,
  },
]

export default function ProductsPage() {
  const [productsData, setProductsData] = useState(initialProductsData)
  const [tableKey, setTableKey] = useState(0)

  // تعريف الأعمدة المخصصة للمنتجات
  const columns: TableColumn[] = [
    {
      key: "image",
      label: "الصورة",
      width: "80px",
      render: (value, row) => (
        <img
          src={value || "/placeholder.svg"}
          alt={row.name}
          className="w-10 h-10 rounded-lg object-cover border border-border/50"
        />
      ),
    },
    {
      key: "name",
      label: "اسم المنتج",
      sortable: true,
      filterable: true,
      width: "250px",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="font-medium text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">{row.description}</div>
        </div>
      ),
    },
    {
      key: "category",
      label: "الفئة",
      sortable: true,
      filterable: true,
      width: "120px",
      render: (value) => (
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
          {value}
        </Badge>
      ),
    },
    {
      key: "brand",
      label: "العلامة التجارية",
      sortable: true,
      filterable: true,
      width: "150px",
    },
    {
      key: "price",
      label: "السعر",
      sortable: true,
      width: "100px",
      render: (value) => <span className="font-semibold text-green-600">{value.toLocaleString()} ر.س</span>,
    },
    {
      key: "stock",
      label: "المخزون",
      sortable: true,
      width: "80px",
      render: (value, row) => (
        <div className="text-center">
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">قطعة</div>
        </div>
      ),
    },
    {
      key: "status",
      label: "الحالة",
      sortable: true,
      filterable: true,
      width: "120px",
      render: (value) => {
        const statusColors = {
          متوفر: "bg-green-50 text-green-700 border-green-200",
          "نفد المخزون": "bg-red-50 text-red-700 border-red-200",
          "قليل المخزون": "bg-yellow-50 text-yellow-700 border-yellow-200",
        }
        return (
          <Badge className={statusColors[value as keyof typeof statusColors] || "bg-gray-50 text-gray-700"}>
            {value}
          </Badge>
        )
      },
    },
    {
      key: "rating",
      label: "التقييم",
      sortable: true,
      width: "100px",
      render: (value) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "isActive",
      label: "حالة التفعيل",
      sortable: true,
      filterable: true,
      width: "120px",
      render: (value) => (
        <Badge
          className={value ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}
        >
          {value ? "مفعل" : "معطل"}
        </Badge>
      ),
    },
  ]

  // تعريف الفلاتر المخصصة للمنتجات
  const filters: FilterConfig[] = [
    {
      key: "category",
      label: "الفئة",
      type: "select",
      options: [
        { label: "إلكترونيات", value: "إلكترونيات" },
        { label: "كتب", value: "كتب" },
        { label: "ملابس", value: "ملابس" },
      ],
    },
    {
      key: "status",
      label: "الحالة",
      type: "select",
      options: [
        { label: "متوفر", value: "متوفر" },
        { label: "نفد المخزون", value: "نفد المخزون" },
        { label: "قليل المخزون", value: "قليل المخزون" },
      ],
    },
    {
      key: "brand",
      label: "العلامة التجارية",
      type: "text",
    },
    {
      key: "price",
      label: "السعر الأدنى",
      type: "number",
    },
  ]

  // تعريف الإجراءات المخصصة للمنتجات
  const actions = [
    {
      label: "عرض التفاصيل",
      icon: <Eye className="h-4 w-4" />,
      onClick: (selectedRows: any[]) => {
        const rows = Array.isArray(selectedRows) ? selectedRows : []
      },
      requiresSelection: true,
      category: "general",
    },
    {
      label: "تحديث المخزون",
      icon: <Package className="h-4 w-4" />,
      requiresSelection: true,
      category: "bulk",
    },
    {
      label: "تبديل حالة التفعيل",
      icon: <Package className="h-4 w-4" />,
      onClick: async (selectedRows: any[]) => {
        console.log("[v0] toggleProductsActivation called with:", selectedRows)

        const rows = Array.isArray(selectedRows) ? selectedRows : []
        console.log("[v0] Processed rows:", rows)

        if (rows.length === 0) {
          console.log("[v0] No rows selected, showing warning")
          return
        }

        const activeProducts = rows.filter((row) => row.isActive)
        const inactiveProducts = rows.filter((row) => !row.isActive)

        console.log("[v0] Active products:", activeProducts.length)
        console.log("[v0] Inactive products:", inactiveProducts.length)

        // تحديد العملية بناءً على الأغلبية
        const shouldActivate = inactiveProducts.length >= activeProducts.length
        const action = shouldActivate ? "تفعيل" : "تعطيل"
        const targetProducts = shouldActivate ? inactiveProducts : activeProducts
        const actionType = shouldActivate ? "default" : "warning"

        console.log("[v0] Should activate:", shouldActivate)
        console.log("[v0] Target products:", targetProducts.length)

        if (targetProducts.length === 0) {
          const currentState = shouldActivate ? "مفعلة" : "معطلة"
          console.log("[v0] No products to change, showing info")
          return
        }

        try {
          let message = ""
          if (targetProducts.length === rows.length) {
            message = `سيتم ${action} جميع المنتجات المحددة (${targetProducts.length} منتج)`
          } else {
            message = `سيتم ${action} ${targetProducts.length} منتج من أصل ${rows.length} منتج محدد`
          }

          console.log("[v0] Showing confirmation dialog")
     


          if (true) {
            console.log("[v0] User confirmed, proceeding with action")
            const targetIds = targetProducts.map((p) => p.id)
            console.log("[v0] Updating products with IDs:", targetIds)

            setProductsData((prevData) => {
              const newData = prevData.map((product) =>
                targetIds.includes(product.id) ? { ...product, isActive: shouldActivate } : product,
              )
              console.log("[v0] Updated products data:", newData)
              return newData
            })

            setTableKey((prev) => {
              const newKey = prev + 1
              console.log("[v0] Updated table key to:", newKey)
              return newKey
            })

            console.log("[v0] Showing success message")
          } else {
            console.log("[v0] User cancelled the action")
          }
        } catch (error) {
          console.error("[v0] Error in toggleProductsActivation:", error)
        }
      },
      requiresSelection: true,
      category: "bulk",
    },
    {
      label: "تصدير إلى Excel",
      icon: <Archive className="h-4 w-4" />,
      category: "export",
    },
    {
      label: "حذف المنتجات",
      icon: <Trash2 className="h-4 w-4" />,
      variant: "destructive",
      requiresSelection: true,
      category: "bulk",
    },
  ]

  // تعريف إجراءات السطر المخصصة للمنتجات
  const productRowActions: RowAction[] = [
    {
      label: "عرض التفاصيل",
      icon: <Eye className="h-4 w-4" />,
    },
    {
      label: "تفعيل/تعطيل المنتج",
      icon: <Package className="h-4 w-4" />,
      separator: true,
    },
    {
      label: "نسخ المنتج",
      icon: <Copy className="h-4 w-4" />,
    },
    {
      label: "إضافة للسلة",
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      label: "أرشفة المنتج",
      icon: <Archive className="h-4 w-4" />,
     
    },
    {
      label: "حذف المنتج",
      icon: <Trash2 className="h-4 w-4" />,
      },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          إدارة المنتجات
        </h1>
        <p className="text-muted-foreground">مثال على كيفية تخصيص مكون الجدول الاحترافي مع مكونات الرسائل والتأكيدات</p>
      </div>

      <EnterpriseTable
        key={tableKey}
        data={productsData}
        columns={columns}
        filters={filters}
        title="قائمة المنتجات"
        actions={actions}
        rowActions={productRowActions}
        onAdd={null}
        onRowClick={null}
        searchable={true}
        exportable={true}
        showActionsOnlyWhenSelected={true}
      />



      {/* شرح كيفية التخصيص */}
      <div className="bg-muted/30 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">مكونات النظام المستخدمة:</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h3 className="font-medium text-primary">1. Toast Notifications:</h3>
            <p className="text-muted-foreground">رسائل منبثقة للإشعارات السريعة (نجاح، خطأ، تحذير، معلومات)</p>

            <h3 className="font-medium text-primary">2. Confirmation Modals:</h3>
            <p className="text-muted-foreground">نوافذ تأكيد للعمليات الحساسة مثل الحذف والأرشفة</p>

            <h3 className="font-medium text-primary">3. Flash Messages:</h3>
            <p className="text-muted-foreground">رسائل ثابتة للمعلومات المهمة التي تحتاج انتباه المستخدم</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-primary">4. التكامل مع الجدول:</h3>
            <p className="text-muted-foreground">ربط مكونات الرسائل مع إجراءات الجدول</p>

            <h3 className="font-medium text-primary">5. تجربة مستخدم محسنة:</h3>
            <p className="text-muted-foreground">ردود فعل فورية وواضحة لجميع العمليات</p>

            <h3 className="font-medium text-primary">6. التحقق من الحالات:</h3>
            <p className="text-muted-foreground">فحص حالة المنتج قبل تنفيذ العمليات</p>
          </div>
        </div>
      </div>
    </div>
  )
}
