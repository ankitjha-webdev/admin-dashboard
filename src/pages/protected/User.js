import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import {Link} from 'react-router-dom'
import TemplatePointers from '../../features/user/components/TemplatePointers'

function User(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : ""}))
      }, [])

    return(
      <div className="hero h-4/5 bg-base-200">
      <div className="hero-content">
        <div className="max-w-md">
            {/* <!-- Title --> */}
            <h1 className='text-3xl text-blue-700'>User</h1>
            <TemplatePointers />
            <Link to="/app/dashboard"><button className="btn bg-base-100 btn-outline">Get Started</button></Link>
        </div>
      </div>
    </div>
    )
}

export default User