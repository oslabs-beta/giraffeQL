import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

import Column from './Column.js';

export default memo(({ data }) => {

    const props = data.label.props.children.props;
    console.log(props);

    return (
        <div>

            <Handle
                type="target"
                position="left"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />

            <div>{props.tablename}</div>
            
            {props.columns.map(column => <Column name={column.name} key={column.name} dataType={column.dataType} />)}
            {props.columns.map((column, i) => <Handle type='source' position='right' id={`id-${i}`} key={`id-${i}`} style={{ top: 10 * i, background: '#555' }} />)}

        </div>
    );
});


// <Handle
// type="source"
// position="right"
// id="a"
// style={{ top: 10, background: '#555' }}
// />

// <Handle
// type="source"
// position="right"
// id="b"
// style={{ bottom: 10, top: 'auto', background: '#555' }}
// />