declare interface Window {
  snap: {
    pay: (
      token: string,
      options: {
        onSuccess?: (result: any) => void;
        onError?: (result: any) => void;
        onClose?: () => void;
      }
    ) => void;
  };
}
