import "../styles/components/OpeningFlowerCard.css"
import { Link } from "react-router-dom"

const OpeningFlowersCard = ({ imageUrl, title, productCount, link }) => {
  // Kiểm tra xem có title hoặc productCount không
  const hasContent = title || productCount

  if (!hasContent) {
    // Trường hợp không có title và productCount - ảnh chiếm trọn khung
    const content = (
      <div className="opening-card border-0 shadow-sm h-100">
        <div className="position-relative overflow-hidden full-image-container">
          {imageUrl && (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Flower image"
              className="opening-img w-100 h-100"
              style={{ height: "200px", objectFit: "cover" }}
            />
          )}
        </div>
      </div>
    )
    return (
      <div className="col-md-6 mb-4">
        {link ? <Link to={link} style={{ textDecoration: "none" }}>{content}</Link> : content}
      </div>
    )
  }

  // Layout mới: ảnh bên trái, text bên phải
  const content = (
    <div className="opening-card border-0 shadow-sm h-100">
      <div className="row g-0 h-100">
        {/* Phần ảnh - chiếm 60% */}
        <div className="col-7">
          <div className="opening-img-wrapper h-100">
            {imageUrl && (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={title || "Flower image"}
                className="opening-img w-100 h-100"
              />
            )}
          </div>
        </div>

        {/* Phần text - chiếm 40% */}
        <div className="col-5">
          <div className="opening-content h-100 d-flex flex-column justify-content-center align-items-center text-center p-3">
            {title && <h5 className="opening-title fw-bold mb-2 text-dark">{title.toUpperCase()}</h5>}
            {productCount && <p className="opening-count mb-0 text-muted">{`${productCount} SẢN PHẨM`}</p>}
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <div className="col-md-6 mb-4">
      {link ? <Link to={link} style={{ textDecoration: "none" }}>{content}</Link> : content}
    </div>
  )
}

export default OpeningFlowersCard
