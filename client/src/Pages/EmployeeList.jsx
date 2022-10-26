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

  const [personName, setPersonName] = useState([]);

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };
  console.log(personName);
  const sortByColumn = (
    columnName,
    stateSetter,
    status,
    setStatus
    //! nem szabad ide meghivni a "personName useState-t"
  ) => {
    setStatus(!status);
    const ascOrDesc = status ? "asc" : "desc";
    stateSetter(columnName);

    console.log(personName);

    // const map1 = personName.map((x) => {
    //   if (x === "startingDate") {
    //     return "Starting Date";
    //   } else if (x === "firstName") {
    //     return "First Name";
    //   } else if (x === "middleName") {
    //     return "Middle Name";
    //   } else if (x === "lastName") {
    //     return "Last Name";
    //   } else if (x === "currentSalary") {
    //     return "Current Salary";
    //   } else if (x === "desiredSalary") {
    //     return "Desired Salary";
    //   } else if (x === "level") {
    //     return "Level";
    //   } else if (x === "position") {
    //     return "Position";
    //   } else if (x === "favColor") {
    //     return "Favorite Color";
    //   } else if (x === "boss") {
    //     return "Boss";
    //   } else {
    //     return "";
    //   }
    // });
    // console.log(map1);

    const map1 = personName.map((x) => {
      if (x === "startingDate") {
        return "toSort=startingDate";
      } else if (x === "firstName") {
        return "toSort=firstName";
      } else if (x === "middleName") {
        return "toSort=middleName";
      } else if (x === "lastName") {
        return "toSort=lastName";
      } else if (x === "currentSalary") {
        return "toSort=currentSalary";
      } else if (x === "desiredSalary") {
        return "toSort=desiredSalary";
      } else if (x === "level") {
        return "toSort=level";
      } else if (x === "position") {
        return "toSort=position";
      } else if (x === "favColor") {
        return "toSort=favColor";
      } else if (x === "boss") {
        return "toSort=boss";
      } else {
        return "";
      }
    });
    console.log(map1);
    console.log(map1.join("&"));

    // const keyPairList = getValue(personName);
    // function getValue(personName) {
    //   const tableCellList = ["Name", "Level", "Position"];
    //   //ha a (personName[i].lowercase()).includes()

    //   const map1 = personName.filter((x) => x.includes("name"));
    //   console.log(map1);
    // }
    // const hello = (personName) => console.log(personName);
    // personName.map((items) => {
    //   console.log(items);
    //   return items;
    // });

    // console.log(hello());

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
      personName={personName}
      setPersonName={setPersonName}
    />
  );
};

export default EmployeeList;
