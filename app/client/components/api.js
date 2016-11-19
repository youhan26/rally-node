/**
 * Created by YouHan on 2016/9/25.
 */
import {api} from "mimikiyru-utils";


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
    }
    
    getList(obj) {
      return api.get({
        url: '/story/all',
        params: obj
      });
    }
  }()
};

export default Api;
