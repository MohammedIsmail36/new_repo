import { render, screen, fireEvent } from '@testing-library/react';
import SearchableSelect from '@/components/SearchableSelect';
import { FormProvider, useForm } from 'react-hook-form';

// مكون اختبار لتغليف SearchableSelect
function TestComponent() {
  const methods = useForm({
    defaultValues: {
      testSelect: '', // قيمة افتراضية لضمان عمل react-hook-form
    },
  });
  return (
    <FormProvider {...methods}>
      <SearchableSelect
        name="testSelect"
        label="اختيار"
        options={[{ value: '1', label: 'خيار 1' }, { value: '2', label: 'خيار 2' }]}
      />
    </FormProvider>
  );
}

describe('SearchableSelect', () => {
  it('renders SearchableSelect with label and options after clicking the trigger', () => {
    render(<TestComponent />);
    expect(screen.getByText('اختيار')).toBeInTheDocument();

    // محاكاة النقر على الزر لفتح القائمة المنسدلة
    const triggerButton = screen.getByRole('combobox');
    fireEvent.click(triggerButton);

    // التحقق من ظهور الخيارات
    expect(screen.getByText('خيار 1')).toBeInTheDocument();
    expect(screen.getByText('خيار 2')).toBeInTheDocument();
  });
});