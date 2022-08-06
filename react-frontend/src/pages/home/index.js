import React, {useEffect} from 'react';
import Counter from '../../components/counter'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slice/pagename'
import { getUsers } from '../../services/user'
import { useSelector } from 'react-redux';

function Home() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)
    
    useEffect(() => {
        dispatch(setPageName("Home"))
    })

    useEffect(() => {
      async function fetchAllUsers() {
        await getUsers()
      }
      fetchAllUsers();
    }, [])

    return (
      <div>
        <p>Home Page</p>
        <Counter />
        {
          users.length > 0
          ?
            users.map((obj, index) => {
                return (<div key={index}>{obj.username}</div>)
            })
          :
            null
        }
      </div>
    )
}

export default Home