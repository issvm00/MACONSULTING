import React from "react";

interface JsonLdSchemaProps {
  data: Record<string, unknown>;
}

export function JsonLdSchema({ data }: JsonLdSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
