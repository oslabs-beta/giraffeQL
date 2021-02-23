import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/state.js';

const DiagramPreview = (props) => {

    return (
        <div>

            <div className='previewcontainer'>
                {props.name}
                <button>Open</button>
                <button>Delete</button>
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