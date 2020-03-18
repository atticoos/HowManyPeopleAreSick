import {useState, useEffect} from 'react';

function useHttpState() {
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


export function useTotalCases() {
  const httpState = useHttpState();

  useEffect(() => {
    httpState.setLoading(true);
    fetch(`https://corona.lmao.ninja/all`)
      .then(resp => resp.json())
      .then(data => httpState.setData(data))
      .catch(error => httpState.setError(error));
  }, []);

  return {
    data: httpState.data,
    loading: httpState.loading,
    error: httpState.error
  };
}
