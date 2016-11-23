/**
 * Created by YouHan on 2016/9/25.
 */
import {api} from "mimikiyru-utils";
import Auth from "./auth";


class BasicApi {
  constructor(field) {
    this.field = field;
  }
  
  add(d) {
    const me = this;
    return api.post({
      url: `/${me.field}`,
      data: d
    });
  }
  
  update(d) {
    const me = this;
    return api.patch({
      url: `/${me.field}/${d.id}`,
      data: d
    });
  }
  
  save(data) {
    if (data && data.id) {
      return this.update(data);
    }
    return this.add(data);
  }
  
  get(id) {
    const me = this;
    if (id) {
      return api.get({
        url: `/${me.field}/${id}`
      });
    }
    return api.get({
      url: `/${me.field}/all`
    });
  }
  
  del(id) {
    const me = this;
    return api.del({
      url: `/${me.field}/${id}`
    });
  }
}

const Api = {
  Project: new class extends BasicApi {
    constructor() {
      super('project');
    }
  }(),
  Team: new class extends BasicApi {
    constructor() {
      super('team');
    }
  }(),
  Role: new class extends BasicApi {
    constructor() {
      super('role');
    }
  }(),
  Member: new class extends BasicApi {
    constructor() {
      super('member');
    }
  }(),
  Task: new class extends BasicApi {
    constructor() {
      super('task');
      
      this.getList = this.getList.bind(this);
    }
    
    getList(id) {
      return api.get({
        url: '/task/all',
        params: {
          storyId: id
        }
      });
    }
  }(),
  Defect: new class extends BasicApi {
    constructor() {
      super('defect');
      
      this.getList = this.getList.bind(this);
    }
    
    getList(id) {
      return api.get({
        url: '/defect/all',
        params: {
          storyId: id
        }
      });
    }
  }(),
  Release: new class extends BasicApi {
    constructor() {
      super('release');
    }
    
    get(id) {
      if (id) {
        return api.get({
          url: '/release',
          params: {
            projectId: id
          }
        });
      }
      throw new Error('must have project id ');
    }
  }(),
  Story: new class extends BasicApi {
    constructor() {
      super('story');
      
      this.getList = this.getList.bind(this);
    }
    
    getList(obj) {
      return api.get({
        url: '/story/all',
        params: obj
      });
    }
  }(),
  Topic: new class extends BasicApi {
    constructor() {
      super('topic');
      
      this.getUserList = this.getUserList.bind(this);
      this.setUserList = this.setUserList.bind(this);
    }
    
    getUserList() {
      return api.get({
        url: '/topic/getUserList',
        params: {
          userId: Auth.getUser().id
        }
      });
    }
    
    setUserList(data) {
      return api.post({
        url: '/topic/setUserList',
        data: {
          list: data,
          id: Auth.getUser().id
        }
      });
    }
  }(),
  Share: new class extends BasicApi {
    constructor() {
      super('share');
      
      this.getReplay = this.getReplay.bind(this);
    }
    
    getReplay(obj) {
      return api.get({
        url: '/share/getReplay',
        params: obj
      });
    }
  }(),
  Replay: new class extends BasicApi {
    constructor() {
      super('replay');
    }
  }()
};

export default Api;
