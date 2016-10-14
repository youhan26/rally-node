/**
 * Created by YouHan on 2016/8/29.
 */

"use strict";

require('./../style/header.css');

import React from "react";
import {Menu, Icon} from "antd";

const router = require('react-router');
const SubMenu = Menu.SubMenu;
const Link = router.Link;

const HorizonHeader = React.createClass({
    getInitialState() {
        return {
            current: '1',
            openKeys: [],
        };
    },
    handleClick(e) {
        this.setState({current: e.key});
    },
    onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => !(this.state.openKeys.indexOf(key) > -1));
        this.setState({
            openKeys: this.getKeyPath(latestOpenKey)
        });
    },
    getKeyPath(key) {
        const map = {
            sub1: ['sub1'],
        };
        return map[key] || [];
    },
    render: function () {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                selectedKeys={[this.state.current]}
                style={{ width: 240 }}
                onOpenChange={this.onOpenChange}
                onClick={this.handleClick}
                className="header"
            >
                <Menu.Item key="1">
                    <Link to="/stories">Story</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/bugs">Bug</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/report">Report</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/manage">Manage</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/share">Share</Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to="/stories">Story</Link>
                </Menu.Item>
                <SubMenu key="sub1" title={
                    <span><Icon type="setting" /><span>Tool</span></span>
                }>
                    <Menu.Item key="9">
                        <Link to="/font-size-converter">Font Size Converter</Link>
                    </Menu.Item>
                    <Menu.Item key="/qrcode">
                        <Link to="/qrcode">QRCode</Link>
                    </Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
});


export {HorizonHeader};