import { ShoppingCart, Eye } from 'lucide-react';
import { ShopifyProduct, CartItem } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const compareAtPrice = firstVariant?.compareAtPrice;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  const discountPercent = hasDiscount 
    ? Math.round(((parseFloat(compareAtPrice.amount) - parseFloat(price.amount)) / parseFloat(compareAtPrice.amount)) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    const cartItem: CartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };

    addItem(cartItem);
    toast.success('Added to cart!', {
      description: node.title,
      position: 'top-center'
    });
  };

  return (
    <Link
      to={`/product/${node.handle}`}
      className="group glass-card overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleAddToCart}
            className="p-3 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <div className="p-3 bg-secondary text-foreground rounded-full">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {node.description || 'Premium 3D printed collectible'}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-primary">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded">
                  -{discountPercent}%
                </span>
              )}
            </div>
            {hasDiscount && compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {compareAtPrice.currencyCode} {parseFloat(compareAtPrice.amount).toFixed(2)}
              </span>
            )}
          </div>
          {firstVariant?.availableForSale ? (
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-xs text-destructive bg-destructive/10 px-2 py-1 rounded-full">
              Sold Out
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
