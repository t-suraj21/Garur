const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const fetchClasses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
};

export const fetchSubjects = async (classId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects/${classId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
};

export const fetchChapters = async (classId, subjectId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chapters/${classId}/${subjectId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return [];
  }
};

export const fetchChapterContent = async (classId, subjectId, chapterId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/content/${classId}/${subjectId}/${chapterId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chapter content:', error);
    return null;
  }
};

export const fetchTestQuestions = async (classId, subjectId, chapterId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions/${classId}/${subjectId}/${chapterId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching test questions:', error);
    return [];
  }
}; 