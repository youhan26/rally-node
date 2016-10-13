/* @flow***REMOVED***
'use strict';

import React from "react";
import {api} from "mimikiyru-utils";

const TeamSelect = React.createClass({
    componentWillMount() {
        api.get({
            url: '/team/all'
        }).then((res) => {
            if (res && res.data) {
                //TODO
            }
        ***REMOVED***
    },
    render() {
        return (
            <Select {...this.props}>
                {this.state.list.map((item, key) => {
                    return <Option value={item.id} key={key}>{item.value}</Option>
                })}
            </Select>
        )
    }
***REMOVED***

export default TeamSelect;