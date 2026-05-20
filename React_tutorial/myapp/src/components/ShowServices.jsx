import React from 'react'   
import { useSelector, useDispatch } from 'react-redux';
import MapComponent from './MapComponent';
import Services from './Services';
import Controls from './Controls';
export default function ShowServices() {
  const { isAuthenticated , service} = useSelector((state) => state.auth);
    if(isAuthenticated && service!==null){
        return (
            <div>
                <h1>Services for {service}</h1>
                <MapComponent />
            </div>
        )
    }
    return (
        <div>
            <Services/>
        </div>
    )

}
