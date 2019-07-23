import React, { Component } from 'react';
import { Table, Divider, Icon, Button, Modal } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from '../../utils/request';

import styles from './list.less';

const { confirm } = Modal;

class Index extends Component{

    constructor(props){
        super(props);
        this.state = {
            serviceList: [],
            showModalForm: false,
            modalTitle: '',
            formContainer: {
                
            }
        }
    }

    componentDidMount(){
        const _that = this;
        request('/service/getlist', { method: 'POST' })
        .then( res=>{
            res.data.map(item=>{
                item.key = item.id
            })
            _that.setState({
                serviceList: res.data
            })
        })
        .catch( err=>{
            console.log(err)
        })
    }

    // 新增客服按钮
    addService(){
        this.setState({
            showModalForm: true,
            modalTitle: '新增客服'
        })
    }

    // 关闭弹窗
    ModalFormClose(){
        this.setState({
            showModalForm: false
        })
    }

    // 编辑按钮
    onEditItem(id){
        console.log(id)
        this.setState({
            showModalForm: true,
            modalTitle: '编辑客服'
        })
    }

    // 删除按钮
    onDeletItem(record){
        confirm({
            title: `确定要删除${record.name}吗？`,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk(){},
            onCancel(){}
        })
    }

    // 分页页码切换
    onPageChange(page, pageSize){
        console.log(page, pageSize)
    }

    // 分页长度页面
    onShowSizeChange(current, size){
        console.log(current, size)
    }

    render(){
        const { serviceList, showModalForm, modalTitle } = this.state;
        const columns = [
            { title: '姓名(登陆账号名)', dataIndex: 'name', key: 'name', align: 'center', width: 150,
                render: id=>(<span>{id}</span>)
            },
            { title: '性别', dataIndex: 'gender', key: 'gender', align: 'center', width: 80,
                render: gender=>gender ? <span>男</span> :<span>女</span> 
            },
            { title: '所属部门', dataIndex: 'department', key: 'department', align: 'center', width: 150,
                render: text=>(<span>{text}</span>)
            },
            { title: '当前职务', dataIndex: 'position', key: 'position', align: 'center', width: 120,
                render: text=>(<span>{text}</span>)
            },
            { title: '关注的服务领域', dataIndex: 'focuson', key: 'focuson', align: 'center', width: 200,
                render: text=>(<span>{text}</span>)
            },
            { title: '微信号', dataIndex: 'wechat', key: 'wechat', align: 'center', width: 200,
                render: text=><span>{text}</span>
            },
            { title: '操作', key: 'action', align: 'center', width: 200,
                render: (text, record) => (
                    <span>
                      <a onClick={this.onEditItem.bind(this, record.id)}><Icon type="edit" /> 编辑</a>
                      <Divider type="vertical" />
                      <a onClick={this.onDeletItem.bind(this, record)}><Icon type="delete" /> 删除</a>
                    </span>
                )
            },
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return(
            <PageHeaderWrapper>
                <div className={styles.serviceList}>
                    <Button type='primary' icon='plus' onClick={this.addService.bind(this)}>新增客服</Button>
                </div>
                <Table bordered columns={columns} dataSource={serviceList} 
                    rowSelection={rowSelection}
                    pagination={{
                        total: 50,
                        showSizeChanger: true,
                        onChange:this.onPageChange.bind(this),
                        pageSizeOptions: ['10', '15', '20'],
                        onShowSizeChange: this.onShowSizeChange.bind(this)
                    }}
                />
                <Modal visible={showModalForm}
                    title={modalTitle} 
                    onCancel={this.ModalFormClose.bind(this)}
                ></Modal>
            </PageHeaderWrapper>
        )
    }
}

export default Index;