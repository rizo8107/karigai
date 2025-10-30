import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";

export interface GridProps {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

export const Grid: ComponentConfig<GridProps> = {
  fields: {
    columns: {
      type: "select",
      options: [
        { label: "1 Column", value: 1 },
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
        { label: "5 Columns", value: 5 },
        { label: "6 Columns", value: 6 },
      ],
    },
    gap: {
      type: "select",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    align: {
      type: "select",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Stretch", value: "stretch" },
      ],
    },
    justify: {
      type: "select",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Between", value: "between" },
        { label: "Around", value: "around" },
        { label: "Evenly", value: "evenly" },
      ],
    },
  },
  defaultProps: {
    columns: 3,
    gap: "md",
    align: "stretch",
    justify: "start",
  },
  render: ({ columns, gap, align, justify, puck: { renderDropZone } }) => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
      6: "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
    };

    const gapClasses = {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };

    const justifyClasses = {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    return (
      <div className={cn("puck-grid")}> 
        <div
          className={cn(
            "grid",
            columnClasses[columns || 3],
            gapClasses[gap || "md"],
            alignClasses[align || "stretch"],
            justifyClasses[justify || "start"]
          )}
        >
          {renderDropZone({ zone: "grid-items" })}
        </div>
      </div>
    );
  },
};
