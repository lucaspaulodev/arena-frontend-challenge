import { usePosts } from '@/hooks/usePosts'
import { useCallback, useRef } from 'react';
import { FixedSizeList as List } from 'react-window'
import ProductCard from './Product';
import type { Post } from '@/types';

interface PostListProps {
    orderBy: 'VOTES' | 'NEWEST';
    onItemClick: (product: Post) => void;
    date?: Date;
}

export const PostListItem = ({
  index,
  style,
  posts,
  lastPostElementRef,
  onItemClick
  
}: {
  index: number;
  style: React.CSSProperties;
  posts: Post[];
  lastPostElementRef: (node: HTMLDivElement) => void;
  onItemClick: (product: Post) => void;
}) => {
  const post = posts[index];
  const isLastElement = index === posts.length - 1;
  return (
    <div style={{ ...style, width: '90%', justifySelf: 'anchor-center' }} ref={isLastElement ? lastPostElementRef : null}>
      <ProductCard
        name={post.name}
        tagline={post.tagline}
        thumbnailUrl={post.thumbnail.url}
        votesCount={post.votesCount}
        onItemClick={() => onItemClick(post)}
      />
    </div>
  );
};

function PostList({ orderBy, onItemClick, date }: PostListProps) {
    const { posts, loading, error, loadMore, hasNextPage } = usePosts(orderBy, date);
    
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
        return (
            <div style={{ padding: '2rem' }}>
                {[...Array(5)].map((_, i) => (
                    <div data-testid="loading-skeleton" key={i} className="skeleton-ph mb-4" />
                ))}
            </div>
        );
    }

    if (error) {
        return <p>Error fetching posts: {error.message}</p>;
    }

    const Item = ({ index, style }: { index: number, style: React.CSSProperties }) => (
      <PostListItem
        index={index}
        style={style}
        posts={posts}
        lastPostElementRef={lastPostElementRef}
        onItemClick={onItemClick}
      />
    );

    return (
        <List height={600} itemCount={posts.length} itemSize={140} width={'100%'} className="react-window__outer">
            {Item}
        </List>
    )
}

export default PostList