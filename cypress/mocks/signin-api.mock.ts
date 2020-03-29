import { AxiosError } from "axios";
import { IApiUserDetails } from "../../src/types";

export type AxiosErrorCypress = {
  code: number;
  message: string;
  stack: string;
};

// Successfull login response and local storage
export const successfullLoginResponse: IApiUserDetails = {
  user: { id: "5e7fe0a60ffb7e5e9ef321e7", email: "test@user.com", role: "user" },
  tokens: {
    access: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTdmZTBhNjBmZmI3ZTVlOWVmMzIxZTciLCJpYXQiOjE1ODU0Nzc5MjQsImV4cCI6MTU4ODEwNTkyNH0.gjRFvFxv6efFeegKTqgCWhg2I6WfHSKByBnofW8feWg",
      expires: "2020-04-28T20:32:04.094Z"
    },
    refresh: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTdmZTBhNjBmZmI3ZTVlOWVmMzIxZTciLCJpYXQiOjE1ODU0Nzc5MjQsImV4cCI6MTU4ODA2OTkyNH0.tpdEGO-llJuRnZ3WLpuQWa1Nv7ATZrhE7gIcC4_wYM0",
      expires: "2020-04-28T10:32:04.094Z"
    }
  }
};

// Rejected login response
export const rejectedLoginResponse: AxiosErrorCypress = {
  code: 401,
  message: "Incorrect email or password",
  stack: "Error: Incorrect email or password"
};
