import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

import Column from './Column.js';

export default memo(({ data }) => {

    const props = data.label.props.children.props;

    const colors=['#54478cff', '#2c699aff', '#048ba8ff', '#0db39eff', '#16db93ff', '#83e377ff', '#b9e769ff', '#efea5aff', '#f1c453ff', '#f29e4cff'];

    return (
        <div className='node'>

            <div className='header' style={{backgroundColor: `${colors[props.IEnumerable % colors.length]}`}}>{props.tablename}</div>
            
            <div className='tables'>
                {props.columns.map(column => <Column name={column.name} key={column.name} dataType={column.dataType} />)}
            </div>

            <div className="edges">
                {props.columns.map((column, i) => <Handle type='target' position='left' id={`id-${i}`} key={`id-${i}`} style={{ top: 10 * i, background: '#555' }} />)}
                {props.columns.map((column, i) => <Handle type='source' position='right' id={`id-${i}`} key={`id-${i}`} style={{ top: 10 * i, background: '#555' }} />)}
            </div>

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

                *{
                    transition: all .25s;
                    font-family: 'Permanent Marker', cursive;
                }

                .node{
                    position: relative;
                    max=width: 5em;
                    max-height: 8em;
                    background: #FAFAFA;
                    border-radius: 8px;
                    padding: .5em;
                    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.15));
                }

                .header{
                    position: absolute;
                    height: 1.5em;
                    font-size: 50%;
                    left: 0%;
                    right: 0%;
                    top: 0%;
                    bottom: 75%;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    text-align: center;
                }

                .tables{
                    max-height: 4em;
                    overflow-y: auto;
                    margin: .25em;
                    margin-bottom: 0;
                }

                ::-webkit-scrollbar {
                    width: 8px;
                    margin-left: 8px;
                    background: #C4C4C4;
                }
                  
                ::-webkit-scrollbar-thumb {
                    background: #858585;
                    border-radius: 5px;
                    padding: 5px;
                }

            `}</style>

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