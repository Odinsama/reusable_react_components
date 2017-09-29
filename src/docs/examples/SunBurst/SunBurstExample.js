import SunBurst from "components/SunBurst/SunBurst";
import * as React from "react";
import generateTreeStructuredMockData from "../generateTreeStructuredMockData";



export default function SunBurstExample() {
    return <SunBurst data={generateTreeStructuredMockData(6)} size={{width: 960, height: 700}}/>
}





