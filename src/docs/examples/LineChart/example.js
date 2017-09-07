import * as React from "react";
import LineChart from "components/LineChart/LineChart";

const monthlySales = [
    {"month":10, "sales":100},
    {"month":20, "sales":243},
    {"month":30, "sales":111},
    {"month":40, "sales":124},
    {"month":50, "sales":512},
    {"month":60, "sales":314},
    {"month":70, "sales":310},
    {"month":80, "sales":111},
    {"month":90, "sales":123},
    {"month":100, "sales":541},
    {"month":110, "sales":455}
];

export default function monthlySalesScatter() {
    return <LineChart data={monthlySales} size={{width: 500, height: 600}}/>
}
