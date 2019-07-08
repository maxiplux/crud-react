import React from 'react';
import {Table} from 'antd';


export  default function CustomTable(props) {


    return (
        <>
            <Table
                pagination={{showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ['100', '200', '300', '40']}}
                columns={props.columns} dataSource={props.data} scroll={{x: 1300}}/>
        </>
    );
}