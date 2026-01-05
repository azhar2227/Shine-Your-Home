import React from 'react';
import { Link } from 'react-router-dom'; // ✅ यहाँ Link import किया

function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.footerContent}>
          <p>© {new Date().getFullYear()} Shine Your Home. All rights reserved</p>
          <p>This is a demo website for educational purposes</p>
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
