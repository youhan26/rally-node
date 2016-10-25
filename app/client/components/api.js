/**
 * Created by YouHan on 2016/9/25.
 */
import {api} from "mimikiyru-utils";

var Api = {
    Project: {
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/project/' + data.id,
                    data: data
                });
            } else {
                return api.post({
                    url: '/project',
                    data: data
                });
            }
        },
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
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/team/' + data.id,
                    data: data
                });
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
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/role/' + data.id,
                    data: data
                });
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
            });
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
                });
            } else {
                return api.get({
                    url: '/member/all'
                });
            }
        },
        update: (data) => {
            return api.patch({
                url: '/member/' + data.id,
                data: data
            });
        },
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/member/' + data.id,
                    data: data
                });
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
            });
        }
    },
    Task : {
        add: (data) => {
            return api.post({
                url: '/task',
                data: data
            })
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/task',
                    params: {
                        id: id
                    }
                });
            } else {
                return api.get({
                    url: '/task/all'
                });
            }
        },
        update: (data) => {
            return api.patch({
                url: '/task/' + data.id,
                data: data
            });
        },
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/task/' + data.id,
                    data: data
                });
            } else {
                return api.post({
                    url: '/task',
                    data: data
                })
            }
        },
        del: (id) => {
            return api.del({
                url: '/task/' + id
            });
        }
    },
    Defect : {
        add: (data) => {
            return api.post({
                url: '/defect',
                data: data
            })
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/defect',
                    params: {
                        id: id
                    }
                });
            } else {
                return api.get({
                    url: '/defect/all'
                });
            }
        },
        update: (data) => {
            return api.patch({
                url: '/defect/' + data.id,
                data: data
            });
        },
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/defect/' + data.id,
                    data: data
                });
            } else {
                return api.post({
                    url: '/defect',
                    data: data
                })
            }
        },
        del: (id) => {
            return api.del({
                url: '/defect/' + id
            });
        }
    },
    Release : {
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/release',
                    params: {
                        projectId: id
                    }
                });
            }else{
                throw new Error('must have project id ');
            }
        },
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/release/' + data.id,
                    data: data
                });
            } else {
                return api.post({
                    url: '/release',
                    data: data
                })
            }
        }
    }
};


export default Api;
