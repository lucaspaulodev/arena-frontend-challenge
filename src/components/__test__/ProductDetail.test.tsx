import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import ProductDetail from '../ProductDetail';
import { MockedProvider } from '@apollo/client/testing';
import { GET_POST_DETAILS } from '@/graphql/queries';
import type { Post, PostDetailsData } from '@/types';

const mockPost: Post = {
  id: '1',
  name: 'Mock Product',
  tagline: 'A mock tagline',
  thumbnail: { url: '/mock-thumbnail.png' },
  votesCount: 99,
};

const mockPostDetails: PostDetailsData = {
  post: {
    ...mockPost,
    description: 'A detailed description',
    commentsCount: 5,
    topics: {
      edges: [
        { node: { name: 'Tech' } },
        { node: { name: 'Startup' } },
      ],
    },
  },
};

const mocks = [
  {
    request: {
      query: GET_POST_DETAILS,
      variables: { id: mockPost.id },
    },
    result: { data: mockPostDetails },
  },
];

describe('ProductDetail Modal', () => {
  it('renders and displays post details when open', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductDetail post={mockPost} isOpen={true} onClose={jest.fn()} />
      </MockedProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Mock Product')).toBeInTheDocument();
      expect(screen.getByText('A mock tagline')).toBeInTheDocument();
      expect(screen.getByText('A detailed description')).toBeInTheDocument();
      expect(screen.getByText('Tech')).toBeInTheDocument();
      expect(screen.getByText('Startup')).toBeInTheDocument();
      expect(screen.getByText(/comments/i)).toBeInTheDocument();
      expect(screen.getByText('(5)')).toBeInTheDocument();
    });
  });

  it('shows error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_POST_DETAILS,
          variables: { id: mockPost.id },
        },
        error: new Error('Failed to fetch'),
      },
    ];
    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <ProductDetail post={mockPost} isOpen={true} onClose={jest.fn()} />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });

  it('does not render when post is null', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductDetail post={null} isOpen={true} onClose={jest.fn()} />
      </MockedProvider>
    );
    // Should not show any product details
    expect(screen.queryByText('Mock Product')).not.toBeInTheDocument();
  });
}); 