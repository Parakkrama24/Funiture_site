import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Create confetti effect
    const createConfetti = () => {
      const colors = ['#4f46e5', '#34d399', '#fbbf24', '#ec4899'];
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Animation
        confetti.animate([
          {
            top: '-10px',
            opacity: 1
          },
          {
            top: '100vh',
            opacity: 0
          }
        ], {
          duration: 2000 + Math.random() * 3000,
          easing: 'cubic-bezier(.55,.06,.68,.19)'
        });

        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }
    };

    // Play success sound
    const playSuccessSound = () => {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Dam0cYTq3r621yrzEv8XCvMLEwMLBwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDCwsLBwsLBwsLCwcLCwgDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAA=');
      audio.play().catch(() => {}); // Ignore errors if audio can't play
    };

    createConfetti();
    playSuccessSound();

    // Start tracking order status
    const checkOrderStatus = () => {
      // Simulated order tracking - in real app, this would call your API
      console.log('Checking order status...');
    };

    const statusCheck = setInterval(checkOrderStatus, 5000);

    return () => {
      clearInterval(statusCheck);
    };
  }, []);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <CheckCircle size={40} color="#34d399" />
        </div>
        
        <h1 className="success-title">Payment Successful!</h1>
        
        <p className="success-message">
          Great news! Your payment has been processed successfully. 
          You can track your order status in the My Orders section.
        </p>

        <button 
          className="orders-button"
          onClick={() => {
            // Add button click animation
            const button = document.querySelector('.orders-button');
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
              button.style.transform = 'scale(1)';
              navigate('/my-orders');
            }, 150);
          }}
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;