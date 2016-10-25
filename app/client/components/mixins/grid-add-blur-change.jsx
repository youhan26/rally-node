/**
 * Created by YouHan on 2016/10/25.
 */

import {message, notification} from 'antd';

export default {
    componentWillMount() {
        this.loadData();
    },
    blur(index, field) {
        //if new value
        if (!this.state.data[index].id) {
            return;
        }
        //if data no change
        if (this.oriData[index][field] == this.state.data[index][field]) {
            return;
        }
        this.oriData[index][field] = this.state.data[index][field];
        this.save(this.state.data[index]);
    },
    change(index, field, e){
        const newValue = (e.target ? e.target.value : e);
        const oldValue = this.state.data[index][field];
        if (oldValue != newValue) {
            this.state.data[index][field] = newValue;
            this.setState(this.state);
        }
    },
    click(index, record){
        if (record.id) {
            this.remove(index);
        } else {
            this.save(this.state.data[index], true);
        }
    },
    save(data, needReload){
        const me = this;
        notification['info']({
            message: 'Saving',
            duration: 1,
        });
        me.api.save(data)
            .then((res) => {
                if (res.success) {
                    notification['success']({
                        message: 'Saved Successfully',
                        duration: 1,
                    });
                    if (needReload) {
                        me.loadData();
                    }
                } else {
                    message.error('Error happen when save!');
                }
            });
    },
    remove(index){
        const me = this;
        this.api.del(this.state.data[index].id).then(function (res) {
            if (res && res.success) {
                notification['success']({
                    message: 'Remove Successfully',
                    duration: 1,
                });
                me.loadData();
            }
        });
    },
    loadData(){
        const me = this;
        me.state.loading = true;
        me.setState(me.state);

        me.api.get().then((result) => {
            const data = result.data;

            //update ori data for compare
            me.oriData = JSON.parse(JSON.stringify([me.getEmptyData()].concat(data)));

            if (data && data.length > 0) {
                data.forEach((item) => {
                    item.key = item.id;
                    item.status = '' + item.status;
                });
            }

            me.setState({
                data: [me.getEmptyData()].concat(data),
                loading: false
            });

        });
    },
}
