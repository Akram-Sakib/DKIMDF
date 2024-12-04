import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samadhan Group | About",
  description:
    "Discover the Samadhan Group of Companies - Driving innovation, sustainability, and excellence across industries worldwide.",
};

const AboutPage = () => {
  const companies = [
    "Samadhan Foundation",
    "Samadhan Industrial Park Ltd",
    "Samadhan Family Needs Plc.",
    "Samadhan Dress Up Plc",
    "Samadhan IT",
    "Samadhan Tourism",
    "Samadhan Auto Rice Mill Plc",
  ];

  return (
    <section className="py-20 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {/* Introduction Section */}
          <div className="max-w-sm [&>p]:leading-7">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="mb-8">
              Welcome to Samadhan Group of Companies – a diverse and dynamic
              conglomerate committed to creating long-term value across
              multiple industries. With a strong foundation built on
              innovation, integrity, and excellence, we have grown into a
              global leader with a portfolio of companies that span industries
              such as manufacturing, technology, finance, and more.
            </p>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="mb-8">
              Our vision is to empower businesses, communities, and industries
              by providing innovative solutions, fostering sustainability, and
              driving growth. We aim to be the global leader in each of our
              sectors, constantly evolving to meet the needs of tomorrow.
            </p>
          </div>

          {/* Companies Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Companies</h2>
            <ul className="list-disc ml-4 mb-8 space-y-4">
              {companies.map((company, index) => (
                <li key={index} className="text-lg font-semibold">
                  {company}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold">Innovation</CardTitle>
                <CardDescription className="text-base">
                  We are committed to driving progress through continuous
                  innovation, investing in R&D to bring forward-thinking
                  solutions to market, improving industries, and enhancing
                  lives.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold">Sustainability</CardTitle>
                <CardDescription className="text-base">
                  Sustainability is integral to everything we do, from
                  eco-friendly processes to community outreach programs, making
                  a positive impact on the environment and society.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold">Global Presence</CardTitle>
                <CardDescription className="text-base">
                  Our global footprint spans continents, allowing us to deliver
                  solutions that are locally relevant and internationally
                  competitive.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold">
                  Experienced Leadership
                </CardTitle>
                <CardDescription className="text-base">
                  With visionary leadership, we are committed to ethical
                  practices, strategic growth, and customer satisfaction.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            Our Commitment to Sustainability
          </h2>
          <p className="leading-7">
            At Samadhan Group, we understand that our responsibilities extend
            beyond business. We are dedicated to promoting sustainability in
            all aspects of our operations. From reducing our carbon footprint
            to engaging in social development programs, we ensure that our
            growth benefits not only our shareholders but also our communities
            and the environment.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default AboutPage;
