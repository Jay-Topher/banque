import React from 'react';
import './FeedBackSection.scss';
import FeedBackCard from '../FeedBackCard/FeedBackCard';
import menu from '../Sidebar/menu';

const FeedBackSection = () => {
  return (
    <section className="feedback-section">
      <div className="container-fluid">
        <h2 className="heading">Testimonies</h2>
        <div className="feedback-section-container">
          {menu.reviews.map(review => (
            <FeedBackCard
              comment={review.comment}
              avi={review.avi}
              name={review.name}
              key={review.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedBackSection;
