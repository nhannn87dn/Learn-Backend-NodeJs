import { Button, Card, Flex } from 'antd'
import ProductList from './components/ProductList'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { IProductListResponse } from './product.type';
import { getProducts, deleteProductById } from './product.service';
import { useSearchParams } from 'react-router';

const ProductsPage = () => {
  /***|---------PAGINATION------------- */
  const [params] = useSearchParams();
  const p = params.get("page");
  const l = params.get("limit");
  const page  = p ? parseInt(p) : 1;
  const limit = l ? parseInt(l) : 10;


  const queryClient = useQueryClient()

  console.log('page', page);
  console.log('limit', limit);

  /***|---------BEGIN PRODUCT LIST------------- */
  const queryProducts = useQuery<IProductListResponse>({
    queryKey: ['products', page, limit],
    queryFn: ()=>getProducts({
      page,
      limit
    }),
  });
  console.log('<<=== 🚀  queryProducts===>>',queryProducts.data);
  /***|---------END PRODUCT LIST------------- */

  /***|---------DELETE PRODUCT------------- */
  
  const mutationDeleteProduct = useMutation({
    mutationFn: deleteProductById,
    onSuccess: ()=>{
      //TODO: alert
      console.log('ok, xoa sp thanh cong')
      //làm tươi lại danh sách
      queryClient.invalidateQueries(['products', page, limit])
      
    },
    onError: (err)=>{
      console.log(err)
    }
  });
  const handleDeleteProduct = (id: string) => {
    mutationDeleteProduct.mutate(id)
  }
  /***|---------END DELETE PRODUCT------------- */

  return (
    <>
     <Card title="Products manager" extra={<Flex>
      <Button type="primary">Add Product</Button>
      </Flex>} >
      <ProductList 
      data={queryProducts.data?.items || []} 
      pagination={queryProducts.data?.pagination || null}
      isLoading={queryProducts.isLoading}
      onHandleDelete={handleDeleteProduct}
      />
    </Card>
    </>
  )
}

export default ProductsPage