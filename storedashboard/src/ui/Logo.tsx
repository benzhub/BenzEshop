type LogoProps = {
  size: string;
};

const Logo = ({ size }: LogoProps) => {
  return (
    <div className="avatar flex justify-center">
      <div className={`rounded-full ${size}`}>
        <img src="/logo.png" alt="Logo" />
      </div>
    </div>
  );
};

export default Logo;
