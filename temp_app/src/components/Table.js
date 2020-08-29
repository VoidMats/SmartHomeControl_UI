

import React from 'react';

export const CreateRow = (props) => {
    let row = []
    if (props.row !== undefined) {
        row = props.row 
    }
    let index = -1
    const rtnRow = row.map(element => {
        index = index + 1
        return <td key={index}>{element.toString()}</td>
    })
    return rtnRow
}

export const CreateTable = (props) => {
    let lst = []
    if (props.lst !== undefined) {
        lst = props.lst
    }
    const rtnData = lst.map(row => {
        return (<tr key={row[0]}><CreateRow row={row} /></tr>)
    })
    return rtnData
}

