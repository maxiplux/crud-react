import React, { useState } from 'react';
import { Table } from 'antd';


export  default function CustomTable(props) {


    return (
        <>
            <Table columns={props.columns} dataSource={props.data} scroll={{ x: 1300 }} />
        </>
    );
}