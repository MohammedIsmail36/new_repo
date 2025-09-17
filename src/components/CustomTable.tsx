'use client';

import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridColumnVisibilityModel,
  GridDensity,
  GridCsvExportOptions,
  GridPrintExportOptions,
  GridToolbarQuickFilter,
  GridColumnMenu,
  GridColumnMenuProps,
  useGridApiContext,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  gridVisibleColumnFieldsSelector,
} from '@mui/x-data-grid';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  styled,
  Menu,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  SaveAlt as ExportIcon,
  ViewColumn as ViewColumnIcon,
  FilterList as FilterIcon,
  ViewCompact as ViewCompactIcon,
  ViewModule as ViewModuleIcon,
  ViewWeek as ViewWeekIcon,
} from '@mui/icons-material';

// تعريف الأنواع
interface Column {
  field: string;
  headerName: string;
  width?: number;
  type?: string;
  valueOptions?: string[];
  renderCell?: (params: any) => JSX.Element;
}

interface CustomTableProps {
  title?: string;
  columns: Column[];
  data: any[];
  loading?: boolean;
  onAdd?: (data: any) => void;
  onEdit?: (data: any) => void;
  onDelete?: (data: any) => void;
  fields?: any[];
  pageSizeOptions?: number[];
  initialState?: any;
  showSearch?: boolean;
}

// إنشاء مكون مخصص لشريط الأدوات باستخدام styled
const CustomToolbarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  flexDirection: 'row-reverse',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

// مكونات بديلة للمكونات المهملة

// 1. مكون إدارة الأعمدة (بديل GridToolbarColumnsButton)
function CustomColumnsButton() {
  const apiRef = useGridApiContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [columnVisibility, setColumnVisibility] = useState<GridColumnVisibilityModel>({});

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // الحصول على حالة الأعمدة الحالية
    const currentVisibility = apiRef.current.getColumnVisibilityModel();
    setColumnVisibility(currentVisibility || {});
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleColumn = (field: string) => {
    const newVisibility = {
      ...columnVisibility,
      [field]: !columnVisibility[field],
    };
    setColumnVisibility(newVisibility);
    apiRef.current.setColumnVisibilityModel(newVisibility);
  };

  const allColumns = apiRef.current.getAllColumns();

  return (
    <>
      <IconButton onClick={handleClick}>
        <ViewColumnIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ sx: { maxHeight: 300 } }}
      >
        {allColumns
          .filter(column => column.field !== '__check__' && column.field !== 'actions')
          .map(column => (
            <MenuItem
              key={column.field}
              onClick={() => handleToggleColumn(column.field)}
              selected={columnVisibility[column.field] !== false}
            >
              {column.headerName || column.field}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}

// 2. مكون إدارة الكثافة (بديل GridToolbarDensitySelector)
function CustomDensitySelector() {
  const apiRef = useGridApiContext();
  const [density, setDensity] = useState<GridDensity>('standard');

  const handleDensityChange = (
    event: React.MouseEvent<HTMLElement>,
    newDensity: GridDensity | null,
  ) => {
    if (newDensity !== null) {
      setDensity(newDensity);
      apiRef.current.setDensity(newDensity);
    }
  };

  return (
    <ToggleButtonGroup
      value={density}
      exclusive
      onChange={handleDensityChange}
      aria-label="كثافة الجدول"
      size="small"
    >
      <ToggleButton value="compact" aria-label="مضغوط">
        <ViewCompactIcon />
      </ToggleButton>
      <ToggleButton value="standard" aria-label="قياسي">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="comfortable" aria-label="مريح">
        <ViewWeekIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

// 3. مكون التصدير (بديل GridToolbarExport)
function CustomExportButton() {
  const apiRef = useGridApiContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorEl(null);
  };

  const handleCsvExport = () => {
    const options: GridCsvExportOptions = {
      fileName: 'بيانات',
      delimiter: ';',
      utf8WithBom: true,
    };
    apiRef.current.exportDataAsCsv(options);
    handleExportClose();
  };

  const handlePrintExport = () => {
    const options: GridPrintExportOptions = {
      hideToolbar: false,
      hideFooter: false,
    };
    apiRef.current.exportDataAsPrint(options);
    handleExportClose();
  };

  return (
    <>
      <IconButton onClick={handleExportClick}>
        <ExportIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleExportClose}
      >
        <MenuItem onClick={handleCsvExport}>
          <ListItemIcon>
            <ExportIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>تصدير كملف CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={handlePrintExport}>
          <ListItemIcon>
            <ExportIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>طباعة</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

// 4. مكون قائمة الأعمدة المخصصة (بديل GridColumnMenu)
function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuColumnsItem: null, // إخفاء عنصر إدارة الأعمدة الافتراضي
      }}
    />
  );
}

