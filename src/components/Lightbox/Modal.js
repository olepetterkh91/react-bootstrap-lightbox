import React, { useEffect } from "react";

import { motion } from "framer-motion";
import { useKeyPress } from "../../hooks/useKeypress";

const Modal = ({ selectedImg, selectedIndex, setSelectedIndex, images }) => {
    const right = useKeyPress("ArrowRight");
    const left = useKeyPress("ArrowLeft");
    const exit = useKeyPress("Escape")
    const clickHandler = (e) => {
        if (e.target.classList.contains("backdrop")) {
            setSelectedIndex(-1);
        }
    };

    useEffect(() => {
        if (left) {
            previousImage()
        }
        if (right) {
            nextImage()
        }
        if (exit) {
            setSelectedIndex(-1);
        }
    }, [left, right, exit])

    function nextImage() {
        let imageIndex = selectedIndex
        if (imageIndex >= images.length - 1) {
          imageIndex = 0
        } else {
          imageIndex = selectedIndex + 1
        }
        setSelectedIndex(imageIndex)
      }
    
      function previousImage() {
        let imageIndex = selectedIndex
        if (imageIndex > 0) {
          imageIndex = selectedIndex - 1
        } else {
          imageIndex = images.length - 1
        }
        setSelectedIndex(imageIndex)
      }

    return (
        <motion.div
            className="modal show backdrop bg-transparent-dark"
            style={{display: "block"}}
            onClick={clickHandler}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content" style={{ border: "none", backgroundColor: "black" }}>
                    <motion.img
                        src={selectedImg ? selectedImg : "https://smorasstats.com/v4/wp-content/uploads/2020/06/71951528_2527097874023921_5910925260533792768_o.jpg"}
                        alt="Modal"
                        initial={{ width: "110%" }}
                        animate={{ width: "100%" }}
                    />
                    
                </div>
            </div>
            <div className="imageCount text-white">
                {selectedIndex + 1} / {images?.length}
            </div>
            <div className="closeButton">
                <button
                    onClick={() => setSelectedIndex(-1)}
                    type="button"
                    class="close"
                    style={{ color: "white" }}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="lightbox-navigation">
                <div  onClick={previousImage} className="arrow-left">
                    <i className="fas fa-chevron-left"></i>
                </div>
                <div onClick={nextImage} className="arrow-right">
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
        </motion.div>
    );
};
export default Modal;