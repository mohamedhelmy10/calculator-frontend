module.exports = {
    testEnvironment: "jsdom",
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        "\\.(css|less|scss)$": "<rootDir>/src/fileMock.js",
    },
};