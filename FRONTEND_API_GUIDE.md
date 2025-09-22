# 📋 دليل API للفرونت إند - Django Accounts System

## 🎯 نظرة عامة

هذا الدليل يحتوي على جميع API endpoints والميزات المتاحة للفرونت إند لتطوير واجهة المستخدم.

---

## 🔐 المصادقة والصلاحيات

### نقاط الوصول الأساسية
- **Base URL**: `/api/accounts/`
- **المصادقة**: `Authorization: Bearer <token>`
- **الصلاحيات**: `IsAuthenticated`, `IsSuperUser`

---

## 👥 إدارة المستخدمين

### 1. المستخدمون الأساسيون

#### `GET /api/accounts/users/`
**الوصف**: قائمة جميع المستخدمين (للمشرفين فقط)
**الصلاحيات**: `IsSuperUser`

**الاستعلامات المتاحة**:
- `search`: البحث في username, email, first_name, last_name
- `ordering`: ترتيب حسب username, email, date_joined, is_active
- `page`: رقم الصفحة
- `page_size`: عدد العناصر في الصفحة

**الاستجابة**:
```json
{
  "count": 150,
  "next": "http://api/accounts/users/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "first_name": "Admin",
      "last_name": "User",
      "is_active": true,
      "date_joined": "2024-01-01T00:00:00Z",
      "last_login": "2024-01-15T10:30:00Z",
      "groups": [
        {
          "id": 1,
          "name": "Administrators"
        }
      ],
      "profile": {
        "phone_number": "+1234567890",
        "address": "123 Main St",
        "city": "New York",
        "country": "USA",
        "bio": "System Administrator",
        "profile_picture": "http://api/media/profiles/admin.jpg"
      }
    }
  ]
}
```

#### `GET /api/accounts/users/{id}/`
**الوصف**: تفاصيل مستخدم معين
**الصلاحيات**: `IsSuperUser`

#### `POST /api/accounts/users/`
**الوصف**: إنشاء مستخدم جديد
**الصلاحيات**: `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securepassword123",
  "first_name": "New",
  "last_name": "User",
  "groups": [1, 2]
}
```

#### `PUT/PATCH /api/accounts/users/{id}/`
**الوصف**: تحديث مستخدم
**الصلاحيات**: `IsSuperUser`

---

### 2. إدارة كلمات المرور

#### `POST /api/accounts/users/{id}/change_password/`
**الوصف**: تغيير كلمة مرور المستخدم
**الصلاحيات**: `IsAuthenticated` (للمستخدم نفسه) أو `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "current_password": "oldpassword",
  "new_password": "newsecurepassword123",
  "confirm_password": "newsecurepassword123"
}
```

#### `POST /api/accounts/users/{id}/admin_change_password/`
**الوصف**: تغيير كلمة مرور المستخدم (للمشرفين فقط)
**الصلاحيات**: `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "new_password": "newsecurepassword123",
  "confirm_password": "newsecurepassword123"
}
```

#### `POST /api/accounts/users/check_password_strength/`
**الوصف**: فحص قوة كلمة المرور
**الصلاحيات**: `IsAuthenticated`

**البيانات المطلوبة**:
```json
{
  "password": "passwordtocheck"
}
```

**الاستجابة**:
```json
{
  "strength": "strong",
  "score": 85,
  "feedback": {
    "suggestions": ["Use a longer password"],
    "warning": null
  }
}
```

---

### 3. إدارة الصلاحيات والمجموعات

#### `GET /api/accounts/users/{id}/user_permissions/`
**الوصف**: عرض صلاحيات المستخدم
**الصلاحيات**: `IsSuperUser`

**الاستجابة**:
```json
{
  "user": {
    "id": 1,
    "username": "admin"
  },
  "group_permissions": [
    {
      "group": {
        "id": 1,
        "name": "Administrators"
      },
      "permissions": [
        {
          "id": 1,
          "name": "Can add user",
          "codename": "add_user"
        }
      ]
    }
  ],
  "individual_permissions": [],
  "total_permissions": 25
}
```

#### `POST /api/accounts/users/{id}/add_to_groups/`
**الوصف**: إضافة مستخدم لمجموعات متعددة
**الصلاحيات**: `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "group_ids": [1, 2, 3]
}
```

