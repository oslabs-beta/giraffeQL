import { emailValidation } from "./emailValidation";

test("it should validate email correctly", () => {
  expect(emailValidation("test@test.com")).toBeTruthy();

  expect(emailValidation("test.com")).toBeFalsy();

  expect(emailValidation("tes@test")).toBeFalsy();

  expect(emailValidation("tes@test.")).toBeFalsy();
});
