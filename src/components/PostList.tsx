import { usePosts } from '@/hooks/usePosts'
import { useCallback, useRef } from 'react';
import { FixedSizeList as List } from 'react-window'
import ProductCard from './Product';

interface PostListProps {
    orderBy: 'VOTES' | 'NEWEST';
}

function PostList({ orderBy }: PostListProps) {
    const { posts, loading, error, loadMore, hasNextPage } = usePosts(orderBy);
    
    const observer = useRef<IntersectionObserver | null>(null);

    const lastPostElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasNextPage) {
                    loadMore();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasNextPage, loadMore]
    );

    if (loading && posts.length === 0) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching posts: {error.message}</p>;
    }

    const Item = ({ index, style }: { index: number, style: React.CSSProperties }) => {
        const post = posts[index];
        const isLastElement = index === posts.length - 1;
        return (
            <div style={style} ref={isLastElement ? lastPostElementRef : null}>
                <ProductCard
                    name={post.name}
                    tagline={post.tagline}
                    thumbnailUrl={post.thumbnail.url}
                    votesCount={post.votesCount}
                />
            </div>
        );
    }

    return (
        <List height={600} itemCount={posts.length} itemSize={120} width={'100%'}>
            {Item}
        </List>
    )
}

export default PostList