

import React from 'react';

export const CreateRow = (props) => {
    let row = []
    if (props.row !== undefined) {
        row = props.row 
    }
    const rtnRow = row.map(element => {
        return <td>{element.toString()}</td>
    })
    return rtnRow
}

export const CreateTable = (props) => {
    let lst = []
    if (props.lst !== undefined) {
        lst = props.lst
    }
    const rtnData = lst.map(row => {
        return (<tr><CreateRow row={row} /></tr>)
    })
    return rtnData
}

