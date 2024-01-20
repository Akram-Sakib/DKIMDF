import PrimeMinisterImage from "@/assets/images/prime-minister.png";
import BlurImage from "../ui/blur-image";
import Container from "../ui/container";

const BannerMiddle = () => {
  return (
    <section className="w-full py-12 md:py-20" 
    style={{
      background:
        "#f5f6fa",
    }}
    >
      <Container>
        <div className="rounded-lg h-96 w-full">
          <BlurImage
            image={PrimeMinisterImage}
            alt="Prime Minister Image"
            imgClassName="rounded-lg"
            className="rounded-lg aspect-w-9 aspect-h-3"
          />
        </div>
      </Container>
    </section>
  );
};

export default BannerMiddle;
