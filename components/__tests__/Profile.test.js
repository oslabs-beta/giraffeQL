import React from 'react';
import ReactDOM from 'react-dom';
import Profile from '../Profile';

import {render} from '@testing-library/react';

describe("Profile module",()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Profile></Profile>, div)
    })

})