

import React from 'react';

export const CreateRow = (props) => {
    const rtnRow = props.row.map(element => {
        return <td>{element.toString()}</td>
    })
    return rtnRow
}

export const CreateTable = (props) => {
    const rtnData = props.lst.map(row => {
        return (<tr><CreateRow row={row} /></tr>)
    })
    return rtnData
}