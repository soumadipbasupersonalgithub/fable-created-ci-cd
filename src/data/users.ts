export interface Credentials {
  username: string;
  password: string;
}

const PASSWORD = 'secret_sauce';

export const standardUser: Credentials = {
  username: 'standard_user',
  password: PASSWORD,
};

/**
 * All Swag Labs accounts that are expected to log in successfully.
 * (locked_out_user is intentionally excluded — it is a negative scenario.)
 */
export const validUsers: Credentials[] = [
  { username: 'standard_user', password: PASSWORD },
  { username: 'problem_user', password: PASSWORD },
  { username: 'performance_glitch_user', password: PASSWORD },
  { username: 'error_user', password: PASSWORD },
  { username: 'visual_user', password: PASSWORD },
];
