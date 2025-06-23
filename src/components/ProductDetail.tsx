import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POST_DETAILS } from '@/graphql/queries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Post, PostDetailsData, TopicEdge } from '@/types';


interface ProductDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailModalProps> = ({ post, isOpen, onClose }) => {
  const { data, loading, error } = useQuery<PostDetailsData>(GET_POST_DETAILS, {
    variables: { id: post?.id },
    skip: !post,
  });

  const postDetails = data?.post;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {postDetails && (
          <>
            <DialogHeader>
              <DialogTitle>{postDetails.name}</DialogTitle>
              <DialogDescription>{postDetails.tagline}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p>{postDetails.description}</p>
              {postDetails.topics && (
                <div className="mt-4">
                  <h4 className="font-bold">Topics</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {postDetails.topics.edges.map(({ node }: TopicEdge) => (
                      <span key={node.name} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                        {node.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4">
                <h4 className="font-bold">Comments ({postDetails.commentsCount})</h4>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
