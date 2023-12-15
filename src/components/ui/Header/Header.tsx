
import { CalendarForm } from "./HeaderCalender";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center [&>*]:p-2 [&>*]:px-5 text-lg bg-[#9E5BBA] text-white border-b border-red-600">
        <h2>Logo</h2>
        <h2 className="basis-[80%] text-center">
          Dynamic Krishok & Imam Muazzin Development Foundation
        </h2>
        <div>
          <CalendarForm />
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Header;
