function LightBoxListTemplate({image, index, setSelectedIndex, setSelectedImage}) {
    return (
        <div className="col-md-4 col-4">
            <img src={image ? image : "https://smorasstats.com/v4/wp-content/uploads/2020/06/71951528_2527097874023921_5910925260533792768_o.jpg"} alt="" className="img-fixed-size img-fluid" onClick={() => setSelectedIndex(index)} />
        </div>
    )
}
export default LightBoxListTemplate