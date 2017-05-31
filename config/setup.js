Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => ({
    matches: true,
    addListener: jest.fn()
  }))
});
