export const OUTPUT_CONFIG = {
  'CODE-CA-1': {
    code: 'CODE-CA-1',
    message: 'Account Created Successfully!',
    type: 'createAccount',
    error: false,
    ok: true,
  },
  'CODE-CA-2': {
    code: 'CODE-CA-2',
    message: 'User with the same email id exists',
    type: 'createAccount',
    error: true,
    ok: false,
  },
  'CODE-CA-3': {
    code: 'CODE-CA-3',
    message: 'Error while creating account. Please try again later!',
    type: 'createAccount',
    error: true,
    ok: false,
  },
  'CODE-LO-1': {
    code: 'CODE-LO-1',
    message: 'User Authenticated Successfully!',
    type: 'login',
    error: false,
    ok: true,
  },
  'CODE-LO-2': {
    code: 'CODE-LO-2',
    message: 'Invalid Credentials. Please try again!',
    type: 'login',
    error: true,
    ok: false,
  },
  'CODE-LO-3': {
    code: 'CODE-LO-3',
    message: 'Trouble while Login. Please try again later!',
    type: 'login',
    error: true,
    ok: false,
  },
  'CODE-UP-1': {
    code: 'CODE-UP-1',
    message: 'User Profile Details!',
    type: 'userProfile',
    error: false,
    ok: true,
  },
  'CODE-UP-2': {
    code: 'CODE-UP-2',
    message:
      'Error while fetching user profile details. Please try again later!',
    type: 'userProfile',
    error: true,
    ok: false,
  },
};
