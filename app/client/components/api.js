/**
 * Created by YouHan on 2016/9/25.
 */
import {api} from "mimikiyru-utils";

const Api = {
  Project: {
    save: (data2) => {
      if (data2.id) {
        return api.patch({
          url: `/project/${data2.id}`,
          data: data2
        });
      }
      return api.post({
        url: '/project',
        data: data2
      });
    },
    add: (data2) => {
      return api.post({
        url: '/project',
        data: data2
      });
    },
    get: (id) => {
      if (id) {
        return api.get({
          url: `/project/${id}`
        });
      }
      return api.get({
        url: '/project/all'
      });
    }
  },
  Team: {
    add: (data2) => {
      return api.post({
        url: '/team',
        data: data2
      });
    },
    get: (id) => {
      if (id) {
        return api.get({
          url: `/team/${id}`
        });
      }
      return api.get({
        url: '/team/all'
      });
    },
    update: (data2) => {
      return api.patch({
        url: `/team/${data2.id}`,
        data: data2
      });
    },
    save: (data2) => {
      if (data2.id) {
        return api.patch({
          url: `/team/${data2.id}`,
          data: data2
        });
      }
      return api.post({
        url: '/team',
        data: data2
      });
    },
    del: (id) => {
      return api.del({
        url: `/team/${id}`
      });
    }
  },
  Role: {
    add: (data2) => {
      return api.post({
        url: '/role',
        data: data2
      });
    },
    get: (id) => {
      if (id) {
        return api.get({
          url: `/role/${id}`
        });
      }
      return api.get({
        url: '/role/all'
      });
    },
    update: (data2) => {
      return api.patch({
        url: `/role/${data2.id}`,
        data: data2
      });
    },
    save: (data2) => {
      if (data2.id) {
        return api.patch({
          url: `/role/${data2.id}`,
          data: data2
        });
      }
      return api.post({
        url: '/role',
        data: data2
      });
    },
    del: (id) => {
      return api.del({
        url: `/role/${id}`
      });
    }
  },
  Member: {
    add: (data2) => {
      return api.post({
        url: '/member',
        data: data2
      });
    },
    get: (id) => {
      if (id) {
        return api.get({
          url: `/member/${id}`
        });
      }
      return api.get({
        url: '/member/all'
      });
    },
    update: (data2) => {
      return api.patch({
        url: `/member/${data2.id}`,
        data: data2
      });
    },
    save: (data2) => {
      if (data2.id) {
        return api.patch({
          url: `/member/${data2.id}`,
          data: data2
        });
      }
      return api.post({
        url: '/member',
        data: data2
      });
    },
    del: (id) => {
      return api.del({
        url: `/member/${id}`
      });
    }
  },
  Task: {
    getList: (storyId2) => {
      return api.get({
        url: '/task/all',
        params: {
          storyId: storyId2
        }
      });
    },
    add: (data2) => {
      return api.post({
        url: '/task',
        data: data2
      });
    },
    get: (id) => {
      if (id) {
        return api.get({
          url: `/task/${id}`
        });
      }
      return api.get({
        url: '/task/all'
      });
    },
    update: (data2) => {
      return api.patch({
        url: `/task/${data2.id}`,
        data: data2
      });
    },
    save: (data2) => {
      if (data2.id) {
        return api.patch({
          url: `/task/${data2.id}`,
          data: data2
        });
      }
      return api.post({
        url: '/task',
        data: data2
      });
    },
    del: (id) => {
      return api.del({
        url: `/task/${id}`
      });
    }
  },
  Defect: {
    getList: (storyId2) => {
      return api.get({
        url: '/defect/all',
        params: {
          storyId: storyId2
        }
      });
    },
    add: (data2) => {
      return api.post({
        url: '/defect',
        data: data2
      });
    },
    get: (id) => {
      if (id) {
        return api.get({
          url: `/defect/${id}`
        });
      }
      return api.get({
        url: '/defect/all'
      });
    },
    update: (data2) => {
      return api.patch({
        url: `/defect/${data2.id}`,
        data: data2
      });
    },
    save: (data2) => {
      if (data2.id) {
        return api.patch({
          url: `/defect/${data2.id}`,
          data: data2
        });
      }
      return api.post({
        url: '/defect',
        data: data2
      });
    },
    del: (id) => {
      return api.del({
        url: `/defect/${id}`
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
      }
      throw new Error('must have project id ');
    },
    save: (data2) => {
      if (data2.id) {
        return api.patch({
          url: `/release/${data2.id}`,
          data: data2
        });
      }
      return api.post({
        url: '/release',
        data: data2
      });
    }
  },
  Story: {
    getList: (obj) => {
      return api.get({
        url: '/story/all',
        params: obj
      });
    },
    get: (id) => {
      return api.get({
        url: `/story/${id}`
      });
    },
    save: (data2) => {
      if (data2.id) {
        return api.patch({
          url: `/story/${data2.id}`,
          data: data2
        });
      }
      return api.post({
        url: '/story',
        data: data2
      });
    }
  }
};

export default Api;
