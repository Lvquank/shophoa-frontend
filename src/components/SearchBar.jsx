import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SearchBar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Danh mục sản phẩm');
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = () => {
        if (!searchTerm && selectedCategory === 'Danh mục sản phẩm') return;

        let category = 'all';
        switch (selectedCategory) {
            case 'Bán chạy nhất':
                category = 'ban-chay-nhat';
                break;
            case 'Hoa Bó':
                category = 'hoa-bo';
                break;
            case 'Hoa Đám Tang':
                category = 'hoa-dam-tang';
                break;
            case 'Hoa Giỏ':
                category = 'hoa-gio';
                break;
            case 'Hoa Khai Trương':
                category = 'hoa-khai-truong';
                break;
            case 'Khuyến mãi':
                category = 'khuyen-mai';
                break;
            default:
                category = 'all';
        }

        navigate(`/tim-kiem?category=${category}&keyword=${encodeURIComponent(searchTerm)}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="input-group bg-white">
            <div className="dropdown" ref={dropdownRef}>
                <button
                    className="btn dropdown-toggle"
                    style={{ fontWeight: '400' }}
                    type="button"
                    aria-expanded={isOpen}
                    onClick={toggleDropdown}
                >
                    {selectedCategory}
                </button>
                <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                    <li>
                        <Link
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            onClick={() => {
                                setSelectedCategory('Danh mục sản phẩm');
                                setIsOpen(false);
                            }}
                        >
                            <div>
                                Danh mục sản phẩm
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            onClick={() => {
                                setSelectedCategory('Bán chạy nhất');
                                setIsOpen(false);
                            }}
                        >
                            <div>
                                Bán chạy nhất
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            onClick={() => {
                                setSelectedCategory('Hoa Bó');
                                setIsOpen(false);
                            }}
                        >
                            <div>
                                Hoa Bó
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            onClick={() => {
                                setSelectedCategory('Hoa Đám Tang');
                                setIsOpen(false);
                            }}
                        >
                            <div>
                                Hoa Đám Tang
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            onClick={() => {
                                setSelectedCategory('Hoa Giỏ');
                                setIsOpen(false);
                            }}
                        >
                            <div>
                                Hoa Giỏ
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            onClick={() => {
                                setSelectedCategory('Hoa Khai Trương');
                                setIsOpen(false);
                            }}
                        >
                            <div>
                                Hoa Khai Trương
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            onClick={() => {
                                setSelectedCategory('Khuyến mãi');
                                setIsOpen(false);
                            }}
                        >
                            <div>
                                Khuyến mãi
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            <input
                type="text"
                className="form-control border-0"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button
                className="btn btn-primary-color text-white"
                onClick={handleSearch}
            >
                <i className="bi bi-search"></i>
            </button>
        </div>
    );
}

export default SearchBar;