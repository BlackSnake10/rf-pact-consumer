module.exports = { 
    preset: 'ts-jest',
    testEnvironment: 'jsdom', 
    transform: { 
        '^.+\\.(m?j)sx?$': '@swc/jest',
        "^.+\\.tsx?$": "ts-jest"
    }, 
    transformIgnorePatterns: ['<rootDir>/node_modules/', '/node_modules/', '<rootDir>/.yarn/'], 
    testPathIgnorePatterns: ['/src/__tests__/steps', '<rootDir>/node_modules/'],
    moduleFileExtensions: ['js', 'mjs', 'jsx', 'tsx', 'ts'], 
    moduleNameMapper: { 
        uuid: require.resolve('uuid'), 
        '\\.(css|less|png|jpg|gif|jpeg|webp)$': 'identity-obj-proxy' // You have to add all files types of the resources that you use like png...
    }, 
    collectCoverage: true, 
    coveragePathIgnorePatterns: [ 
        'src/__tests__/', 
        'node_modules/', 
        '.yarn/' 
    ] 
}