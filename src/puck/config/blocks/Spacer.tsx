import { ComponentConfig } from "@measured/puck";

export interface SpacerProps {
  height?: number;
  width?: number;
  unit?: "px" | "rem" | "vh" | "vw";
}

export const Spacer: ComponentConfig<SpacerProps> = {
  fields: {
    height: {
      type: "number",
      label: "Height",
    },
    width: {
      type: "number",
      label: "Width",
    },
    unit: {
      type: "select",
      options: [
        { label: "Pixels (px)", value: "px" },
        { label: "REM", value: "rem" },
        { label: "Viewport Height (vh)", value: "vh" },
        { label: "Viewport Width (vw)", value: "vw" },
      ],
    },
  },
  defaultProps: {
    height: 32,
    unit: "px",
  },
  render: ({ height, width, unit }) => {
    const style: React.CSSProperties = {};
    
    if (height) {
      style.height = `${height}${unit || "px"}`;
    }
    
    if (width) {
      style.width = `${width}${unit || "px"}`;
    }

    return <div style={style} />;
  },
};
