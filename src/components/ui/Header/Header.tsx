import { Separator } from "../separator";
import Navbar from "./navbar";

const Header = () => {
  return (
    <section className="sticky top-0 bg-white z-20 shadow-lg bg-opacity-30 backdrop-filter backdrop-saturate-150 backdrop-blur-lg">
      <Navbar />
      <Separator />
    </section>
  );
};

export default Header;




























      {/* <Container>
        <div className="flex justify-between items-center [&>*]:p-2 [&>*]:px-5 text-base text-primary font-semibold">
          <h2 className="basis-[30%] text-green">Shamadhan Foundation</h2>
          <h2 className="basis-[60%] text-center">
            Dynamic Krishok & Imam Muazzin Development Foundation
          </h2>
          <div className="basis-[10%]">
            <CalendarForm />
          </div>
        </div>
      </Container> */}