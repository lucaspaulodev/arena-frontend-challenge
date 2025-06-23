import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PostListItem } from '../PostList';
import type { Post } from '@/types';

describe('PostListItem', () => {
  const mockPost: Post = {
    id: '1',
    name: 'Mock Post',
    tagline: 'A mock tagline',
    thumbnail: { url: '/mock-thumbnail.png' },
    votesCount: 99,
  };

  it('renders a post correctly', () => {
    const mockRef = jest.fn();
    render(
      <PostListItem
        index={0}
        style={{}}
        posts={[mockPost]}
        lastPostElementRef={mockRef}
      />
    );
    expect(screen.getByText('Mock Post')).toBeInTheDocument();
    expect(screen.getByText('A mock tagline')).toBeInTheDocument();
    expect(screen.getByAltText('Mock Post')).toHaveAttribute('src', '/mock-thumbnail.png');
    expect(screen.getByText('99')).toBeInTheDocument();
    expect(screen.getByText('VOTES')).toBeInTheDocument();
  });
}); 