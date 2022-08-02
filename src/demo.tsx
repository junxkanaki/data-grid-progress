import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import clsx from "clsx";
import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 26,
        borderRadius: 2
      },
      value: {
        position: "absolute",
        lineHeight: "24px",
        width: "100%",
        display: "flex",
        justifyContent: "center"
      },
      bar: {
        height: "100%",
        "&.low": {
          backgroundColor: "#f44336"
        },
        "&.medium": {
          backgroundColor: "#efbb5aa3"
        },
        "&.high": {
          backgroundColor: "#088208a3"
        }
      }
    }),
  { defaultTheme }
);
interface ProgressBarProps {
  value: number;
}

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value } = props;
  const valueInPercent = value * 100;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={classes.value}
      >{`${valueInPercent.toLocaleString()} %`}</div>
      <div
        className={clsx(classes.bar, {
          low: valueInPercent < 30,
          medium: valueInPercent >= 30 && valueInPercent <= 70,
          high: valueInPercent > 70
        })}
        style={{ maxWidth: `${valueInPercent}%` }}
      />
    </div>
  );
});
export function renderProgress(params) {
  return <ProgressBar value={Number(params.value)!} />;
}

const columns = [
  {
    field: "filledQuantity",
    headerName: "Filled Quantity",
    renderCell: renderProgress,
    type: "number",
    width: 120
  }
];
const rows = [1, 2, 3, 4, 5, 6].map((id) => ({
  id,
  filledQuantity: Math.random()
}));

export default function FlexLayoutGrid() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid columns={columns} rows={rows} />
        </div>
      </div>
    </div>
  );
}
