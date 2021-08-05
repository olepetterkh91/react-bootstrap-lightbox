import React from 'react'
import {useState} from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

import './AnimatedCarousel.css'

const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  function AnimatedCarousel({images, selectedIndex, setSelectedIndex}) {

    const [[page, direction], setPage] = useState([0, 0])

    const imageIndex = wrap(selectedIndex ? selectedIndex : 0, images.length, page)

    const paginate = (newDirection => {
        setPage([page + newDirection, newDirection])
        setSelectedIndex(selectedIndex => selectedIndex + newDirection)
        console.log(page, newDirection)
    })

    return (
        <div className="example-container" style={{display: selectedIndex > 0 ? "block" : "none"}}>
            <AnimatePresence initial={false} custom={direction}>
                <div className="d-flex justify-content-center align-self-center my-auto">
                    {selectedIndex}
                <motion.img
                    key={page}
                    src={images[imageIndex] ? images[imageIndex] : "https://smorasstats.com/v4/wp-content/uploads/2020/06/71951528_2527097874023921_5910925260533792768_o.jpg"}
                    className="animated-image"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                        }
                    }}
                />
                </div>
            </AnimatePresence>
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
            <div className="prev display-3" onClick={() => paginate(-1)}>
                <i className="fas fa-chevron-right"></i>
            </div>
            <div className="next display-3" onClick={() => paginate(1)}>
                <i className="fas fa-chevron-right"></i>
            </div>
        </div>
    )

  }
  export default AnimatedCarousel