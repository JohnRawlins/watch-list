import React from 'react';
import '../css/my-review-list.scss';

const MyReviewList = (props) => {
    return (
        <ul className="myreviewlist">
            {props.reviewItems}
        </ul>
    )
}

export default MyReviewList;