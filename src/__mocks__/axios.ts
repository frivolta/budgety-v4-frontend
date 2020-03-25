import { AxiosResponse } from "axios";

const axiosResponse: AxiosResponse = {
  data: {},
  status: 200,
  statusText: "OK",
  config: {},
  headers: {}
};

export default {
  default: {
    post: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse))
  },
  get: jest.fn(() => Promise.resolve(axiosResponse)),
  post: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse))
};
