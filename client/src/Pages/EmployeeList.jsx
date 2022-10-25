import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable/EmployeeTable";

const fetchEmployees = (signal, malacka) => {
  return fetch(`/api/employees?${malacka}`, { signal }).then((res) =>
    res.json()
  );
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [selectedColumnStatus, setSelectedColumnStatus] = useState();
  const [sortStatus, setSortStatus] = useState("default");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };
  const sortByColumn = (columnName, stateSetter, status, setStatus) => {
    setStatus(!status);
    const ascOrDesc = status ? "asc" : "desc";
    stateSetter(columnName);

    const malacka = "sort=" + columnName + "&" + "by=" + ascOrDesc;
    console.log(malacka);
    const controller = new AbortController();
    fetchEmployees(controller.signal, malacka)
      .then((employees) => {
        setLoading(false);
        setData(employees);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });
  };
  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        setData(employees);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeTable
      sortStatus={sortStatus}
      setSortStatus={setSortStatus}
      sortByColumn={sortByColumn}
      setSelectedColumnStatus={setSelectedColumnStatus}
      employees={data}
      onDelete={handleDelete}
    />
  );
};

export default EmployeeList;
