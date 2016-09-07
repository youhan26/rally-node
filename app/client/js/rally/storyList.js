/**
 * Created by YouHan on 2016/8/31.
 */

/* @flow */
"use strict";
var React = require('react');

var StoryList = React.createClass({
    getInitialState: function () {
        return {
            list: [{
                name: 'list 1',
                list: [{
                    id: 1,
                    name: 'order 1'
                }, {
                    id: 2,
                    name: 'order 2'
                }, {
                    id: 3,
                    name: 'order 3'
                }, {
                    id: 4,
                    name: 'order 4'
                }]
            }, {
                name: 'list 2',
                list: [{
                    id: 5,
                    name: 'order 5'
                }, {
                    id: 6,
                    name: 'order 6'
                }, {
                    id: 7,
                    name: 'order 7'
                }, {
                    id: 8,
                    name: 'order 8'
                }]
            }],
            currentItem: null,
            currentParent: null
        }
    },
    onDrop: function (item, key) {
        console.log('drop');
        debugger;
        this.state.currentItem = null;
    },
    onDragStart: function (item, key, parent) {
        console.log('start');
        this.state.currentItem = item;
        this.state.currentParent = parent.list;
    },
    onDragOver: function (item, key, parent) {
        console.log('over');
        this.__exchange(item, this.state.currentItem, parent.list);
    },
    onDragEnter: function (item, key) {
        var drag = this.state.currentItem;
        var parent = this.state.currentParent;

        var index = item.list.indexOf(drag);
        if (index == -1) {
            parent.splice(parent.indexOf(drag), 1);
            item.list.push(drag);
            this.setState({
                list: this.state.list,
                currentParent: item.list
            });
        }
    },
    onDragEnd: function () {
        this.state.currentItem = null;
        this.state.currentParent = null;
        //TODO save
    },
    __exchange: function (from, to, list) {
        if (!from || !to || typeof list !== 'object' || list.length < 0) {
            return;
        }
        var from_index = list.indexOf(from);
        var to_index = list.indexOf(to);
        if (from_index === to_index) {
            return;
        }
        if (to_index == -1) {
            list.splice(from_index, 0, to);
        } else {
            var max, min;
            from_index > to_index ? (max = from_index, min = to_index) : (max = to_index, min = from_index);
            var maxValue = list.splice(max, 1)[0];
            var minValue = list.splice(min, 1, maxValue)[0];
            list.splice(max, 0, minValue);
        }
        this.setState({
            list: this.state.list
        });
    },
    render: function () {
        //item
        function renderItem(parent, item, key) {
            return (
                <div className="item" key={key}
                     draggable={true}
                     onDragStart={this.onDragStart.bind(this, item, key, parent)}
                     onDragOver={this.onDragOver.bind(this, item, key, parent)}
                     onDragEnd={this.onDragEnd}
                >
                    {item.name}
                </div>
            )
        }

        //region
        function renderLi(item, key) {
            return (
                <div className="region" key={key}
                     onDrop={this.onDrop.bind(this, item, key)}
                     onDragEnter={this.onDragEnter.bind(this, item, key)}
                >
                    {item.list.map(renderItem.bind(this, item))}
                </div>
            )
        }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex'
            }}>
                {this.state.list.map(renderLi.bind(this))}
            </div>
        )
    }
});


module.exports = StoryList;