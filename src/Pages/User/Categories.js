import React from 'react'
import CategoryCard from '../../Components/CategoryCard'
import { useFirebase } from '../../Context/FirebaseContext';

const Categories = () => {
    const { CategoryData } = useFirebase();
  return (
    <div>
        <div className='Jumbotron'>
            <div className='overlay1'>
            <div className='container'>
                <div>
                <h1>Categories Blogs</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to Categories content or information.
                </p>
                </div>
            </div>
            </div>
        </div>
        <div>
            {CategoryData.map((item, id) => {
                return (
                    <div key={id}>
                        <CategoryCard item={item} id={id} />
                    </div>
                )}
            )}
        </div>
    </div>
  )
}

export default Categories