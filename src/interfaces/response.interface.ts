interface customJson {
  success: boolean;
  message: string;
}

interface customResponse extends customJson {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default customResponse;
