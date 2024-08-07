// utils/api.ts
export const fetchPortfolioData = async () => {
    const response = await fetch('/api/projects');
    const data = await response.json();
    return data;
  };

  export const fetchSkillData = async () => {
    const response = await fetch('/api/skills');
    const data = await response.json();
    return data;
  };

  
  export const addPortfolioItem = async (item) => {
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
  };
  
  export const updatePortfolioItem = async (item) => {
    await fetch('/api/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
  };
  
  export const deletePortfolioItem = async (id) => {
    await fetch('/api/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };
  
  export const addSkill = async (skill) => {
    await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill),
    });
  };
  
  export const updateSkill = async (skill) => {
    await fetch('/api/skills', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill),
    });
  };
  
  export const deleteSkill = async (id) => {
    await fetch('/api/skills', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };

  export const fetchAdarshDetails = async () => {
    const response = await fetch('/api/adarsh');
    const data = await response.json();
    return data;
  };
  
  export const updateAdarshDetails = async (details: { tagline: string; bio: string; email: string; resume: string; github: string; linkedin: string }) => {
    const response = await fetch('/api/adarsh', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });
    if (!response.ok) throw new Error('Failed to update Adarsh details');
    return response.json();
  };
  