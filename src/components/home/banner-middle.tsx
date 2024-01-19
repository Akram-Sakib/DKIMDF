import PrimeMinisterImage from "@/assets/images/prime-minister.png";
import BlurImage from "../ui/blur-image";
import Container from "../ui/container";

const BannerMiddle = () => {
  return (
    <section className="w-full py-20" 
    style={{
      background:
        "#f5f6fa",
    }}
    >
      <Container>
        <div className="rounded-lg">
          <BlurImage
            image={PrimeMinisterImage}
            aspectRatio={16 / 5}
            alt="Prime Minister Image"
            imgClassName="rounded-lg"
            className="rounded-lg"
          />
        </div>
      </Container>
    </section>
  );
};

export default BannerMiddle;
