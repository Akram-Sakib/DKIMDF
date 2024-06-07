import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Somadhan Foundation | About",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF).",
};

const AboutPage = () => {
  const cards = [
    {
      id: 1,
      title: "500",
      description: " Tools and Counting",
      icon: "plus",
    },
    {
      id: 2,
      title: "32,000",
      description: "Engaged Participants",
      icon: "plus",
    },
    {
      id: 3,
      title: "52",
      description: "Weekly Updates",
      icon: "plus",
    },
    {
      id: 4,
      title: "10,000",
      description: "Educational Resources",
      icon: "plus",
    },
  ];

  return (
    <section className="py-20 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div className="max-w-sm [&>p]:leading-7">
            <h1 className="text-4xl font-bold mb-4">About</h1>
            <p className="mb-8">
              Welcome to our Foundation – a non-governmental, philanthropic, and
              inclusive organization committed to serving communities regardless
              of background, belief, or affiliation. Our goal is to promote
              transparency, end exploitation, and strengthen rights through
              capacity-building programs, educational workshops, and job
              creation initiatives.
            </p>
            <p className="mb-8">
              Our projects aim to sustainably fulfill essential needs, striving
              to transform our nation into one free from joblessness, poverty,
              ignorance, and violence. We dream of a future where every person
              is skilled, employed, and empowered to contribute positively to
              society.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-8">
              {cards.map(({ id, title, description }) => (
                <Card key={id} className="py-2 md:py-6 lg:py-8">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl md:text-4xl lg:text-5xl font-semibold">
                      <span className="text-[#6b3ded]">+</span>
                      {title}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-xl font-semibold text-[#0e0c0c]">
                      {description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutPage;