#### `POST /api/accounts/users/{id}/remove_from_groups/`
**الوصف**: إزالة مستخدم من مجموعات متعددة
**الصلاحيات**: `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "group_ids": [1, 2]
}
```

---

## 📊 العمليات المجمعة

### 1. إدارة المستخدمين المجمعة

#### `POST /api/accounts/users/bulk_add_users_to_group/`
**الوصف**: إضافة مستخدمين متعددين لمجموعة واحدة
**الصلاحيات**: `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "group_id": 1,
  "user_ids": [1, 2, 3, 4, 5]
}
```

**الاستجابة**:
```json
{
  "status": "success",
  "message": "تم إضافة 5 مستخدم للمجموعة Administrators",
  "group": {
    "id": 1,
    "name": "Administrators"
  },
  "added_users": [
    {
      "id": 1,
      "username": "user1",
      "email": "user1@example.com"
    }
  ],
  "total_added": 5
}
```

#### `POST /api/accounts/users/bulk_remove_users_from_group/`
**الوصف**: إزالة مستخدمين متعددين من مجموعة واحدة
**الصلاحيات**: `IsSuperUser`

#### `POST /api/accounts/users/bulk_assign_users_to_groups/`
**الوصف**: تعيين مستخدمين متعددين لمجموعات متعددة
**الصلاحيات**: `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "assignments": [
    {
      "user_id": 1,
      "group_ids": [1, 2]
    },
    {
      "user_id": 2,
      "group_ids": [2, 3]
    }
  ]
}
```

---

## 🏷️ إدارة المجموعات

### 1. المجموعات الأساسية

#### `GET /api/accounts/groups/`
**الوصف**: قائمة جميع المجموعات
**الصلاحيات**: `IsSuperUser`

**الاستجابة**:
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Administrators",
      "user_count": 5,
      "permission_count": 25,
      "permissions": [
        {
          "id": 1,
          "name": "Can add user",
          "codename": "add_user"
        }
      ]
    }
  ]
}
```

#### `GET /api/accounts/groups/{id}/`
**الوصف**: تفاصيل مجموعة معينة
**الصلاحيات**: `IsSuperUser`

#### `POST /api/accounts/groups/`
**الوصف**: إنشاء مجموعة جديدة
**الصلاحيات**: `IsSuperUser`

#### `PUT/PATCH /api/accounts/groups/{id}/`
**الوصف**: تحديث مجموعة
**الصلاحيات**: `IsSuperUser`

#### `DELETE /api/accounts/groups/{id}/`
**الوصف**: حذف مجموعة
**الصلاحيات**: `IsSuperUser`

---

### 2. إدارة الصلاحيات للمجموعات

#### `POST /api/accounts/groups/{id}/add_permissions/`
**الوصف**: إضافة صلاحيات لمجموعة
**الصلاحيات**: `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "permission_ids": [1, 2, 3, 4]
}
```

#### `POST /api/accounts/groups/{id}/remove_permissions/`
**الوصف**: إزالة صلاحيات من مجموعة
**الصلاحيات**: `IsSuperUser`

---

### 3. العمليات المجمعة للمجموعات

#### `POST /api/accounts/groups/bulk_add_permissions/`
**الوصف**: إضافة صلاحيات جماعية لمجموعة
**الصلاحيات**: `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "group_id": 1,
  "permission_ids": [1, 2, 3, 4, 5]
}
```

#### `POST /api/accounts/groups/bulk_remove_permissions/`
**الوصف**: إزالة صلاحيات جماعية من مجموعة
**الصلاحيات**: `IsSuperUser`

#### `POST /api/accounts/groups/bulk_create_groups/`
**الوصف**: إنشاء مجموعات متعددة مع صلاحيات
**الصلاحيات**: `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "groups": [
    {
      "name": "Editors",
      "permission_ids": [1, 2, 3]
    },
    {
      "name": "Viewers",
      "permission_ids": [4, 5]
    },
    {
      "name": "Guests",
      "permission_ids": []
    }
  ]
}
```

#### `POST /api/accounts/groups/bulk_delete_groups/`
**الوصف**: حذف مجموعات متعددة
**الصلاحيات**: `IsSuperUser`

**البيانات المطلوبة**:
```json
{
  "group_ids": [1, 2, 3],
  "remove_users": false
}
```

---

## 👤 إدارة الملف الشخصي

### 1. الملف الشخصي الأساسي

#### `GET /api/accounts/profiles/`
**الوصف**: عرض الملف الشخصي للمستخدم الحالي
**الصلاحيات**: `IsAuthenticated`

#### `PUT/PATCH /api/accounts/profiles/`
**الوصف**: تحديث الملف الشخصي
**الصلاحيات**: `IsAuthenticated`

**البيانات المطلوبة**:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone_number": "+1234567890",
  "address": "123 Main St",
  "city": "New York",
  "country": "USA",
  "bio": "Software Developer",
  "website": "https://johndoe.com",
  "linkedin": "https://linkedin.com/in/johndoe",
  "twitter": "https://twitter.com/johndoe"
}
```

