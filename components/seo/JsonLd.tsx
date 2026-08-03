/**
 * Renders a JSON-LD structured-data block. `type="application/ld+json"` is a
 * data block (not executed), so it is unaffected by the script-src CSP.
 * Content is our own serialized objects, never user input.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
