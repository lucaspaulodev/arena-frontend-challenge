interface ProductCardProps {
  name: string;
  tagline: string;
  thumbnailUrl: string;
  votesCount: number;
}

function ProductCard({ name, tagline, thumbnailUrl, votesCount }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 flex items-center cursor-pointer hover:bg-accent">
      <img src={thumbnailUrl} alt={name} className="w-20 h-20 mr-4 rounded-md" />
      <div className="flex-grow">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-muted-foreground">{tagline}</p>
      </div>
      <div className="text-center ml-4">
        <div className="text-2xl font-bold">{votesCount}</div>
        <div className="text-sm text-muted-foreground">VOTES</div>
      </div>
    </div>
  );
};

export default ProductCard;
