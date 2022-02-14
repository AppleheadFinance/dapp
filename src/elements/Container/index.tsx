import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="px-20 tablet:px-8">{children}</div>;
};

export default Container;
