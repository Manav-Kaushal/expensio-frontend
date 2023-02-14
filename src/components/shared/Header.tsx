type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <h1 className="text-3xl font-semibold transform -rotate-90 ">{title}</h1>
  );
};
