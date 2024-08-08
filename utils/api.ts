// utils/api.ts
const createURL = (path: string) => {
    return window.location.origin + path;
  };


export const fetchPortfolioData = async () => {
    const response = await fetch(createURL('/api/projects'));
    const data = await response.json();
    return data;
  };

  export const fetchSkillData = async () => {
    const response = await fetch(createURL('/api/skills'));
    const data = await response.json();
    return data;
  };

  
  export const addPortfolioItem = async (item) => {
    await fetch(createURL('/api/projects'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
  };
  
  export const updatePortfolioItem = async (item) => {
    await fetch(createURL('/api/projects'), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
  };
  
  export const deletePortfolioItem = async (id) => {
    await fetch(createURL('/api/projects'), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };
  
  export const addSkill = async (skill) => {
    await fetch(createURL('/api/skills'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill),
    });
  };
  
  export const updateSkill = async (skill) => {
    await fetch(createURL('/api/skills'), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill),
    });
  };
  
  export const deleteSkill = async (id) => {
    await fetch(createURL('/api/skills'), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };

  export const fetchAdarshDetails = async () => {
    const response = await fetch(createURL('/api/adarsh'));
    const data = await response.json();
    return data;
  };
  
  export const updateAdarshDetails = async (details: { tagline: string; bio: string; email: string; resume: string; github: string; linkedin: string }) => {
    const response = await fetch(createURL('/api/adarsh'), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });
    if (!response.ok) throw new Error('Failed to update Adarsh details');
    return response.json();
  };

  export async function sendContactForm(data: { name: string; email: string; message: string }) {
    try {
      const response = await fetch(createURL('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending contact form:', error);
      throw error;
    }
  }
  
  