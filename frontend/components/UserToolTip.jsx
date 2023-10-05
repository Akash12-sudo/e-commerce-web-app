
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


const signOutAPI = async () => {

    try {
        const res = await fetch('http://127.0.0.1:8000/signout', {
            method: "GET",
            credentials: 'include'
        })
        console.log(res)
        if(res.status === 201) {
            location.reload()
        }
    }
    catch (err) {
        console.log(err)
    }
}

const signOutHandler = () => {
    
    signOutAPI()
}


const UserToolTip = () => {

    const user = useSelector((state) => state.getUser)
    console.log(user)

    return (
      <div className="mt-12 absolute z-10 p-4 flex flex-col items-center drop-shadow-lg bg-white w-40 h-auto border border-solid border-slate-600">
        <Link to = {`/profile/${user._id}`} className = "p-1 my-2 rounded-lg w-5/6 text-center font-semibold bg-yellow-500/75 text-white font-sans text-[0.8rem]" >Your profile</Link>
        <button onClick={signOutHandler} className = "p-1 rounded-lg w-5/6 text-center font-semibold bg-red-600/75 text-white font-sans text-[0.8rem]">Sign Out</button>
      </div>
    )
    
  }

  
  export default UserToolTip