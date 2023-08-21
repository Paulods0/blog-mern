import React from "react"
import "./UserCompo.css"

const UserComp = ({username}) => {
  return (
    <div>
      <div className="username-container">
        <p>{username}</p>
      </div>
    </div>
  )
}

export default UserComp
