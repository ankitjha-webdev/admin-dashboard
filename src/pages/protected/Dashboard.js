import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Dashboard from '../../features/dashboard/index'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Dashboard"}))
      }, [])


    return(
        <>
         {/* <Dashboard /> */}
        <h1 className='text-3xl text-blue-700'>Dashboard </h1>
        </>
    )
}

export default InternalPage