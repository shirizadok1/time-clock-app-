// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const localStorageMock = (function () {
  let store: Record<string | number, unknown> = {};

  return {
    getItem(key: string | number) {
      return store[key];
    },

    setItem(key: string | number, value: any) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string | number) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
