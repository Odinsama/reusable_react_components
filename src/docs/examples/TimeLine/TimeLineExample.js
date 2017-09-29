import TimeLine from "components/TimeLine";
import React from "react";
import * as csv from "components/TimeLine/sp500.csv"

export default function ExampleBarChart() {
    return <TimeLine data={csv} size={{width: 960, height: 900}}/>;
}