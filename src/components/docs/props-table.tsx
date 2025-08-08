interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: Prop[];
  className?: string;
}

export function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div className={className}>
      <h3 className="mb-4 text-lg font-semibold">Props</h3>
      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Default
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, index) => (
              <tr
                key={prop.name}
                className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
              >
                <td className="px-4 py-3 text-sm font-mono">
                  {prop.name}
                  {prop.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                  {prop.type}
                </td>
                <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                  {prop.default || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
