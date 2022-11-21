import React from 'react'
import VerticalCard from '../../Components/VerticalCard'
import { useFirebase } from '../../Context/FirebaseContext';

const Featured = () => {
  const { BlogData } = useFirebase();
  return (
    <div>
        <div className='Jumbotron'>
            <div className='overlay1'>
            <div className='container'>
                <div>
                <h1>Featured Blogs</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                </div>
            </div>
            </div>
        </div>
        <div>
            {BlogData.map((item, id) => {
            if(item.Featured === true){
            return (
            <div key={id}>
                <VerticalCard item={item} id={id} />
            </div>
            )}
            })}
        </div>
    </div>
  )
}

export default Featured