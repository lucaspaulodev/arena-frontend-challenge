import { render, screen, waitFor } from '@testing-library/react'
import PostList from '../PostList'
import { usePosts } from '@/hooks/usePosts'
import '@testing-library/jest-dom'

jest.mock('@/hooks/usePosts')
const mockedUsePosts = usePosts as jest.Mock

class MockIntersectionObserver {
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
    constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
        callback([{ isIntersecting: true } as IntersectionObserverEntry]);
    }
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof window.IntersectionObserver;

const mockPost = {
    id: '1',
    name: 'Test Product',
    tagline: 'A cool product',
    thumbnail: { url: 'https://example.com/img.png' },
    votesCount: 123,
};

jest.mock('react-window', () => {
    return {
        FixedSizeList: ({ children, itemCount }: { children: (props: { index: number, style: React.CSSProperties }) => React.ReactNode, itemCount: number }) => (
            <div>
                {Array.from({ length: itemCount }, (_, index) =>
                    <div key={index}>{children({ index, style: {} })}</div>
                )}
            </div>
        ),
    }
})

describe('PostList', () => {
    it('shows loading skeletons on initial load', () => {
        mockedUsePosts.mockReturnValue({
            posts: [],
            loading: true,
            error: null,
            loadMore: jest.fn(),
            hasNextPage: true,
        })

        render(<PostList orderBy="VOTES" onItemClick={() => {}} />)
        expect(screen.getAllByTestId('loading-skeleton')).toHaveLength(5)
    })

    it('shows error message when fetching fails', () => {
        mockedUsePosts.mockReturnValue({
            posts: [],
            loading: false,
            error: { message: 'Failed to fetch' },
            loadMore: jest.fn(),
            hasNextPage: false,
        })

        render(<PostList orderBy="VOTES" onItemClick={() => {}} />)
        expect(screen.getByText(/Error fetching posts/i)).toBeInTheDocument()
        expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument()
    })

    it('renders posts in list', async () => {
        mockedUsePosts.mockReturnValue({
            posts: [mockPost],
            loading: false,
            error: null,
            loadMore: jest.fn(),
            hasNextPage: true,
        })

        render(<PostList orderBy="NEWEST" onItemClick={() => {}} />)

        await waitFor(() => {
            expect(screen.getByText('Test Product')).toBeInTheDocument()
            expect(screen.getByText('A cool product')).toBeInTheDocument()
        })
    })

    it('calls loadMore when last element intersects', () => {
        const loadMoreMock = jest.fn()

        mockedUsePosts.mockReturnValue({
            posts: [mockPost],
            loading: false,
            error: null,
            loadMore: loadMoreMock,
            hasNextPage: true,
        })

        render(<PostList orderBy="VOTES" onItemClick={() => {}} />)

        expect(loadMoreMock).toHaveBeenCalled()
    })
})
