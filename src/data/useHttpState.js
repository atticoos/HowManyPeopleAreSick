import {useState} from 'react';

export function useHttpState() {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null
  });

  return {
    ...state,
    setLoading() {
      setState(s => ({...s, loading: true}));
    },
    setData(data) {
      setState({data, loading: false, error: null});
    },
    setError(error) {
      setState(s => ({...s, loading: false, error}));
    }
  };
}
