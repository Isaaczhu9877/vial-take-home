import { Table, Pagination, MultiSelect, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { Subject, TableCols } from "../../utils/types/subjectType";
import TableHead from "../tableHead/tableHead";
import { useMediaQuery } from "react-responsive";
import "./subjectTableStyles.css";

interface ISubjectTableProps {
  data: Subject[];
}

const handleData = (
  data: Subject[],
  genderFilters: string[],
  statusFilters: string[],
  key: keyof TableCols,
  descending: boolean,
  searchStr: string
) => {
  const filtered = filterData(data, genderFilters, statusFilters);
  let sorted;
  if (key === "age") {
    sorted = sortDataNumber(filtered, key, descending);
  } else {
    sorted = sortDataString(filtered, key, descending);
  }

  const searched = searchData(sorted, searchStr);

  return searched;
};

const sortDataString = (
  data: Subject[],
  key: keyof TableCols,
  descending: boolean
) => {
  const sorted = data.sort((a, b) => {
    const strA = a[key as keyof Subject].toString();
    const strB = b[key as keyof Subject].toString();
    if (descending) {
        return strA.localeCompare(strB);
    }
    
    return strB.localeCompare(strA);
  });
  return sorted;
};

const sortDataNumber = (
  data: Subject[],
  key: keyof TableCols,
  descending: boolean
) => {
  const sorted = data.sort((a, b) => {
    const element1 = a[key as keyof Subject] 
    const element2 = b[key as keyof Subject] 
    if (descending) {
      return element2 > element1 ? 1 : -1;
    }

    return element1 > element2 ? 1 : -1;
  });
  return sorted;
};

const filterData = (
  data: Subject[],
  genderFilters: string[],
  statusFilters: string[]
) => {
  return data.filter((subject) => {
    const genderMatch =
      genderFilters.length === 0 || genderFilters.includes(subject.gender);
    const statusMatch =
      statusFilters.length === 0 || statusFilters.includes(subject.status);
    return genderMatch && statusMatch;
  });
};

const searchData = (data: Subject[], searchStr: string) => {
  if (searchStr === "") {
    return data;
  }
  const lowerSearchString = searchStr.toLowerCase();
  return data.filter((subject) => {
    const nameMatch = subject.name.toLowerCase().includes(lowerSearchString);
    const idMatch = subject.id.includes(searchStr);
    return nameMatch || idMatch;
  });
};

function SubjectTable(props: ISubjectTableProps) {
  const { data } = props;

  const [activePage, setActivePage] = useState(1);
  const [sortedData, setSortedData] = useState(data);
  const [selectedFilter, setSelectedFilter] = useState<keyof TableCols>("name");
  const [genderFilters, setGenderFilters] = useState<string[]>([]);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [descending, setDescending] = useState(false);
  const [searchString, setSearchString] = useState("");

  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const rowsPerPage = isBigScreen ? 20 : isTabletOrMobile ? 5 : 10;

  useEffect(() => {
    setSortedData(handleData(data, genderFilters, statusFilters, selectedFilter, descending, searchString));
  }, [data]);

  const paginatedData = () => {
    const start = (activePage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedData.slice(start, end);
  };

  const handleSorting = (key: keyof TableCols) => {
    const reversed = key === selectedFilter ? !descending : false;
    setDescending(reversed);
    setActivePage(1);
    setSelectedFilter(key);
    setSortedData(handleData(data, genderFilters, statusFilters, key, reversed, searchString));
  };

  const handleFilter = (filters: string[]) => {
    setActivePage(1);
    const gender: string[] = [];
    const status: string[] = [];
    filters.forEach((filter) => {
      if (filter === "Male" || filter === "Female") {
        gender.push(filter);
      } else {
        status.push(filter);
      }
    });
    setGenderFilters(gender);
    setStatusFilters(status);

    setSortedData(
      handleData(data, gender, status, selectedFilter, descending, searchString)
    );
  };

  const handleSearch = (str: string) => {
    setActivePage(1);
    setSearchString(str);
    setSortedData(handleData(data, genderFilters, statusFilters, selectedFilter, descending, str));
  };

  return (
    <div className="subjectTable">
      <div className="subjectTable__filters">
        <TextInput
          variant="filled"
          radius="xl"
          placeholder="Search Name or ID"
          style={{ width: "100%" }}
          value={searchString}
          onChange={(str) => handleSearch(str.currentTarget.value)}
        />
        <MultiSelect
          label="Filter By"
          placeholder="Pick Column"
          data={[
            { group: "Gender", items: ["Male", "Female"] },
            { group: "Status", items: ["Active", "Inactive"] },
          ]}
          onChange={(selected) => handleFilter(selected)}
        />
      </div>
      <Table.ScrollContainer minWidth={800} className="table">
        <Table
          striped
          highlightOnHover
          withColumnBorders
          horizontalSpacing="md"
        >
          <Table.Thead>
            <Table.Tr>
              <TableHead
                sorted={selectedFilter === "id"}
                isDescending={descending}
                onSort={() => handleSorting("id")}
              >
                ID
              </TableHead>
              <TableHead
                sorted={selectedFilter === "name"}
                isDescending={descending}
                onSort={() => handleSorting("name")}
              >
                Name
              </TableHead>
              <TableHead
                sorted={selectedFilter === "age"}
                isDescending={descending}
                onSort={() => handleSorting("age")}
              >
                Age
              </TableHead>
              <TableHead
                sorted={selectedFilter === "gender"}
                isDescending={descending}
                onSort={() => handleSorting("gender")}
              >
                Gender
              </TableHead>
              <TableHead
                sorted={selectedFilter === "diagnosisDate"}
                isDescending={descending}
                onSort={() => handleSorting("diagnosisDate")}
              >
                Date
              </TableHead>
              <TableHead
                sorted={selectedFilter === "status"}
                isDescending={descending}
                onSort={() => handleSorting("status")}
              >
                Status
              </TableHead>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedData().map((row) => (
              <Table.Tr key={row.name}>
                <Table.Td>{row.id}</Table.Td>
                <Table.Td>{row.name}</Table.Td>
                <Table.Td>{row.age}</Table.Td>
                <Table.Td>{row.gender}</Table.Td>
                <Table.Td>
                  {new Date(row.diagnosisDate).toISOString().substring(0, 10)}
                </Table.Td>
                <Table.Td>{row.status}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Pagination
        total={Math.ceil(sortedData.length / rowsPerPage)}
        value={activePage}
        onChange={setActivePage}
        mt="lg"
        color="rgba(13, 13, 13, 1)"
        withEdges
      />
    </div>
  );
}

export default SubjectTable;
