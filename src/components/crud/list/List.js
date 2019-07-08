import React, {useEffect, useState} from 'react';
import CustomTable from './CustomTable';

export  default  function List(props)
{


    const columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id',
            fixed: 'left',
        },
        {
            title: 'text',
            dataIndex: 'text',
            key: 'text',

            fixed: 'left',
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            key: 'createdAt',
            fixed: 'left',
        },

        ,
        {
            title: 'updateAt',
            width: 100,
            dataIndex: 'updateAt',
            key: 'updateAt',
            fixed: 'left',
        },

    ];


    const [data, updateData] = useState({dataset: []});
    //https://www.mkyong.com/spring-boot/spring-boot-webflux-server-sent-events-example/
    useEffect(() => {

        const eventSource = new EventSource("http://localhost:8080/stream/tweets");
        eventSource.onmessage = (e) => {
            const element = JSON.parse(e.data);
            element.key = element.id;
            let dataset = data.dataset;
            const indexOfDataSet = dataset.findIndex(currentData => currentData.id === element.id);
            if (indexOfDataSet === -1) {
                dataset.push(element);
                updateData({dataset: dataset});
            } else {

                if (dataset[indexOfDataSet].updateAt !== element.updateAt) {
                    console.log(element)
                    console.log(dataset[indexOfDataSet].updateAt !== element.updateAt)
                }


                if (dataset[indexOfDataSet]) {

                    if (dataset[indexOfDataSet].updateAt !== element.updateAt) {
                        dataset[indexOfDataSet] = element;
                        updateData({dataset: dataset});
                    }

                }


            }


        };


    });



    return (
        <>
            <CustomTable data={data.dataset} size={data.dataset.length} columns={columns}/>
        </>
    );
}