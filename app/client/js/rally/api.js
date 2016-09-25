/**
 * Created by YouHan on 2016/9/25.
 */

const _basicAdd = (table) => {
    return new Promise(function (resolver, rejector) {
        //TODO import mimikiyru-util
        resolver();
    });
};


var Api = {
    Project: {
        add: () => {
            return _basicAdd('project');
        }
    }
};


export default Api;
