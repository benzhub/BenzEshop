import Image from "next/image";

type CardProps = {
  title: string;
  description: string;
  price: number
  image: string
}

const ProductCard = ({title, description, price, image}: CardProps) => {
  return (
    <div className="card">
      <Image src={image} width={350} height={350} className="card-img" alt="HeadPhone" />

      <div className="card-textBox text-base-200 font-bold p-4">
        <p className="fonb-bold text-xl">{title}</p>
        <span className="text-sm">{description}</span>
        <p className="fonb-bold text-lg">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
