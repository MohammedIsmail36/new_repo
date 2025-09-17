import { render, screen } from '@testing-library/react';
import FormInput from '@/components/FormInput';
import { FormProvider, useForm } from 'react-hook-form';

// مكون اختبار لتغليف FormInput
function TestComponent() {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <FormInput name="test" label="اختبار" />
    </FormProvider>
  );
}

describe('FormInput', () => {
  it('renders FormInput with label', () => {
    render(<TestComponent />);
    expect(screen.getByLabelText('اختبار')).toBeInTheDocument();
  });
});