---

### 2. الملف الشخصي الممتد

#### `GET /api/accounts/profiles/extended_profile/`
**الوصف**: عرض الملف الشخصي الممتد
**الصلاحيات**: `IsAuthenticated`

#### `POST /api/accounts/profiles/extended_profile/`
**الوصف**: تحديث الملف الشخصي الممتد
**الصلاحيات**: `IsAuthenticated`

**البيانات المطلوبة**:
```json
{
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "+1234567890",
  "address": "123 Main St",
  "city": "New York",
  "country": "USA",
  "job_title": "Senior Developer",
  "department": "Engineering",
  "company": "Tech Corp",
  "bio": "Passionate software developer",
  "website": "https://johndoe.com",
  "linkedin": "https://linkedin.com/in/johndoe",
  "twitter": "https://twitter.com/johndoe",
  "date_of_birth": "1990-01-01",
  "gender": "male",
  "profile_visibility": "public",
  "email_notifications": true,
  "language": "en",
  "timezone": "UTC"
}
```

---

### 3. إدارة الصور والإعدادات

#### `POST /api/accounts/profiles/upload_profile_picture/`
**الوصف**: رفع صورة الملف الشخصي
**الصلاحيات**: `IsAuthenticated`

**البيانات المطلوبة**: `multipart/form-data`
```json
{
  "profile_picture": "<file>"
}
```

#### `GET /api/accounts/profiles/profile_settings/`
**الوصف**: عرض إعدادات الملف الشخصي
**الصلاحيات**: `IsAuthenticated`

#### `POST /api/accounts/profiles/profile_settings/`
**الوصف**: تحديث إعدادات الملف الشخصي
**الصلاحيات**: `IsAuthenticated`

**البيانات المطلوبة**:
```json
{
  "profile_visibility": "public",
  "email_notifications": true,
  "language": "en",
  "timezone": "UTC"
}
```

---

### 4. الإحصائيات والنشاط

#### `GET /api/accounts/profiles/profile_stats/`
**الوصف**: عرض إحصائيات الملف الشخصي
**الصلاحيات**: `IsAuthenticated`

**الاستجابة**:
```json
{
  "total_logins": 150,
  "account_age_days": 365,
  "posts_count": 25,
  "comments_count": 100
}
```

#### `GET /api/accounts/profile-completion/`
**الوصف**: حساب نسبة اكتمال الملف الشخصي
**الصلاحيات**: `IsAuthenticated`

**الاستجابة**:
```json
{
  "completion_percentage": 85.5,
  "completed_fields": 8,
  "total_fields": 9,
  "missing_fields": ["website"],
  "recommendations": ["ملفك الشخصي جيد، ولكن يمكنك إضافة المزيد من التفاصيل."]
}
```

#### `GET /api/accounts/profile-activity/`
**الوصف**: عرض نشاط الملف الشخصي
**الصلاحيات**: `IsAuthenticated`

**الاستجابة**:
```json
{
  "username": "johndoe",
  "last_login": "2024-01-15T10:30:00Z",
  "date_joined": "2023-01-15T10:30:00Z",
  "account_age": "365 أيام",
  "login_count": 150
}
```

---

### 5. البحث والتصدير

#### `POST /api/accounts/profiles/profile_search/`
**الوصف**: البحث في الملفات الشخصية
**الصلاحيات**: `IsAuthenticated`

