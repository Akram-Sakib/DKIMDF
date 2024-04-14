import imgfive from "@/assets/images/destination-1-5.png";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import "./gallery.css";

const GalleryPage = () => {
  return (
    <section className="places_section">
      <Container>
        <div className="places_top_text text-center">
          {/* <span>Destination Lists</span> */}
          <h2 className="text-4xl" >Our Gallery</h2>
        </div>
        <div className="image_gallery">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-3 rounded-lg">
              <div
                // style={{
                //   backgroundImage: `url(${imgOne})`,
                // }}
                className="place-img before:rounded-lg place-image-1 group rounded-lg"
              >
                <h2 className="text-4xl" >
                  <a href="/Spain">Spain</a>
                </h2>
                <Button
                  className="absolute text-sm rounded-lg top-4 right-4 scale-x-0 group-hover:scale-x-100 transition-all duration-500"
                >
                  6 TOURS
                </Button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 rounded-lg">
              <div
                // style={{
                //   backgroundImage: `url(${imgtwo})`,
                // }}
                className="place-img before:rounded-lg place-image-2 group rounded-lg"
              >
                <h2 className="text-4xl" >
                  <a href="/Thailand">Thailand</a>
                </h2>
                <p className="place_img_subtitle">Wildlife</p>
                <Button
                  className="absolute text-sm rounded-lg top-4 right-4 scale-x-0 group-hover:scale-x-100 transition-all duration-500"
                >
                  6 TOURS
                </Button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3 rounded-lg">
              <div
                // style={{
                //   backgroundImage: `url(${imgthree})`,
                // }}
                className="place-img before:rounded-lg place-image-3 group rounded-lg"
              >
                <h2 className="text-4xl" >
                  <a href="/Africa">Africa</a>
                </h2>
                <Button
                  className="absolute text-sm rounded-lg top-4 right-4 scale-x-0 group-hover:scale-x-100 transition-all duration-500"
                >
                  6 TOURS
                </Button>
              </div>
            </div>
            <div
              // style={{
              //   backgroundImage: `url(${imgfour})`,
              // }}
              className="col-span-12 md:col-span-6 rounded-lg"
            >
              <div className="place-img before:rounded-lg place-image-4 rounded-group rounded-lg">
                <h2 className="text-4xl" >
                  <a href="/Australia">Australia</a>
                </h2>
                <Button
                  className="absolute text-sm rounded-lg top-4 right-4 scale-x-0 group-hover:scale-x-100 transition-all duration-500"
                >
                  6 TOURS
                </Button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 rounded-lg">
              <div
                style={{
                  backgroundImage: `url(${imgfive})`,
                }}
                className="place-img before:rounded-lg place-image-5 group rounded-lg"
              >
                <h2 className="text-4xl" >
                  <a href="/switzerland">Switzerland</a>
                </h2>
                <p className="place_img_subtitle">Adventure</p>
                <Button
                  className="absolute text-sm rounded-lg top-4 right-4 scale-x-0 group-hover:scale-x-100 transition-all duration-500"
                >
                  6 TOURS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GalleryPage;
