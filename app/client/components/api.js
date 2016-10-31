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
                    url: '/project/' + id
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
                    url: '/team/' + id
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
                    url: '/role/' + id
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
                    url: '/member/' + id
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
    Task: {
        getList: (storyId)=> {
            return api.get({
                url: '/task/all',
                params: {
                    storyId: storyId
                }
            });
        },
        add: (data) => {
            return api.post({
                url: '/task',
                data: data
            })
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/task/' + id
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
    Defect: {
        getList: (storyId)=> {
            return api.get({
                url: '/defect/all',
                params: {
                    storyId: storyId
                }
            });
        },
        add: (data) => {
            return api.post({
                url: '/defect',
                data: data
            })
        },
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/defect/' + id
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
    Release: {
        get: (id) => {
            if (id) {
                return api.get({
                    url: '/release',
                    params: {
                        projectId: id
                    }
                });
            } else {
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
    },
    Story: {
        getList: (obj) => {
            return api.get({
                url: '/story/all',
                params: obj
            });
        },
        get: (id)=> {
            return api.get({
                url: '/story/' + id
            });
        },
        save: (data) => {
            if (data.id) {
                return api.patch({
                    url: '/story/' + data.id,
                    data: data
                });
            } else {
                return api.post({
                    url: '/story',
                    data: data
                })
            }
        }
    }
};


export default Api;