**البيانات المطلوبة**:
```json
{
  "query": "john",
  "search_fields": ["first_name", "last_name", "bio"],
  "ordering": "username"
}
```

#### `GET /api/accounts/profiles/profile_export/`
**الوصف**: تصدير بيانات الملف الشخصي
**الصلاحيات**: `IsAuthenticated`

**الاستعلامات**:
- `format`: json, xml, csv (افتراضي: json)

---

## 🌐 الملفات الشخصية العامة

### `GET /api/accounts/public-profiles/`
**الوصف**: قائمة الملفات الشخصية العامة
**الصلاحيات**: `AllowAny`

### `POST /api/accounts/public-profiles/search/`
**الوصف**: البحث في الملفات الشخصية العامة
**الصلاحيات**: `AllowAny`

---

## 📋 الصلاحيات

### `GET /api/accounts/permissions/`
**الوصف**: قائمة جميع الصلاحيات
**الصلاحيات**: `IsSuperUser`

**الاستجابة**:
```json
{
  "count": 100,
  "results": [
    {
      "id": 1,
      "name": "Can add user",
      "codename": "add_user",
      "content_type": {
        "id": 1,
        "app_label": "accounts",
        "model": "user"
      }
    }
  ]
}
```

---

## 🔍 البحث المتقدم

### `GET /api/accounts/users/search/`
**الوصف**: بحث متقدم في المستخدمين
**الصلاحيات**: `IsSuperUser`

**الاستعلامات**:
- `q`: مصطلح البحث
- `is_active`: فلترة المستخدمين النشطين
- `date_joined_after`: تاريخ الانضمام بعد
- `date_joined_before`: تاريخ الانضمام قبل
- `groups`: فلترة حسب المجموعات

### `GET /api/accounts/groups/advanced_search/`
**الوصف**: بحث متقدم في المجموعات
**الصلاحيات**: `IsSuperUser`

---

## 📊 الإحصائيات والتحليلات

### `GET /api/accounts/users/analytics/`
**الوصف**: إحصائيات المستخدمين
**الصلاحيات**: `IsSuperUser`

**الاستجابة**:
```json
{
  "user_analytics": [
    {
      "date": "2024-01-01",
      "new_users": 5,
      "active_users": 150,
      "total_users": 1000
    }
  ],
  "summary": {
    "total_users": 1000,
    "active_users": 950,
    "new_users_today": 5,
    "growth_rate": 0.5
  }
}
```

### `GET /api/accounts/groups/analytics/`
**الوصف**: إحصائيات المجموعات
**الصلاحيات**: `IsSuperUser`

---

## 🎨 واجهة المستخدم المقترحة

### 1. شاشة إدارة المستخدمين
```
┌─────────────────────────────────────────────────────────┐
│ 👥 إدارة المستخدمين                                    │
├─────────────────────────────────────────────────────────┤
│ [🔍 البحث] [➕ مستخدم جديد] [📊 الإحصائيات] [⚙️ العمليات المجمعة] │
├─────────────────────────────────────────────────────────┤
│ المستخدمون:                                            │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ☑️ [صورة] admin    admin@example.com   [⚙️] [🗑️] │ │
│ │ ☑️ [صورة] user1    user1@example.com   [⚙️] [🗑️] │ │
│ │ ☑️ [صورة] user2    user2@example.com   [⚙️] [🗑️] │ │
│ └─────────────────────────────────────────────────────┘ │
│ [السابق] 1 2 3 4 5 [التالي]                              │
└─────────────────────────────────────────────────────────┘
```

### 2. شاشة الملف الشخصي
```
┌─────────────────────────────────────────────────────────┐
│ 👤 الملف الشخصي                                        │
├─────────────────────────────────────────────────────────┤
│ [📷] صورة الملف الشخصي                                  │
│ الاسم: John Doe                                         │
│ البريد: john.doe@example.com                           │
│ الهاتف: +1234567890                                     │
│ العنوان: 123 Main St, New York, USA                   │
│                                                         │
│ [📊 الإحصائيات] [⚙️ الإعدادات] [📤 تصدير البيانات]      │
│                                                         │
│ نسبة اكتمال الملف: ████████░░ 80%                      │
└─────────────────────────────────────────────────────────┘
```

