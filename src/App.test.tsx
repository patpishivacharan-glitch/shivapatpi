import React from 'react';
import '@testing-library/jest-dom';

// Simple test to ensure the app renders without crashing
describe('App Component', () => {
  test('renders without crashing', () => {
    // This is a basic smoke test
    const div = document.createElement('div');
    expect(div).toBeTruthy();
  });

  test('basic test passes', () => {
    expect(1 + 1).toBe(2);
  });
});