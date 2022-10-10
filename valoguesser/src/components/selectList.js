import React from 'react';
import { useFetchData } from '../util/hooks/useFetchData';
import Card from './card'

const SelectList = () => {
    const { isLoading, data, error } = useFetchData("http://localhost:4646/map");

    return (
        <ul className="map-selection">
            {error ? (
                <div>error</div>
            ) : !isLoading ? (
                data.map((item, index) => (
                    //turn this into a cards list instead
                    //replace index with actual id
                    <li key={item.map_uid}>
                        <Card img={item.thumbnail} id={item.map_uid} name={item.name} />
                    </li>
                ))
            ) : (
                <div>loading...</div>
            )}
        </ul>
    );
}
export default SelectList;
