import { useCallback, useState } from "react";

const useToggle = (initState: boolean = false): [boolean, any] => {
  const [state, setState] = useState<boolean>(initState);
  const toggle = useCallback((): void => setState((state) => !state), []);
  return [state, toggle];
};

export default useToggle;
