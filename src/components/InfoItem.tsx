interface Props {
  title: string;
  value: string;
}
const InfoItem: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="flex flex-col gap-1 md:border-r-2 border-r-none last:border-none px-7 py-2 md:py-5 items-center">
      <p className="font-normal text-[hsl(0,0%,59%)] text-sm">{title}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  );
};

export default InfoItem;
