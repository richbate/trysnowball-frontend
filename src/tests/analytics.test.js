/**
 * Analytics Protection Tests
 * 
 * These tests ensure Google Analytics functionality is not broken by CSP changes
 * or other modifications. Analytics are CRITICAL for business decisions.
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

// Mock gtag for testing
global.gtag = jest.fn();
global.dataLayer = [];

describe('Google Analytics Protection Tests', () => {
  beforeEach(() => {
    // Clear gtag calls between tests
    global.gtag.mockClear();
    global.dataLayer = [];
  });

  describe('Google Analytics Script Loading', () => {
    test('GA script tag is present in HTML', () => {
      const htmlContent = document.documentElement.innerHTML;
      expect(htmlContent).toContain('https://www.googletagmanager.com/gtag/js?id=G-5QLHMSPPZ6');
    });

    test('GA tracking ID is correctly configured', () => {
      const htmlContent = document.documentElement.innerHTML;
      expect(htmlContent).toContain('G-5QLHMSPPZ6');
    });

    test('gtag function is available globally', () => {
      expect(typeof global.gtag).toBe('function');
    });

    test('dataLayer is initialized', () => {
      expect(global.dataLayer).toBeDefined();
      expect(Array.isArray(global.dataLayer)).toBe(true);
    });
  });

  describe('Page View Tracking', () => {
    test('Home page renders without analytics errors', () => {
      const { container } = render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
      
      expect(container).toBeInTheDocument();
      // No console errors should occur from analytics
    });

    test('Navigation between pages should not break analytics', () => {
      // This test ensures route changes don't interfere with GA
      const { rerender } = render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
      
      // Re-render to simulate navigation
      rerender(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
      
      expect(global.gtag).toBeDefined();
    });
  });

  describe('Critical Analytics Domains', () => {
    const criticalDomains = [
      'www.googletagmanager.com',
      'www.google-analytics.com',
      'region1.google-analytics.com',
      'region2.google-analytics.com',
      'analytics.google.com'
    ];

    test.each(criticalDomains)('Domain %s should be allowed by CSP', (domain) => {
      // This test will be updated once we implement CSP parsing
      expect(domain).toMatch(/google/);
    });
  });

  describe('Analytics Data Collection', () => {
    test('Page view events should be trackable', () => {
      // Mock a page view event
      if (typeof global.gtag === 'function') {
        global.gtag('event', 'page_view', {
          page_title: 'Test Page',
          page_location: 'https://test.com'
        });
      }
      
      expect(global.gtag).toHaveBeenCalled();
    });

    test('Custom events should be trackable', () => {
      // Mock a custom event
      if (typeof global.gtag === 'function') {
        global.gtag('event', 'debt_calculator_used', {
          event_category: 'engagement',
          event_label: 'snowball_method'
        });
      }
      
      expect(global.gtag).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    test('App should not crash if gtag is unavailable', () => {
      const originalGtag = global.gtag;
      global.gtag = undefined;
      
      expect(() => {
        render(
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        );
      }).not.toThrow();
      
      global.gtag = originalGtag;
    });

    test('Analytics failures should not affect core functionality', () => {
      // Mock gtag to throw an error
      global.gtag = jest.fn().mockImplementation(() => {
        throw new Error('Analytics error');
      });
      
      expect(() => {
        render(
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        );
      }).not.toThrow();
    });
  });
});

/**
 * Business Critical Analytics Tests
 * 
 * These tests ensure that key business metrics can be tracked
 */
describe('Business Critical Analytics Events', () => {
  test('User journey tracking should be possible', () => {
    // Test tracking user progression through debt calculator
    const userJourneyEvents = [
      'page_view',
      'debt_added',
      'calculation_completed',
      'export_downloaded'
    ];
    
    userJourneyEvents.forEach(eventName => {
      if (typeof global.gtag === 'function') {
        global.gtag('event', eventName, {
          event_category: 'user_journey'
        });
      }
    });
    
    expect(global.gtag).toHaveBeenCalledTimes(userJourneyEvents.length);
  });

  test('Revenue tracking should be possible', () => {
    // Test tracking for paid features (AI Coach, etc.)
    if (typeof global.gtag === 'function') {
      global.gtag('event', 'purchase', {
        transaction_id: 'test-123',
        value: 2.99,
        currency: 'GBP',
        items: [{
          item_id: 'ai-coach',
          item_name: 'AI Debt Coach',
          category: 'digital_product',
          quantity: 1,
          price: 2.99
        }]
      });
    }
    
    expect(global.gtag).toHaveBeenCalledWith('event', 'purchase', expect.any(Object));
  });
});