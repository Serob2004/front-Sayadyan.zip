import { useState, useEffect } from "react";
import { Card, Tag } from "antd";
import "./css/Page.css";

const { Meta } = Card;

export default function Page() {
  const [data, setData] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    fetch("https://cloud.codesupply.co/endpoint/react/data.json")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setFilteredPosts(resData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleFilter = (e) => {
      const text = e.detail.toLowerCase();
      setFilteredPosts(
        data.filter(
          (item) =>
            item.title.toLowerCase().includes(text) ||
            item.text.toLowerCase().includes(text)
        )
      );
    };

    window.addEventListener("filterPosts", handleFilter);
    return () => window.removeEventListener("filterPosts", handleFilter);
  }, [data]);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedPost(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="card-container">
      {filteredPosts.map((item, index) => (
        <Card
          key={index}
          hoverable
          className="custom-card"
          cover={
            <img
              src={item.img}
              srcSet={`${item.img_2x} 2x`}
              alt={item.title}
              className="card-image"
            />
          }
          onClick={() => openModal(item)}
        >
          <div className="card-content">
            <div className="card-tags">
              <Tag color="red">{item.tags}</Tag>
            </div>
            <Meta title={item.title} description={item.text} />
            <div className="card-footer">
              <span className="author">{item.autor}</span>
              <span className="date">{item.date}</span>
              <span className="views">{item.views} views</span>
            </div>
          </div>
        </Card>
      ))}

      {isModalOpen && selectedPost && (
        <div
          className={`modal-overlay ${isClosing ? "closing" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`modal-content ${isClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPost.img}
              alt={selectedPost.title}
              className="modal-image"
            />
            <Tag color="red">{selectedPost.tags}</Tag>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.text}</p>
            <div className="modal-meta">
              <span>{selectedPost.autor}</span>
              <span>{selectedPost.date}</span>
              <span>{selectedPost.views} views</span>
            </div>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
