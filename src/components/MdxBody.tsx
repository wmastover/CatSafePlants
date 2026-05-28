import { MDXRemote } from "next-mdx-remote/rsc";

type SpanProps = React.HTMLAttributes<HTMLSpanElement> & { class?: string };

const mdxComponents = {
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
  em: (props: React.HTMLAttributes<HTMLElement>) => <em {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong {...props} />,
  span: ({ class: htmlClass, className, ...props }: SpanProps) => (
    <span className={className ?? htmlClass} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined} />
  ),
};

interface MdxBodyProps {
  content: string;
}

export function MdxBody({ content }: MdxBodyProps) {
  if (!content) return null;
  return <MDXRemote source={content} components={mdxComponents} />;
}
