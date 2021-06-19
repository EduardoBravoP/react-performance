import { memo, useState } from "react"
import { AddProductToWishlistProps } from './AddProductToWishlist'
import dynamic from 'next/dynamic'
import lodash from 'lodash'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  }
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
  
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishlist(true)} >Adiconar aos favoritos</button>

      { isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      ) }
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
})