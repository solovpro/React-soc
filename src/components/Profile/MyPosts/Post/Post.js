import s from './Post.module.css';

let Post = (props) => {
      return (
            <div className = {s.item}>
                  <img src="https://www.zastavki.com/pictures/2560x1600/2018Backgrounds_Purple_background_with_spiral_pattern_127254_19.jpg" alt="" />
                  {props.message}
                  <div>
                        <span>like: {props.countLike}</span>
                  </div>
            </div>
      );
}

export default Post;