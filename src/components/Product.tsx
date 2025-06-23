interface ProductCardProps {
  name: string;
  tagline: string;
  thumbnailUrl: string;
  votesCount: number;
  onItemClick?: () => void;
}

function ProductCard({ name, tagline, thumbnailUrl, votesCount, onItemClick }: ProductCardProps) {
  return (
    <div className="card-ph p-4 flex items-center cursor-pointer" onClick={onItemClick}>
      <img src={thumbnailUrl} alt={name} className="w-20 h-20 mr-4 rounded-md border" />
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-[var(--ph-dark)]">{name}</h3>
        <p className="text-muted-foreground">{tagline}</p>
      </div>
      <div className="text-center ml-4">
        <div className="text-2xl font-bold ph-orange text-[var(--ph-orange)]">{votesCount}</div>
        <div className="text-sm text-muted-foreground">VOTES</div>
      </div>
    </div>
  );
};

export default ProductCard;
