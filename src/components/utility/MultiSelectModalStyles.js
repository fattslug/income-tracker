const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'all 0.3s ease-in-out',
    animationName: 'fadeIn',
    animationDuration: '0.2s',
    animationFillMode: 'forwards',
    zIndex: '999'
  },
  content: {
    left: '20px',
    right: '20px',
    transition: 'all 0.3s ease-in-out',
    opacity: '0',
    animationName: 'swipeUp',
    animationDuration: '0.3s',
    animationDelay: '0.1s',
    animationFillMode: 'forwards',
    padding: '0',
    border: 'none',
    borderRadius: '10px',
  }
};

export default modalStyles;