import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';
import { startOfDay, endOfDay } from 'date-fns';
import { type PostsData, type PostEdge } from '../types';

export const usePosts = (order: 'VOTES' | 'NEWEST', date?: Date) => {
    const variables: { order: 'VOTES' | 'NEWEST'; first: number; postedAfter?: Date; postedBefore?: Date } = {
        order,
        first: 20,
    };

    if (date) {
        variables.postedAfter = startOfDay(date);
        variables.postedBefore = endOfDay(date);
    }

    const { data, loading, error, fetchMore } = useQuery<PostsData>(GET_POSTS, {
        variables,
        notifyOnNetworkStatusChange: true,
    });

    const posts = data?.posts.edges.map((edge: PostEdge) => edge.node) || [];
    const pageInfo = data?.posts.pageInfo;

    const loadMore = () => {
        if (pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    after: pageInfo.endCursor,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        posts: {
                            ...prev.posts,
                            edges: [...prev.posts.edges, ...fetchMoreResult.posts.edges],
                            pageInfo: fetchMoreResult.posts.pageInfo,
                        },
                    };
                },
            });
        }
    };

    return { posts, loading, error, loadMore, hasNextPage: pageInfo?.hasNextPage };
};