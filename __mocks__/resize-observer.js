// محاكاة ResizeObserver
const ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// تعيين ResizeObserver إلى الكائن العام
global.ResizeObserver = ResizeObserver;

// محاكاة scrollIntoView
global.HTMLElement.prototype.scrollIntoView = jest.fn();

module.exports = { ResizeObserver };