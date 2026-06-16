export type UserCreatedEvent = {
  id: string;
  email: string;
  createdByAccountId: string | null;
};
