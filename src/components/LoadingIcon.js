import React from 'react';

const styles = delay => ({
  animationDuration: '1.2s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
  animationName: 'wave',
  backgroundColor: 'rgb(137, 135, 123)',
  height: '100%',
  width: '20%',
  animationDelay: `-${delay}s`,
  marginRight: '1px'
});

const LoadingIcon = () => (
  <span>
    <span>
      <style> {
        `@-webkit-keyframes wave {
          0%, 40%, 100% {
              -webkit-transform: scaleY(0.4)
            } 20% {
              -webkit-transform: scaleY(1)
            }
          }
          @keyframes wave {
            0%, 40%, 100% {
              transform: scaleY(0.4);
              -webkit-transform: scaleY(0.4);
            } 20% {
              transform: scaleY(1);
              -webkit-transform: scaleY(1);
            }
          }`
      }
      </style>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '27.2px',
          width: '34px'
        }}
      >
        <div style={styles(0.4)} />
        <div style={styles(0.3)} />
        <div style={styles(0.2)} />
        <div style={styles(0)} />
        <div style={styles(0)} />
      </div>
    </span>
  </span>
);

export default LoadingIcon;
