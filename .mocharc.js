module.exports = {
  extension: ["js", "cjs", "mjs"],
  package: "./package.json",
  reporter: "@reportportal/agent-js-mocha",
  "reporter-option": [
    "endpoint=https://demo.reportportal.io/api/v1",
    "apiKey=test-api-belajar_FhLwc4oQRByLw5QYeFGZMRTE_h8RHi0x_BbIovsiHedZmqG7JyYFzNTZW1SwH8Os",
    "launch=Test API Todos",
    "project=uzivurt0_personal",
    "attributes=APITest",
  ],
};
