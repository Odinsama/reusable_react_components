import React from "react";
import generateTreeStructuredMockData from "../generateTreeStructuredMockData";
import TreeMapRect from "components/TreeMapRect/TreeMapRect";


export default function ExampleBarChart() {
    return <TreeMapRect data={generateTreeStructuredMockData(4)} size={{width: 1000, height: 800}}/>;
}


