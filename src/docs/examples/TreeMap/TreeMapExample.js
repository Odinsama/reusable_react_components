import TreeMap from 'components/TreeMap';
import React from "react";
//import flare from 'components/TreeMap/flare.json'
import flare from 'components/SunBurst/min.flare.json'

export default function ExampleBarChart() {
    return <TreeMap data={flare} size={{width: 1000, height: 800}}/>;
}


