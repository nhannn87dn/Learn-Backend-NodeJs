import { Table, Pagination, Card, Button, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ProductType } from '../product.type';
import React from 'react';

interface ProductTableProps {
  data?: ProductType[];
  loading: boolean;
  columns: ColumnsType<ProductType>;
  page: number;
 onPageChange: (page: number, pageSize: number) => void;
  onAddClick: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  data,
  loading,
  columns,
  page,
  onPageChange,
  onAddClick,
}) => {
  return (
    <Card
      title="Product List"
      extra={
        <Button type="primary" onClick={onAddClick}>
          Thêm mới
        </Button>
      }
    >
      {loading ? (
        <Spin tip="Loading">
          <div className="content" />
        </Spin>
      ) : (
        <>
          <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />
          <div style={{ textAlign: 'right', marginTop: 30 }}>
            <Pagination
              defaultCurrent={page}
              total={30} // Example total, replace with actual total from API
              showSizeChanger={false}
              onChange={onPageChange}
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
        </>
      )}
    </Card>
  );
};

export default ProductTable;
