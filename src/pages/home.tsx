import { useEffect, useState } from "react";
import { fetchSubjects } from "../services/api";
import Header from "../components/header/header";
import { Divider } from "@mantine/core";
import SubjectTable from "../components/subjectTable/subjectTable";

function Home() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const fetchedSubjects = await fetchSubjects();
        setSubjects(fetchedSubjects);
      } catch (error) {
        console.error("Error loading subjects:", error);
      }
    };
    loadSubjects();
  }, []);

  return (
    <>
      <Header />
      <Divider my="sm" style={{ marginTop: 6 }} />
      <div style={{ margin: "24px 48px" }}>
        <SubjectTable data={subjects} />
      </div>
    </>
  );
}

export default Home;
