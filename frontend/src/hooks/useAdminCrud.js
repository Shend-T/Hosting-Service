import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:8000/api/admin";

/**
 * Rrnoft qeky tutorial:
 * https://www.youtube.com/watch?v=WtijdoNfzYg
 */
function useAdminCrud(endPoint) {
  const adminToken = useSelector((state) => state.admin.token);

  const HEADERS = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      Accept: "application/json",
    },
  };

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/${endPoint}`, HEADERS);
      setData(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getOne = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/${endPoint}/${id}`, HEADERS);
      setData(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const create = async (form) => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/${endPoint}`, form, HEADERS);
      await getAll();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, form) => {
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/${endPoint}/${id}`, form, HEADERS);
      await getAll();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${endPoint}/${id}`, HEADERS);
      await getAll();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, getAll, getOne, create, update, remove };
}

export default useAdminCrud;
