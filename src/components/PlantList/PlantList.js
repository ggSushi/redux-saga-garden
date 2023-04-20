import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
        // const reduxState = useSelector(store => store);
    const dispatch = useDispatch();
    const plantList = useSelector(store => store.plantList);

    const getPlants = () => {
        dispatch({ type: 'FETCH_PLANT_LIST'})
    }

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        getPlants();
        console.log(`YO`, plantList)
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
            {/* Can't get this to work just yet! Oops, my bad hahahaha */}
            <h5></h5>
            <pre>{JSON.stringify(plantList)}</pre>
            <ul>
                {
                    plantList.map(plant => (
                        <li key={plant.id}>
                            {plant.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default PlantList;