### 3. شاشة إدارة المجموعات
```
┌─────────────────────────────────────────────────────────┐
│ 🏷️ إدارة المجموعات                                     │
├─────────────────────────────────────────────────────────┤
│ [🔍 البحث] [➕ مجموعة جديدة] [📊 الإحصائيات] [⚙️ العمليات المجمعة] │
├─────────────────────────────────────────────────────────┤
│ المجموعات:                                             │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ☑️ Administrators    5 مستخدم    25 صلاحية   [⚙️] │ │
│ │ ☑️ Editors          10 مستخدم    15 صلاحية   [⚙️] │ │
│ │ ☑️ Viewers          50 مستخدم    5 صلاحيات    [⚙️] │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 4. شاشة العمليات المجمعة
```
┌─────────────────────────────────────────────────────────┐
│ ⚙️ العمليات المجمعة                                    │
├─────────────────────────────────────────────────────────┤
│ [👥 المستخدمون] [🏷️ المجموعات] [🔐 الصلاحيات]          │
│                                                         │
│ إضافة مستخدمين لمجموعة:                                 │
│ المجموعة: [Administrators ▼]                           │
│ المستخدمون: [☑️ user1] [☑️ user2] [☑️ user3]           │
│ [➕ إضافة المحددين]                                     │
│                                                         │
│ إنشاء مجموعات متعددة:                                   │
│ [➕ مجموعة جديدة] [➕ مجموعة جديدة] [➕ مجموعة جديدة]   │
│ [✅ إنشاء جميع المجموعات]                               │
└─────────────────────────────────────────────────────────┘
```

---

## 🚨 أكواد الاستجابة

### أكواد النجاح
- `200 OK`: العملية نجحت
- `201 Created`: تم إنشاء العنصر بنجاح

### أكواد الأخطاء
- `400 Bad Request`: بيانات غير صحيحة
- `401 Unauthorized`: غير مصرح للمستخدم
- `403 Forbidden`: ليس لديك صلاحية لهذه العملية
- `404 Not Found`: العنصر غير موجود
- `500 Internal Server Error`: خطأ في الخادم

---

## 📝 ملاحظات مهمة

### 1. المصادقة
- جميع endpoints تتطلب مصادقة باستثناء الملفات الشخصية العامة
- استخدم `Authorization: Bearer <token>` في header

### 2. الصلاحيات
- `IsAuthenticated`: المستخدم مسجل الدخول
- `IsSuperUser`: المشرف فقط

### 3. Pagination
- جميع القوائم تدعم pagination
- `page`: رقم الصفحة
- `page_size`: عدد العناصر (افتراضي: 20، حد أقصى: 100)

### 4. البحث
- معظم القوائم تدعم البحث
- استخدم `search` parameter للبحث النصي
- استخدم `ordering` parameter للترتيب

### 5. العمليات المجمعة
- تدعم حتى 100 عنصر في العملية الواحدة
- تأكد من صحة البيانات قبل الإرسال
- تحقق من الاستجابة لفهم النتائج

### 6. الملفات
- استخدم `multipart/form-data` لرفع الصور
- الحد الأقصى لحجم الملف: 5MB
- الأنواع المدعومة: JPG, PNG, GIF

---

## 🔧 أدوات التطوير

### Postman Collection
يمكنك إنشاء Postman Collection باستخدام هذه المعلومات لاختبار APIs بسهولة.

### React Components المقترحة
```javascript
// UserManagement.jsx
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  // API calls
  const fetchUsers = async () => {
    const response = await fetch('/api/accounts/users/');
    const data = await response.json();
    setUsers(data.results);
  };
  
  const bulkAddToGroup = async (groupId) => {
    const response = await fetch('/api/accounts/users/bulk_add_users_to_group/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        group_id: groupId,
        user_ids: selectedUsers
      })
    });
    return response.json();
  };
  
  return (
    <div>
      {/* UI Components */}
    </div>
  );
};
```

هذا الدليل يغطي جميع APIs المتاحة للفرونت إند. يمكنك استخدامه لتطوير واجهة المستخدم بشكل صحيح وفعال.
