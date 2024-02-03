type EmptyProps = {
  resourceName: string;
};

const Empty = ({ resourceName }: EmptyProps) => {
  return <p className="font-bold text-xl">No {resourceName} could be found.</p>;
};

export default Empty;
