import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/ui/container";

const AboutPage = () => {
  const cards = [
    {
      id: 1,
      title: "500",
      description: " APIs and growing",
      icon: "plus",
    },
    {
      id: 2,
      title: "32,000",
      description: "Audience",
      icon: "plus",
    },
    {
      id: 3,
      title: "52",
      description: "Weekly Newsletters",
      icon: "plus",
    },
    {
      id: 4,
      title: "10,000",
      description: "Api resources",
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
              nostrum similique earum impedit corporis ipsum? Assumenda, aut
              quos optio voluptates ea quis, recusandae, velit distinctio quo
              autem eaque possimus ipsa quam blanditiis perferendis dolor
              molestiae voluptatibus provident consectetur libero fuga?
            </p>
            <p className="mb-8">
              <b>Lorem ipsum:</b> dolor sit, amet consectetur adipisicing elit.
              Delectus nostrum similique earum impedit corporis ipsum?
              Assumenda, aut quos optio voluptates ea quis, recusandae, velit
              distinctio quo autem eaque possimus ipsa quam blanditiis
              perferendis dolor molestiae voluptatibus provident consectetur
              libero fuga?
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
