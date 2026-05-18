const PREFIX = '[NIA]';

export const niaLog = {
  info: (message: string, data?: unknown) => {
    if (data !== undefined) {
      console.log(PREFIX, message, data);
    } else {
      console.log(PREFIX, message);
    }
  },
  warn: (message: string, data?: unknown) => {
    if (data !== undefined) {
      console.warn(PREFIX, message, data);
    } else {
      console.warn(PREFIX, message);
    }
  },
  error: (message: string, error?: unknown) => {
    if (error !== undefined) {
      console.error(PREFIX, message, error);
    } else {
      console.error(PREFIX, message);
    }
  },
};

export function installGlobalErrorLogging(): void {
  const errorUtils = (
    global as typeof globalThis & {
      ErrorUtils?: {
        getGlobalHandler: () => (error: Error, isFatal?: boolean) => void;
        setGlobalHandler: (
          handler: (error: Error, isFatal?: boolean) => void,
        ) => void;
      };
    }
  ).ErrorUtils;

  if (!errorUtils) {
    return;
  }

  const previousHandler = errorUtils.getGlobalHandler();
  errorUtils.setGlobalHandler((error, isFatal) => {
    niaLog.error(`Global ${isFatal ? 'fatal ' : ''}error`, error);
    previousHandler?.(error, isFatal);
  });
}
