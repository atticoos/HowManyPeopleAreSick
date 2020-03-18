import {useState, useEffect} from 'react';
import {useHttpState} from './useHttpState';

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
