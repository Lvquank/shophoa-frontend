import "../styles/pages/Home.css"
import Intro from "../components/Intro"
import OpeningFlowersCard from "../components/OpeningFlowerCard"
import hoaKhaiTruong from "../assets/images/hoa-khai-truong.webp"
import hoaDamTang from "../assets/images/hoa-dam-tang.webp"
import TitleSection from "../components/TitleSection"
import FlowerCard from "../components/FlowerCard"
import CategoryGrid from "../components/CategoryGrid"
import RelatedProducts from "../components/RelatedProducts"
import NewsCard from "../components/NewsCard"
import { Link } from "react-router-dom"
import ServicesSection from "../components/ServicesSection"
import { useEffect, useState } from "react"
import categoryHoaKhaiTruong from "../assets/images/hoakhaitruong-218x341-1.webp"
import categoryHoaDamTang from "../assets/images/hoadamtang-218x341-1.webp"
import categoryHoaGio from "../assets/images/hoa-gio.jpg"
import categoryHoaBo from "../assets/images/hoa-bo.webp"
import newsImage from "../assets/images/hoa-gio.webp"
import newsImage2 from "../assets/images/Hoa-Dam-Tang-Long-Huong.webp"
import openingFlowerImage from "../assets/images/banner-d2.webp"
import openingFlowerImage2 from "../assets/images/banner-d4.webp"

