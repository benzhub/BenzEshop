import Link from "next/link";

const NavBarItem = ({ value }: { value: string }) => {
  const url = value.toLowerCase();
  return (
    <Link href={url}>
      <li className="cursor-pointer py-2">{value}</li>
    </Link>
  );
};

export default NavBarItem;
