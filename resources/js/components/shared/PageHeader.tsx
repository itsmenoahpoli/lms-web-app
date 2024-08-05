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
          <h1 className="text-2xl font-bold">{props.title}</h1>
          <p className="text-sm text-slate-500 mt-2">{props.subtitle}</p>
        </div>
        <div className="flex justify-end">{props.children}</div>
      </div>
    </div>
  );
};
