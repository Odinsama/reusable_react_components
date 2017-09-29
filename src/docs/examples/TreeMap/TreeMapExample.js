import TreeMap from 'components/TreeMap';
import React from "react";
import generateTreeStructuredMockData from "../generateTreeStructuredMockData";


export default function ExampleBarChart() {
    return <TreeMap data={generateTreeStructuredMockData(4)} size={{width: 1000, height: 800}}/>;
}


