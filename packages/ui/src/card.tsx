import { type ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  href?: string;
}

export function Card({ title, children, href }: CardProps) {
  const Wrapper = href ? "a" : "div";
  const additionalProps = href
    ? { href, rel: "noopener noreferrer", target: "_blank" }
    : {};
  return (
    <Wrapper
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
      {...additionalProps}
    >
      <h2 className="mb-3 text-2xl font-semibold">{title}</h2>
      <p className="m-0 text-sm opacity-50">{children}</p>
    </Wrapper>
  );
}
