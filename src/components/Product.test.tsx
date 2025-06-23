import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from './Product';

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(
      <ProductCard
        name="Test Product"
        tagline="This is a test product."
        thumbnailUrl="/test-thumbnail.png"
        votesCount={42}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product.')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', '/test-thumbnail.png');
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('VOTES')).toBeInTheDocument();
  });
}); 