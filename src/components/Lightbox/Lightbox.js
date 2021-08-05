import { useState } from "react";
import Modal from "./Modal";
import LightBoxListTemplate from "./templates/LightboxListTemplate";

function LightBox({images}) {

    const [selectedIndex, setSelectedIndex] = useState(null)
    
    return (
        <div>
            
            <div className="row no-gutters">
                {images?.map((image, index) => <LightBoxListTemplate key={index} image={image} index={index} setSelectedIndex={setSelectedIndex} />)}
            </div>
            {selectedIndex >= 0 && <Modal images={images} selectedImg={images[selectedIndex]} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} /> }
            {/* <Modal images={images} selectedImg={images[selectedIndex]} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} /> */}
        </div>
    )
}
export default LightBox