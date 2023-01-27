import Pricing from 'components/Pricing';
import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';
import { useState } from 'react';
import { postData } from '@/utils/helpers';
import { getURL } from '../utils/helpers';

interface Props {
  products: Product[];
}

export default function PricingPage({ products }: Props) {
  return <Pricing products={products} />;
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getActiveProductsWithPrices();

  return {
    props: {
      products
    },
    revalidate: 60
  };
}
