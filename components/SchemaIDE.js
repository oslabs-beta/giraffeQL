import { useState, useEffect } from 'react';
import { useStoreState } from 'react-flow-renderer';

import generateAllTypes from '../converters/TypeDefs.js';

import hljs from 'highlight.js';
import hljsDefineGraphQL from 'highlightjs-graphql';
import javascript from 'highlight.js/lib/languages/javascript';

const SchemaIDE = (props) => {

    const store = useStoreState((store) => store);

    const [tables, updateTable] = useState([]);
    const [schema, writeSchema] = useState('');

    useEffect(() => {
        hljs.registerLanguage("javascript", javascript);
        hljsDefineGraphQL(hljs);
    }, []);

    useEffect(() => {
        
        const newTables = [];

        store.elements.filter(node => !node.id.includes('reactflow')).forEach(node => {

            const newTable = {};

            newTable.name = node.data.label.props.children.props.tablename;
            newTable.columns = node.data.label.props.children.props.columns;

            newTables.push(newTable);

        });

        updateTable(newTables);

    }, [store.elements]);

    useEffect(() => {
        refreshSchema();
    }, [tables]);

    const refreshSchema = () => {
        hljs.initHighlighting();
        writeSchema(generateAllTypes(tables));
    }

    const test = `
    type Film { 
        director: String!
        opening_crawl: String!
        episode_id: Int!
        _id: Int!
        title: String!
        release_date: Int!
        producer: String!
    }
    `

    return (
        <div id='ide' >

            <div className='sidebar' >

                <div id='gql'><h1>GraphQL</h1><h2>Query</h2></div>

                <pre><code>{`
type Film { 
    director: String!
    opening_crawl: String!
    episode_id: Int!
    _id: Int!
    title: String!
    release_date: Int!
    producer: String!
}

type Person { 
    gender: String
    species_id: Int
    homeworld_id: Int
    height: Int
    _id: Int!
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    name: String!
    birth_year: String
}

type People_in_film { 
    person_id: Int!
    film_id: Int!
    _id: Int!
}

type Pilot { 
    _id: Int!
    person_id: Int!
    vessel_id: Int!
}

type Planet { 
    orbital_period: Int
    climate: String
    gravity: String
    terrain: String
    surface_water: String
    population: Int
    _id: Int!
    name: String
    rotation_period: Int
    diameter: Int
}

type Planets_in_film { 
    film_id: Int!
    planet_id: Int!
    _id: Int!
}

type Species { 
    hair_colors: String
    name: String!
    classification: String
    average_height: String
    average_lifespan: String
    skin_colors: String
    eye_colors: String
    language: String
    homeworld_id: Int
    _id: Int!
}

type Species_in_film { 
    film_id: Int!
    species_id: Int!
    _id: Int!
}

type Starship_spec { 
    _id: Int!
    vessel_id: Int!
    MGLT: String
    hyperdrive_rating: String
}

type Vessel { 
    cost_in_credits: Int
    length: String
    vessel_type: String!
    model: String
    manufacturer: String
    name: String!
    vessel_class: String!
    max_atmosphering_speed: String
    crew: Int
    passengers: Int
    cargo_capacity: String
    consumables: String
    _id: Int!
}

type Vessels_in_film { 
    _id: Int!
    film_id: Int!
    vessel_id: Int!
}
                `}</code></pre>

            </div>

            <style jsx>{`

                #ide {
                    position: fixed;
                    height: 100%;
                    width: 20%;
                    padding: 0px 16px;
                    margin: 0;
                    right: 0;
                    background-color: white;
                    z-index: 999999998;
                    overflow: hidden;
                    box-shadow: -3px 0px 3px rgba(0,0,0,.05);
                }

                #gql{
                    display: flex;
                    align-items: center;
                    margin-top: 12px;
                }

                h1{
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    line-height: 0;
                    color: #e10098;
                    margin: 0;
                }

                h2{
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    line-height: 0;
                    color: white;
                    background-color: #38b2ac;
                    padding: 24px 8px;
                    border-radius: 16px 8px;
                    margin: 0;
                }

                .hljs{
                    border-radius: 8px;
                    overflow: auto;
                    height: 600px;
                }

                ::-webkit-scrollbar {
                    width: 5px;
                }

                ::-webkit-scrollbar-track {
                    background: transparent;
                }

                ::-webkit-scrollbar-thumb {
                    background: #454954;
                    border-radius: 16px;
                    border-right: none;
                    border-left: none;
                }

                ::-webkit-scrollbar-track-piece:end {
                    background: transparent;
                    margin-bottom: 16px; 
                }
                
                ::-webkit-scrollbar-track-piece:start {
                    background: transparent;
                    margin-top: 16px;
                }

            `}</style>

        </div>
    );

}

export default SchemaIDE;