function Home() {
    const [topSellingProducts, setTopSellingProducts] = useState([])
    const [productsKhaiTruong, setProductsKhaiTruong] = useState([])
    const [productsDamTang, setProductsDamTang] = useState([])
    const [productsGio, setProductsGio] = useState([])
    const [productsBo, setProductsBo] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])

    // Hàm lấy sản phẩm theo category truyền vào (ĐÃ SỬA)
    const fetchCategoryProducts = (category, setProducts) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products/category/${category}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Xử lý lại mảng dữ liệu để tạo URL ảnh đầy đủ
                    const formattedData = data.data.map(product => ({
                        ...product, // Giữ lại tất cả thông tin cũ của sản phẩm
                        // Ghi đè lại thuộc tính 'image' với URL đầy đủ
                        image: product.image
                            ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/${product.image.replace(/^\//, '')}`
                            : hoaKhaiTruong // Sử dụng ảnh mặc định nếu không có ảnh
                    }));

                    setProducts(formattedData); // Cập nhật state với dữ liệu đã được xử lý
                }
            })
    }

    useEffect(() => {
        // Lấy top sản phẩm bán chạy
        fetch(`${import.meta.env.VITE_API_URL}/api/products/top`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const formattedTopProducts = data.data.map(product => ({
                        ...product,
                        image: product.image
                            ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/${product.image.replace(/^\//, '')}`
                            : hoaKhaiTruong
                    }));
                    setTopSellingProducts(formattedTopProducts.slice(0, 4))
                }
            })

        // Lấy sản phẩm cho các category
        fetchCategoryProducts("hoa-khai-truong", setProductsKhaiTruong)
        fetchCategoryProducts("hoa-dam-tang", setProductsDamTang)
        fetchCategoryProducts("hoa-gio", setProductsGio)
        fetchCategoryProducts("hoa-bo", setProductsBo)
    }, [])

    useEffect(() => {
        // Lấy sản phẩm cho phần "Có thể bạn quan tâm"
        fetch(`${import.meta.env.VITE_API_URL}/api/products/top`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const formattedProducts = data.data.map(product => ({
                        id: product.id,
                        imageUrl: product.image
                            ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/${product.image.replace(/^\//, '')}`
                            : hoaKhaiTruong,
                        title: product.title
                    }))
                    setRelatedProducts(formattedProducts)
                }
            })
    }, [])

    // Dữ liệu tĩnh
    const categoryDataHoaKhaiTruong = { imageUrl: categoryHoaKhaiTruong, title: "HOA KHAI TRƯƠNG" }
    const categoryDataHoaDamTang = { imageUrl: categoryHoaDamTang, title: "HOA TANG LỄ" }
    const categoryDataHoaGio = { imageUrl: categoryHoaGio, title: "HOA GIỎ" }
    const categoryDataHoaBo = { imageUrl: categoryHoaBo, title: "HOA BÓ" }

    const OpeningFlower = [
        { imageUrl: hoaKhaiTruong, title: "Hoa khai trương", productCount: 3, link: "/danh-muc/hoa-khai-truong" },
        { imageUrl: hoaDamTang, title: "Hoa đám tang", productCount: 14, link: "/danh-muc/hoa-dam-tang" },
    ]

    const topProducts = [
        { imageUrl: openingFlowerImage, title: "Hoa khai trương" },
        { imageUrl: openingFlowerImage2, title: "Hoa đám tang" },
    ]

    const newsData = [
        { id: "1", imageUrl: newsImage, title: "Đặt hoa 20/10 món quà ý nghĩa ngày phụ nữ Việt Nam.", date: "03/10/2022", excerpt: "Hoa 20/10 món quà thay cho lời cảm ơn và sự quan ..." },
        { id: "2", imageUrl: newsImage2, title: "Đặt Hoa Đám Tang – Hoa Tang lễ Giao Tận Nơi", date: "28/09/2022", excerpt: "Đặt hoa đám tang - Hoa tang lễ giao tận nơi ..." },
    ]

    return (
        <div className="min-vh-100 d-flex flex-column">
            <div className="main-content flex-grow-1">
                {/* Intro Section */}
                <div className="intro-section mb-5">
                    <div className="row h-100">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-9 col-md-12">
                            <Intro />
                        </div>
                    </div>
                </div>

                {/* Product Categories Section */}
                <div className="product-categories-section">
                    <div className="container">
                        {/* Title */}
                        <div className="row mb-4">
                            <div className="col-12 text-center">
                                <h2 className="section-title">SHOP HOA TƯƠI</h2>
                                <div className="title-underline"></div>
                            </div>
                        </div>

                        {/* Product Cards */}
                        <div className="row justify-content-center">
                            {OpeningFlower.map((item, index) => (
                                <OpeningFlowersCard
                                    key={index}
                                    imageUrl={item.imageUrl}
                                    title={item.title}
                                    productCount={item.productCount}
                                    link={item.link}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <TitleSection title="TOP BÁN CHẠY" />
                <div className="row mb-4">
                    {topSellingProducts.map((product, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <FlowerCard
                                key={product.id}
                                imageUrl={product.image}
                                title={product.title}
                                buttonText="Đặt mua"
                                buttonType="order"
                                productId={product.id}
                                category={product.category}
                                link={`/cua-hang/${product.id}`}
                            />
                        </div>
                    ))}
                </div>
                <div className="row justify-content-center">
                    {topProducts.map((item, index) => (
                        <OpeningFlowersCard
                            key={index}
                            imageUrl={item.imageUrl}
                        />
                    ))}
                </div>
                <TitleSection title="HOA KHAI TRƯƠNG" linkTo={"danh-muc/hoa-khai-truong/"} />
                <CategoryGrid categoryCard={categoryDataHoaKhaiTruong} products={productsKhaiTruong} />
                <TitleSection title="HOA TANG LỄ" linkTo={"danh-muc/hoa-dam-tang/"} />
                <CategoryGrid categoryCard={categoryDataHoaDamTang} products={productsDamTang} />
                <TitleSection title="HOA GIỎ" linkTo={"danh-muc/hoa-gio/"} />
                <CategoryGrid categoryCard={categoryDataHoaGio} products={productsGio} />
                <TitleSection title="HOA BÓ" linkTo={"danh-muc/hoa-bo/"} />
                <CategoryGrid categoryCard={categoryDataHoaBo} products={productsBo} />
            </div>
            <div className="related-products">
                <RelatedProducts products={relatedProducts} title="CÓ THỂ BẠN QUAN TÂM :" />
            </div>
            <div className="related-products">
                <div className="col-12 text-center">
                    <h2 className="section-title">TIN TỨC - BÀI VIẾT - SHOP HOA</h2>
                    <div className="title-underline"></div>
                </div>
                <section className="related-products py-5">
                    <div className="container">
                        <div className="row">
                            {newsData.slice(0, 2).map((article) => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                        </div>

                        {/* Xem thêm Button */}
                        <div className="text-center mt-4">
                            <Link to="/tin-tuc" className="btn-primary-custom px-4 py-2">
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <ServicesSection />
        </div>
    )
}

export default Home