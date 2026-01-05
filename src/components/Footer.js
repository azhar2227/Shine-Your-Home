import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.footerContent}>
          <p>© {new Date().getFullYear()} मोबाइल शॉप. सभी अधिकार सुरक्षित</p>
          <p>यह एक डेमो वेबसाइट है</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#2c3e50',
    color: 'white',
    padding: '20px 0',
    marginTop: 'auto',
    textAlign: 'center'
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }
};

export default Footer;
