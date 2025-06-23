import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
  const mockOnDateChange = jest.fn();

  beforeEach(() => {
    mockOnDateChange.mockClear();
  });

  it('renders with default state', () => {
    render(<DatePicker onDateChange={mockOnDateChange} />);
    
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with selected date', () => {
    const testDate = new Date('2024-01-15');
    render(<DatePicker date={testDate} onDateChange={mockOnDateChange} />);
    
    expect(screen.getByText(/January.*2024/)).toBeInTheDocument();
  });

  it('opens calendar when clicked', () => {
    render(<DatePicker onDateChange={mockOnDateChange} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    render(<DatePicker onDateChange={mockOnDateChange} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ph-date-picker-trigger');
  });
}); 