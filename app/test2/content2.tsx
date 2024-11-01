import React from 'react';

interface DividedSectionProps {
  sections: {
    content: React.ReactNode;
  }[];
}

const DividedSection: React.FC<DividedSectionProps> = ({ sections }) => {
  return (
    <div className="flex flex-row items-stretch relative">
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <div className="flex-1 p-4">
            {section.content}
          </div>
          {index < sections.length - 1 && (
            <div className="w-[2px] my-4 relative">
              <style jsx>{`
                div {
                  background-image: repeating-linear-gradient(
                    to bottom,
                    black 0,
                    black 8px,
                    transparent 8px,
                    transparent 16px
                  );
                  background-repeat: repeat-y;
                }
              `}</style>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Example usage:
const ExamplePage: React.FC = () => {
  const sectionContent = [
    {
      content: (
        <div>
          <h2 className="text-xl font-bold">Section 1</h2>
          <p>Content for first section</p>
        </div>
      )
    },
    {
      content: (
        <div>
          <h2 className="text-xl font-bold">Section 2</h2>
          <p>Content for second section</p>
        </div>
      )
    },
    {
      content: (
        <div>
          <h2 className="text-xl font-bold">Section 3</h2>
          <p>Content for third section</p>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto">
      <DividedSection sections={sectionContent} />
    </div>
  );
};

export default ExamplePage;