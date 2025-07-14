import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductSearchBar from '../components/ProductSearchBar';
import ProductSidebar from '../components/ProductSidebar';
import FlowerCard from '../components/FlowerCard';
import hoaKhaiTruong from "../assets/images/hoa-khai-truong.webp"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/pages/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const category = searchParams.get('category');
    const keyword = searchParams.get('keyword');

    // Nếu có tham số tìm kiếm, sử dụng API search
    if (category || keyword) {
      fetch(`${import.meta.env.VITE_API_URL}/api/products/search?category=${category || 'all'}&keyword=${keyword || ''}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProducts(data.data || []);
          }
        })
        .catch(err => console.error('Error searching products:', err));
    } else {
      // Nếu không có tham số tìm kiếm, lấy tất cả sản phẩm
      fetch(`${import.meta.env.VITE_API_URL}/api/products`)
        .then(res => res.json())
        .then(data => setProducts(data.data || []))
        .catch(err => console.error('Error fetching products:', err));
    }
  }, [location.search]); // Thêm location.search vào dependencies để useEffect chạy lại khi URL thay đổi

  const handleProductClick = (id) => {
    navigate(`/cua-hang/${id}`);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <ProductSearchBar />
      <div className="container-fluid wrapper-product">
        <div className="row">
          <div className="col-lg-3 col-md-12">
            <ProductSidebar />
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="row g-4">

              {products.map((product, index) => (
                <div
                  key={product.id || index}
                  className="col-lg-3 col-md-6 col-6"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleProductClick(product.id)}
                >
                  <FlowerCard
                    key={product.id || index}
                    imageUrl={
                      product.image
                        ? product.image.replace("http://localhost:8000", import.meta.env.VITE_API_URL)
                        : hoaKhaiTruong
                    }

                    title={product.title}
                    buttonText="Đặt mua"
                    buttonType="order"
                    productId={product.id}
                    category={product.category}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;