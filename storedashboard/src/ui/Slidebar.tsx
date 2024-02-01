import { IoHomeSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { BsGift } from "react-icons/bs";
import { SlideBarLink } from "../components/SlideBarLink";
import Logo from "./Logo";
export const Slidebar = () => {
  return (
    <div className="row-start-1 row-end-3 bg-neutral">
      <ul className="menu rounded-box bg-neutral">
        <li>
          <Logo size="w-20"/>
        </li>
        <li>
          <SlideBarLink
            to="/"
            title="DashBoard"
            icon={<IoHomeSharp size={32} />}
          />
        </li>
        <li>
          <SlideBarLink
            to="/customer"
            title="Customer"
            icon={<FaUserFriends size={32} />}
          />
        </li>
        <li>
          <SlideBarLink
            to="/product"
            title="Product"
            icon={<BsGift size={32} />}
          />
        </li>
        <li>
          <SlideBarLink
            to="/order"
            title="Order"
            icon={<RiBillLine size={32} />}
          />
        </li>
      </ul>
    </div>
  );
};
