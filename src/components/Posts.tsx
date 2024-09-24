import { Link } from 'react-router-dom'
import { IPost } from '../interfaces/post'




function Post({ _id, name, image, zone}: IPost) {
    return <div className="column is-one-quarter-desktop is-one-third-tablet">
        <Link to={`/post/${_id}`}>
            <div className="card">
                <div className="card-header">
                    <div className="card-header-title">{name}</div>
                </div>
                <div className="card-image">
                    <figure className="image image-is-1by1">
                        <img src={image} alt={name} />
                    </figure>
                </div>
                <div className="card-content">
                    <h5>{zone}</h5>
                </div>
            </div>
        </Link>
    </div>
}



export default Post