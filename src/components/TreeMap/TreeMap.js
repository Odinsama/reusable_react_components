import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {scaleOrdinal, schemeCategory20c} from "d3-scale";
import select from "d3-selection/src/select";
import {transition, hierarchy, treemap} from 'd3';

class TreeMap extends Component {
    constructor(props) {
        super(props);
        this.createTreeMap = this.createTreeMap.bind(this);

    }

    componentDidMount(){
        this.createTreeMap();
    }

    componentDidUpdate(){
        this.createTreeMap();
    }



    createTreeMap(){
        const {width, height} = this.props.size,
            data = this.props.data,
            node = this.node,
            color = scaleOrdinal().range(schemeCategory20c);

        const treeMap = treemap().size([width, height]);

        select(node)
            .append('div')
            .attr('id', 'tree_div')
            .style("position", "absolute")
            .style("width", (width + 20) + "px")
            .style("height", (height + 50) + "px")
            .style("left", 10 + "px")
            .style("top", 40 + "px");




            const root = hierarchy(data)
                .sum((d) => d.size);

            const tree = treeMap(root);

            let myTree = select('#tree_div')
                .datum(root)
                .selectAll(".node")
                .data(tree.leaves())
                .enter()
                .append('div')
                .attr("class", "node")
                .style("left", (d) => d.x0 + "px")
                .style("top", (d) => d.y0 + "px")
                .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
                .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
                .style("background", (d) => color(d.parent.data.name))
                .text((d) => d.data.name);

            select('.example')
                .style("height", (height + 50) + "px");

            select(node)
                .selectAll("input")
                .on("change", () => {
                    const value = select('input[name=mode]:checked').attr('value') === ("count")
                    ? d => d.size ? 1 : 0
                    : d => d.size;

                    const newRoot = hierarchy(data, d => d.children)
                        .sum(value);

                    const newTree = treeMap(newRoot),
                        leaves = newTree.leaves();

                    myTree.data(leaves).enter().append('div').attr("class", "node");


                    transition().duration(1500).select("#tree_div")
                        .selectAll(".node")
                        .style("left", (d) => d.x0 + "px")
                        .style("top", (d) => d.y0 + "px")
                        .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
                        .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
                });
            };

    render() {
        return (
                <div
                    className={"tree_body"}
                    ref={node => this.node = node}
                    width={this.props.size.width}
                    height={this.props.size.height}>
                    <form>
                        <label><input type="radio" name="mode" value="size" checked/>Size </label>
                        <label><input type="radio" name="mode" value="count"/>Count</label>
                    </form>
                </div>
        );
    }
}

TreeMap.propTypes = {
    data: PropTypes.object,
    size: PropTypes.object.isRequired

};

export default TreeMap;