export async function fetchSubjects() {
  try {
    const response = await fetch(
      "https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects"
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
}
