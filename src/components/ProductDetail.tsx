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
      <DialogContent 
        className="max-w-lg w-full p-0 bg-[var(--ph-light)] rounded-2xl shadow-xl border-none"
        aria-describedby="product-description"
      >
        <div className="relative p-6">
          {loading && <p className="text-center text-muted-foreground py-8">Loading...</p>}
          {error && <p className="text-center text-destructive py-8">Error: {error.message}</p>}
          {postDetails && (
            <>
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl font-extrabold text-[var(--ph-dark)] mb-1">
                  {postDetails.name}
                </DialogTitle>
                <DialogDescription id="product-description" className="text-lg text-muted-foreground mb-2">
                  {postDetails.tagline}
                </DialogDescription>
              </DialogHeader>
              <div className="mb-4">
                <p className="text-base text-[var(--ph-dark)] leading-relaxed mb-4">{postDetails.description}</p>
                {postDetails.topics && postDetails.topics.edges.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-bold text-[var(--ph-dark)] mb-2">Topics</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {postDetails.topics.edges.map(({ node }: TopicEdge) => (
                        <span key={node.name} className="bg-[var(--ph-gray)] text-[var(--ph-dark)] px-3 py-1 rounded-full text-sm font-medium">
                          {node.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-2">
                  <h4 className="font-bold text-[var(--ph-dark)]">Comments <span className="font-normal text-muted-foreground">({postDetails.commentsCount})</span></h4>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
