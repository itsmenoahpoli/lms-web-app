import React from "react";

export const PageHeader: React.FC<{
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}> = (props) => {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-lg">{props.title}</h1>
          <p className="text-xs text-slate-500">{props.subtitle}</p>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};
