declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_PUBLISHABLE_KEY: string;
      STRIPE_SECRET_KEY: string;
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
    }
  }
}

export {};
