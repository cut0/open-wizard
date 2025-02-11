import { createAddRequired } from "./usecases/add-required";

export const createUsecases = () => ({
  addRequired: createAddRequired(),
});
