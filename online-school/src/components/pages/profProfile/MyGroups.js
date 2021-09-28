import React from 'react'
import {Link} from 'react-router-dom'
import { CircularProgress } from '@material-ui/core';

function MyGroups({groups}) {
  return (
    <React.Fragment>
      <h1>My Groups</h1>
      {groups? (
        <React.Fragment>
          <div className="container pt-2">
          <div className="row">
          {groups.map((group)=>(
            <React.Fragment>                     
              <div className="col-md-3">
              <div className="card bg-light mb-3">
                <div className="card-header">{group.name}</div>
                <div className="card-body">
                  <h5 className="card-title">Light card title</h5>
                  <p className="card-text">Group info</p>
                  <Link to={`/teacher-space/${group.id}/lessons`} className="btn btn-primary">Group Lessons</Link >
                </div>
                </div>
              </div>
              </React.Fragment>         
          ))}
            </div>
          </div>
        </React.Fragment>
      ): (<CircularProgress />)}

    </React.Fragment>
  )
}

export default MyGroups
