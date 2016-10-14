***REMOVED***
 * Created by YouHan on 2016/9/25.
***REMOVED***
import {api} from "mimikiyru-utils";

var Api = {
    Project: {
        add: (data) => {
            return api.post({
                url: '/project',
                data: data
            ***REMOVED***
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/project',
                    params: {
                        id: id
                    }
                ***REMOVED***
            } else {
                return api.get({
                    url: '/project/all'
                ***REMOVED***
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
                ***REMOVED***
            } else {
                return api.get({
                    url: '/team/all'
                ***REMOVED***
            }
        },
        update: (data) => {
            return api.patch({
                url: '/team/' + data.id,
                data: data
            ***REMOVED***
        },
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/team/' + data.id,
                    data: data
                ***REMOVED***
            } else {
                return api.post({
                    url: '/team',
                    data: data
                })
            }
        },
        del: (id) => {
            return api.del({
                url: '/team/' + id
            ***REMOVED***
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
                ***REMOVED***
            } else {
                return api.get({
                    url: '/role/all'
                ***REMOVED***
            }
        },
        update: (data) => {
            return api.patch({
                url: '/role/' + data.id,
                data: data
            ***REMOVED***
        },
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/role/' + data.id,
                    data: data
                ***REMOVED***
            } else {
                return api.post({
                    url: '/role',
                    data: data
                })
            }
        },
        del: (id) => {
            return api.del({
                url: '/role/' + id
            ***REMOVED***
        }
    },
    Member: {
        add: (data) => {
            return api.post({
                url: '/member',
                data: data
            })
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/member',
                    params: {
                        id: id
                    }
                ***REMOVED***
            } else {
                return api.get({
                    url: '/member/all'
                ***REMOVED***
            }
        },
        update: (data) => {
            return api.patch({
                url: '/member/' + data.id,
                data: data
            ***REMOVED***
        },
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/member/' + data.id,
                    data: data
                ***REMOVED***
            } else {
                return api.post({
                    url: '/member',
                    data: data
                })
            }
        },
        del: (id) => {
            return api.del({
                url: '/member/' + id
            ***REMOVED***
        }
    }
};


export default Api;
