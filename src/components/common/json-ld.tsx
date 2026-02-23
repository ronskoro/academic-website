import Script from "next/script";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonString = JSON.stringify(data);
  const hash = Array.from(jsonString).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);

  return (
    <Script
      id={`json-ld-${hash}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString.replace(/</g, '\\u003c') }}
    />
  );
}
