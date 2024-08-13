import React from 'react';
import styles from './index.module.scss';

const CommentsSection = () => {
  return (
    <div className={styles.commentsSection}>
      <div className={styles.commentsBlock}>
        <div className={styles.commentHead}>
          <span className={styles.PriceUpTitle}>Price Up</span>
          <span className={styles.commentCnt}>+213 Comment</span>
        </div>
        <div className={styles.commentsList}>
          <div className={styles.comment}>
            <img src="profile-placeholder.png" alt="Profile" className={styles.profilePic}/>
            <div>
              <h4 className={styles.profileName}>cmkdsI900</h4>
              <p>The most impressive of these announcements is the increase in reward rates for participants. I think this is the most positive sign.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.commentsBlock}>
        <div className={styles.commentHead}>
          <span className={styles.PriceDownTitle}>Price Down</span>
          <span className={styles.commentCnt}>+98 Comment</span>
        </div>
        <div className={styles.commentsList}>
          <div className={styles.comment}>
            <img src="profile-placeholder.png" alt="Profile" className={styles.profilePic}/>
            <div>
              <h4 className={styles.profileName}>Goodboy</h4>
              <p>It's been rising too high so far. It's time for a correction. This announcement is not that strong.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
