/**
 * Created by YouHan on 2016/9/25.
 */
import {api} from "mimikiyru-utils";

var Api = {
    Project: {
        add: (data) => {
            return api.post({
                url: '/project',
                data: data
            });
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/project',
                    params: {
                        id: id
                    }
                });
            } else {
                return api.get({
                    url: '/project/all'
                });
            }
        }
    },
    Team: {
        add: (data) => {
            return api.post({
                url: '/team',
                data: data
            })
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/team',
                    params: {
                        id: id
                    }
                });
            } else {
                return api.get({
                    url: '/team/all'
                });
            }
        },
        update: (data) => {
            return api.patch({
                url: '/team/' + data.id,
                data: data
            });
        },
        del: (id) => {
            return api.del({
                url: '/team/' + id
            });
        }
    },
    Role: {
        add: (data) => {
            return api.post({
                url: '/role',
                data: data
            })
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/role',
                    params: {
                        id: id
                    }
                });
            } else {
                return api.get({
                    url: '/role/all'
                });
            }
        },
        update: (data) => {
            return api.patch({
                url: '/role/' + data.id,
                data: data
            });
        },
        del: (id) => {
            return api.del({
                url: '/role/' + id
            });
        }
    }
};


export default Api;
