import { Button, Card} from 'antd';
import ProductsList from './components/ProductsList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, deleteProductById, getBrands, getProductById, getProducts, updateProductById } from './product.service';
import { useNavigate, useSearchParams } from 'react-router';
import { useAppMessage } from '../../stores/useAppMessage';
import ProductAdd from './components/ProductAdd';
import { useState } from 'react';
import { getAllCategories } from '../categories/categories.service';
import type { IProduct } from './product.type';
import ProductEdit from './components/ProductEdit';


//hàm quản lý Cache
const PRODUCTS_QUERY_KEY = {
  all: (page: number, limit: number)=>{
    return ['products', page, limit];
  },

}

const ProductsPage = () => {
  const navigate  = useNavigate();
  const {sendMessage } = useAppMessage();
  //Lấy param từ url
  const [params] = useSearchParams();
  const page = Number(params.get('page')) || 1;
  const limit = Number(params.get('limit')) || 10;

  /** CODE FETCH DỮ LIỆU TỪ COMPONENT CHA */
  const queryClient = useQueryClient()
  /** PRODUCTS LIST */
  const queryProducts = useQuery({ 
    //đưa page và limit vào để dynamic cache
    queryKey: PRODUCTS_QUERY_KEY.all(page, limit),
    queryFn: () => getProducts({page, limit}), 
  });
  console.log('<<=== 🚀 queryProducts ===>>', queryProducts.data);
  // Hàm xử lý phân trang
  const onHandleChangePage = (page: number, pageSize: number = 10) => {
    console.log('<<=== 🚀 page, pageSize ===>>', page, pageSize);
    navigate(`?page=${page}&limit=${pageSize}`);
  }
  /** END PRODUCTS LIST */

  /** DELETE PRODUCT */
 const deleteProduct = useMutation({
    mutationFn: deleteProductById,
    //Khi xoá thành công thì gọi lại hàm fetch dữ liệu
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY.all(page, limit) })
      //Báo xoá thành công
      sendMessage({msg: 'Delete product successfully', type: 'success'});
    },
    onError: (error) => {
      // Báo lỗi khi xoá
      console.log('<<=== 🚀 delete product error ===>>', error);
      sendMessage({msg: 'Delete product failed', type: 'error'});
    }
  })
  /** END DELETE PRODUCT */

   {/* ADD PRODUCT */}
   const [isModalAddOpen, setIsModalAddOpen] =  useState(false);
    const mutationAddProduct = useMutation({
     
    mutationFn: createProduct,
    //Khi xoá thành công thì gọi lại hàm fetch dữ liệu
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY.all(page, limit) })
      //Báo xoá thành công
      sendMessage({msg: 'Create product successfully', type: 'success'});
    },
    onError: (error) => {
      // Báo lỗi khi xoá
      console.log('<<=== 🚀 create product error ===>>', error);
      sendMessage({msg: 'Create product failed', type: 'error'});
    }
  })
    {/* END PRODUCT */}

    /** LẤY DANH SÁCH DANH MỤC */
    const queryCategories = useQuery({ 
      queryKey: ['categories-all'],
      queryFn: () => getAllCategories({page: 1, limit: 100}), 
    });
    console.log('<<=== 🚀 queryCategories ===>>', queryCategories.data);
    /** END LẤY DANH SÁCH DANH MỤC */

    /** LẤY DANH SÁCH THƯƠNG HIỆU */
    const queryBrands = useQuery({ 
      queryKey: ['brands-all'],
      queryFn: () => getBrands(), 
    });
    console.log('<<=== 🚀 queryBrands ===>>', queryBrands.data);
    /** END LẤY DANH SÁCH THƯƠNG HIỆU */


     /** EDIT PRODUCT */
     const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
     const [isModalEditOpen, setIsModalEditOpen] = useState(false);
     const queryProductDetails = useQuery({
      enabled: !!selectedProduct,
      queryKey: ['product-details', selectedProduct?._id],
      queryFn: ()=>getProductById(selectedProduct!._id),
     });

     console.log('<<=== 🚀 queryProductDetails.data ===>>',queryProductDetails.data);
     
     const mutationEditProduct = useMutation({
      mutationFn: updateProductById,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY.all(page, limit) });
        sendMessage({msg: 'Edit product successfully', type: 'success'});
      },
      onError: (error) => {
        console.log('<<=== 🚀 edit product error ===>>', error);
        sendMessage({msg: 'Edit product failed', type: 'error'});
      }
    });


  return (
     <Card 
     title="Products List" 
     extra={<>
     <Button type="primary" onClick={() => setIsModalAddOpen(true)}>Add Category</Button>
     </>} 
     >
      {/* PRODUCT LIST */}
      <title>Products List</title>
      <ProductsList 
      onEditProduct={(product) => {
        setSelectedProduct(product);
        setIsModalEditOpen(true);
      }}
      isLoading={queryProducts.isLoading}
      onHandleChangePage={onHandleChangePage}
      totalRecords={queryProducts?.data?.pagination?.totalRecords ?? 0}  
      data={queryProducts?.data?.items ?? []}
      onDeleteProduct={(id: string) => deleteProduct.mutate(id)}
      />
       {/* END PRODUCT LIST */}

        {/* ADD PRODUCT */}
        <ProductAdd
        categories={queryCategories?.data ?? []}
        brands={queryBrands?.data ?? []}
        onAddProduct={async (product) => {
          console.log('<<=== 🚀 new product ===>>', product);
          await mutationAddProduct.mutateAsync(product);
        }}
        isModalOpen={isModalAddOpen}
        handleOk={() => {
          setIsModalAddOpen(false);
        }}
        handleCancel={() => {
          setIsModalAddOpen(false);
        }}
        />
        {/* END ADD PRODUCT */}

        {/* EDIT PRODUCT */}
        {selectedProduct && queryProductDetails.data && (
          <ProductEdit
        product={queryProductDetails?.data}
        categories={queryCategories?.data ?? []}
        brands={queryBrands?.data ?? []}
        onEditProduct={async (product) => {
          console.log('<<=== 🚀 edited product ===>>', product);
          await mutationEditProduct.mutateAsync({
            id: selectedProduct._id,
            product
          });
        }}
        isModalOpen={isModalEditOpen}
        handleOk={() => {
          setIsModalEditOpen(false);
        }}
        handleCancel={() => {
          setIsModalEditOpen(false);
        }}
        />
        )}
    </Card>
  )
}

export default ProductsPage