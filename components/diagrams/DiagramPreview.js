import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/state.js';

const DiagramPreview = (props) => {

    return (
        <div>

            <div className='previewcontainer'>
                {props.name} <br/>
                {props.id} <br/>
                <button onClick={() => props.selectDiagram(props.id)} >Open</button>
                <button onClick={() => props.deleteDiagram(props.id)} >Delete</button>
            </div>

            <style jsx>{`

                .previewcontainer{
                    padding: 32px;
                    background-color: green;
                }

            `}</style>

        </div>
    );
}
// hi benji\ suppppppp B-) 
export default DiagramPreview;