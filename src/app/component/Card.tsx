type CardTypes = {
  title: string;
  content: string;
};

const CTAList = [
  { buttonName: "Rename", ariaLabel: "rename this note" },
  { buttonName: "Delete", ariaLabel: "Delete this note" },
];

const CardCTA = () => {
  return (
    <div className="flex gap-3 mt-6">
      {CTAList.map(({ buttonName, ariaLabel }, index) => {
        return (
          <button
            key={index}
            aria-label={ariaLabel}
            className="py-1 px-2 border-1"
          >
            {buttonName}
          </button>
        );
      })}
    </div>
  );
};

export const Card = ({ title, content }: CardTypes) => {
  return (
    <div className="border-1 p-3">
      <h1 className="mb-3 text-2xl font-semibold">{title}</h1>
      <p>{content}</p>
      <CardCTA />
    </div>
  );
};