// شريط أدوات مخصص للجدول
function CustomToolbar({ 
  onAddClick, 
  title, 
  showSearch, 
  onSearchChange 
}: { 
  onAddClick: () => void; 
  title: string;
  showSearch?: boolean;
  onSearchChange?: (value: string) => void;
}) {
  return (
    <CustomToolbarContainer>
      <Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        {showSearch && (
          <Box sx={{ width: 250 }}>
            <GridToolbarQuickFilter 
              placeholder="بحث..." 
              sx={{ 
                '& .MuiInput-input': { 
                  textAlign: 'right',
                  paddingRight: '8px'
                } 
              }}
            />
          </Box>
        )}
        <CustomColumnsButton />
        <IconButton size="small">
          <FilterIcon />
        </IconButton>
        <CustomDensitySelector />
        <CustomExportButton />
        <IconButton onClick={onAddClick}>
          <AddIcon />
        </IconButton>
      </Box>
    </CustomToolbarContainer>
  );
}

// نموذج لإضافة/تحرير العناصر
function ItemForm({ 
  open, 
  handleClose, 
  handleSubmit, 
  editingItem, 
  fields 
}: { 
  open: boolean; 
  handleClose: () => void; 
  handleSubmit: (data: any) => void; 
  editingItem: any; 
  fields: any[]; 
}) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      // تهيئة الحقول الفارغة
      const initialData: Record<string, any> = {};
      fields.forEach(field => {
        initialData[field.name] = '';
      });
      setFormData(initialData);
    }
  }, [editingItem, fields, open]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = () => {
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingItem ? 'تعديل العنصر' : 'إضافة عنصر جديد'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {fields.map(field => (
            <React.Fragment key={field.name}>
              {field.type === 'select' ? (
                <FormControl fullWidth>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    value={formData[field.name] || ''}
                    label={field.label}
                    onChange={e => handleChange(field.name, e.target.value)}
                  >
                    {field.options.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  type={field.type || 'text'}
                  value={formData[field.name] || ''}
                  onChange={e => handleChange(field.name, e.target.value)}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>إلغاء</Button>
        <Button onClick={onSubmit} variant="contained">
          {editingItem ? 'تحديث' : 'إضافة'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// مكون الجدول الرئيسي
export default function CustomTable({
  title = 'الجدول',
  columns = [],
  data = [],
  loading = false,
  onAdd,
  onEdit,
  onDelete,
  fields = [],
  pageSizeOptions = [5, 10, 25],
  initialState = {
    pagination: {
      paginationModel: { pageSize: 10, page: 0 },
    },
  },
  showSearch = true,
}: CustomTableProps) {
  const [openForm, setOpenForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // إضافة أعمدة الإجراءات إذا كانت هناك دوال معالجة مقدمة
  const tableColumns = [...columns];
  if (onEdit || onDelete) {
    tableColumns.push({
      field: 'actions',
      headerName: 'الإجراءات',
      width: 120,
      renderCell: (params: any) => (
        <Box>
          {onEdit && (
            <IconButton
              size="small"
              onClick={() => {
                setEditingItem(params.row);
                setOpenForm(true);
              }}
            >
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              size="small"
              onClick={() => {
                if (window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
                  onDelete && onDelete(params.row);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ),
    });
  }

  const handleSubmit = (formData: any) => {
    if (editingItem) {
      onEdit && onEdit({ ...editingItem, ...formData });
    } else {
      onAdd && onAdd(formData);
    }
    setEditingItem(null);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <DataGrid
        rows={data}
        columns={tableColumns}
        loading={loading}
        pageSizeOptions={pageSizeOptions}
        initialState={initialState}
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'primary.light',
            color: 'white',
          },
          minHeight: 400,
          '& .MuiDataGrid-toolbarContainer': {
            display: 'none' // إخفاء شريط الأدوات الافتراضي
          }
        }}
        slots={{
          toolbar: CustomToolbar,
          columnMenu: CustomColumnMenu,
        }}
        slotProps={{
          toolbar: {
            onAddClick: () => setOpenForm(true),
            title,
            showSearch,
          },
        }}
        localeText={{
          // نصوص عربية
          MuiTablePagination: {
            labelRowsPerPage: 'عدد الصفوف في الصفحة',
            labelDisplayedRows: ({ from, to, count }) =>
              `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`,
          },
          toolbarQuickFilterPlaceholder: 'بحث...',
          footerTotalVisibleRows: (visibleCount, totalCount) =>
            `${visibleCount.toLocaleString()} من ${totalCount.toLocaleString()}`,
          // يمكن إضافة المزيد من النصوص العربية هنا
        }}
      />

      {(onAdd || onEdit) && (
        <ItemForm
          open={openForm}
          handleClose={() => {
            setOpenForm(false);
            setEditingItem(null);
          }}
          handleSubmit={handleSubmit}
          editingItem={editingItem}
          fields={fields}
        />
      )}
    </Paper>
  );
}