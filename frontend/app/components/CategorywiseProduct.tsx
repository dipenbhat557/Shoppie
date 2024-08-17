import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ProductData, productState } from '../utils/store'
import ProductItem from './ProductItem'
import Link from 'next/link'

const CategorywiseProduct = ({category}:{category:string}) => {
    const products = useRecoilValue(productState)
    const [items,setItems] = useState<ProductData[]>([])

    useEffect(()=>{
        setItems(products?.filter(p=>p?.category == category))
    },[category])

  return (
    <div className="container mx-auto px-4 border border-grey-800 mt-2 p-2 rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold my-8 text-grey-800">
          {category?.toLocaleUpperCase()}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items?.slice(0,4)?.map((product: ProductData,index:number) => {
            return <ProductItem key={index} product={product}/>
          })}
        </div>
        <div className="text-center mt-8">
          <Link href={`/products/category/${category}`}>
            <p className="text-grey-800 hover:underline text-right">View All Products</p>
          </Link>
        </div>
      </div>
  )
}

export default CategorywiseProduct