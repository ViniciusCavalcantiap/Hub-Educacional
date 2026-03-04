import { useState, useEffect } from "react";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} from "../services/resourceService";

export function useResources() {
  const [resources, setResources] = useState([]);

  const fetchResources = async () => {
    try {
      const data = await getResources();
      setResources(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleCreate = async (data) => {
    await createResource(data);
    await fetchResources();
  };

  const handleUpdate = async (data) => {
    await updateResource(data);
    await fetchResources();
  };

  const handleDelete = async (id) => {
    await deleteResource(id);
    await fetchResources();
  };

  return {
    resources,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}