import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {scaleOrdinal, schemeCategory20c} from "d3-scale";
import select from "d3-selection/src/select";
import {hierarchy, treemap} from 'd3';

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



        select(node)
            .append('g')
            .attr('id', 'tree_group')
            .style("position", "absolute")
            .style("width", (width + 20) + "px")
            .style("height", (height + 50) + "px")
            .style("left", 10 + "px")
            .style("top", 40 + "px");


        const treeMap = treemap().size([width, height]);

        const root = hierarchy(data)
            .sum(d => d.size);

        const tree = treeMap(root);

        const treeNode = select('#tree_group')
            .selectAll(".node")
            .data(tree.leaves());

        treeNode
            .selectAll('rect')
            .data(tree.leaves())


        treeNode
            .selectAll('text')
            .data(tree.leaves())

        let newNode = treeNode
            .enter().append('g')
            .attr("class", "node")

        newNode.append('rect')
            .style("fill", (d) => color((d.children ? d : d.parent).data.name))
            .style("x", (d) => d.x0 + "px")
            .style("y", (d) => d.y0 + "px")
            .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
            .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")

        newNode.append('text')
            .text(d => d.data.name)
            .attr("transform", d=> "translate(" + d.x0 + "," + d.y0 + ")")


    };

    render() {
        return (
            <svg
                className={"tree_rect"}
                ref={node => this.node = node}
                width={this.props.size.width}
                height={this.props.size.height}>
            </svg>
        );
    }
}

TreeMap.propTypes = {
    data: PropTypes.object,
    size: PropTypes.object.isRequired

};

export default TreeMap;