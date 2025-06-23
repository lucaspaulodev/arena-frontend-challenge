export interface Thumbnail {
    url: string;
}

export interface TopicNode {
    name: string;
}

export interface TopicEdge {
    node: TopicNode;
}

export interface Post {
    id: string;
    name: string;
    tagline: string;
    thumbnail: Thumbnail;
    votesCount: number;
    description?: string;
    commentsCount?: number;
    topics?: {
        edges: TopicEdge[];
    };
}

export interface PageInfo {
    endCursor: string;
    hasNextPage: boolean;
}

export interface PostEdge {
    cursor: string;
    node: Post;
}

export interface PostsData {
    posts: {
        edges: PostEdge[];
        pageInfo: PageInfo;
    };
}

export interface PostDetailsData {
    post: Post;
  }



