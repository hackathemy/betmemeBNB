import React from 'react';
import styles from './index.module.scss';

const CommentsSection = ({gameId}) => {
  return (
    <div className={styles.commentsSection}>
      <h2>Comments</h2>
      <p>No comments for game yet.</p>
    </div>
  );
};

export default CommentsSection;
