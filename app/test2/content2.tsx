import React from 'react';

interface BorderPatternComponentProps {
  children: React.ReactNode;
}

const BorderPatternComponent: React.FC<BorderPatternComponentProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* Main content container */}
      <div className="relative p-8">
        {/* Multiple border layers */}
        <div className="border-pattern">
          {children}
        </div>
      </div>

      <style jsx>{`
        .border-pattern {
          position: relative;
          padding: 20px;
          border: 1px solid black;
        }

        .border-pattern::before {
          content: '';
          position: absolute;
          top: -15px;
          bottom: -15px;
          left: -30px;
          width: 2px;
          background-image: repeating-linear-gradient(
            to bottom,
            black 0,
            black 2px,
            transparent 2px,
            transparent 4px,
            black 4px,
            black 14px,
            transparent 14px,
            transparent 16px
          );
        }

        .border-pattern::after {
          content: '';
          position: absolute;
          top: -15px;
          bottom: -15px;
          right: -30px;
          width: 2px;
          background-image: repeating-linear-gradient(
            to bottom,
            black 0,
            black 2px,
            transparent 2px,
            transparent 4px,
            black 4px,
            black 14px,
            transparent 14px,
            transparent 16px
          );
        }

        /* Multiple rectangular borders */
        .border-pattern {
          box-shadow:
            0 0 0 1px black,
            0 0 0 3px white,
            0 0 0 4px black,
            0 0 0 6px white,
            0 0 0 7px black;
        }
      `}</style>
    </div>
  );
};

// Example usage
const ExamplePage: React.FC = () => {
  return (
    <div className="container mx-auto p-16">
      <BorderPatternComponent>
        <div className="min-h-[200px]">
          <h2 className="text-xl font-bold">Content Title2</h2>
          <p>This content is wrapped with the custom border pattern.</p>
        </div>
      </BorderPatternComponent>
    </div>
  );
};

export default ExamplePage;