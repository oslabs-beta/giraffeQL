import * as React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import ReactDOM from 'react-dom';
import Contact from '../contact';

describe("Contact module",()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Contact></Contact>, div)
    })

    it("find text content base on test id",()=>{
        render(<Contact />);
        // expect(screen.getByTestId('header')).toEqual('Contact us')
        expect(screen.getByTestId('header')).toHaveTextContent('Contact us')
    })
})